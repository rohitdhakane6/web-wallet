import CryptoJS from "crypto-js";

// Derive AES key + IV from password and salt
const deriveKeyAndIV = (password: string, salt: CryptoJS.lib.WordArray) => {
  const keyAndIV = CryptoJS.PBKDF2(password, salt, {
    keySize: (256 + 128) / 32, // keySize: 384 bits => 32+16 bytes
    iterations: 1000,
  });

  const key = CryptoJS.lib.WordArray.create(keyAndIV.words.slice(0, 8)); // 32 bytes
  const iv = CryptoJS.lib.WordArray.create(keyAndIV.words.slice(8, 12)); // 16 bytes
  return { key, iv };
};

// Encrypt function
export const encryptData = (data: string, password: string): string => {
  const salt = CryptoJS.lib.WordArray.random(128 / 8); // 16 bytes salt

  const { key, iv } = deriveKeyAndIV(password, salt);

  const encrypted = CryptoJS.AES.encrypt(data, key, { iv });

  // Return salt + encrypted text
  return salt.toString(CryptoJS.enc.Hex) + encrypted.toString();
};

// Decrypt function
export const decryptData = (ciphertext: string, password: string): string => {
  const saltHex = ciphertext.slice(0, 32); // first 32 hex chars = 16 bytes
  const encrypted = ciphertext.slice(32); // rest is AES ciphertext

  const salt = CryptoJS.enc.Hex.parse(saltHex);

  const { key, iv } = deriveKeyAndIV(password, salt);

  const decrypted = CryptoJS.AES.decrypt(encrypted, key, { iv });

  return decrypted.toString(CryptoJS.enc.Utf8);
};
