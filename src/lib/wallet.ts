import { generateMnemonic, validateMnemonic } from 'bip39';

/**
 * Generates a 12-word recovery phrase for a wallet
 */
export const generateRecoveryPhrase = (): string[] => {
  const mnemonic = generateMnemonic(128); // 128 bits = 12 words
  return mnemonic.split(' ');
};

/**
 * Validates if a mnemonic phrase is valid
 */
export const validatePhrase = (phrase: string): boolean => {
  return validateMnemonic(phrase);
};

/**
 * Evaluates password strength
 * Returns a score from 0-4:
 * 0: very weak, 1: weak, 2: medium, 3: strong, 4: very strong
 */
export const evaluatePasswordStrength = (password: string): number => {
  let score = 0;
  
  // Length check
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  
  // Complexity checks
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  
  // Normalize to 0-4 range
  return Math.min(4, Math.floor(score / 1.5));
};

/**
 * Get password strength label
 */
export const getPasswordStrengthLabel = (score: number): string => {
  switch (score) {
    case 0: return "Very Weak";
    case 1: return "Weak";
    case 2: return "Medium";
    case 3: return "Strong";
    case 4: return "Very Strong";
    default: return "Unknown";
  }
};

/**
 * Get password strength color
 */
export const getPasswordStrengthColor = (score: number): string => {
  switch (score) {
    case 0: return "bg-destructive"; 
    case 1: return "bg-destructive/80";
    case 2: return "bg-yellow-500";
    case 3: return "bg-green-500/80";
    case 4: return "bg-green-500";
    default: return "bg-neutral-500";
  }
};