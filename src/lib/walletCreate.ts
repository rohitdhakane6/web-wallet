import * as bip39 from "bip39";
import { HDNode } from "@ethersproject/hdnode";
import { getAddress } from "@ethersproject/address";
import * as ed25519 from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import { validatePhrase } from "@/lib/wallet";

/**
 * Detects the cryptocurrency based on the derivation path.
 */
function detectCryptoFromPath(path: string): 'ethereum' | 'solana' {
  const regex = /m\/\d+'\/(\d+)'/;
  const match = path.match(regex);

  if (!match) {
    throw new Error("Invalid derivation path format");
  }

  const coinType = parseInt(match[1], 10);

  switch (coinType) {
    case 60:
      return 'ethereum';
    case 501:
      return 'solana';
    default:
      throw new Error(`Unsupported coin type: ${coinType}`);
  }
}

/**
 * Derives a wallet key pair from a mnemonic and path.
 */
export const deriveKeyFromMnemonic = (mnemonic: string, path: string) => {
  try {
    if (!validatePhrase(mnemonic)) {
      throw new Error("Invalid mnemonic phrase");
    }

    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const cryptocurrency = detectCryptoFromPath(path);

    if (cryptocurrency === 'ethereum') {
      const node = HDNode.fromSeed(seed).derivePath(path);
      return {
        network: 'ethereum',
        address: getAddress(node.address),
        privateKey: node.privateKey,
        publicKey: node.publicKey,
      };
    }

    if (cryptocurrency === 'solana') {
      const { key } = ed25519.derivePath(path, seed.toString('hex'));
      const keypair = Keypair.fromSeed(key);
      return {
        network: 'solana',
        address: keypair.publicKey.toBase58(),
        privateKey: Buffer.from(keypair.secretKey).toString('hex'),
        publicKey: keypair.publicKey.toBase58(),
      };
    }

    throw new Error("Unsupported cryptocurrency type");
  } catch (error) {
    console.error("Error deriving key:", error);
    throw error;
  }
};
