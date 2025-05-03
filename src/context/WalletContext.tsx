import React, { createContext, useContext, useState, ReactNode } from "react";
import { generateRecoveryPhrase } from "@/lib/wallet";
import { assetList } from "@/data";
import { deriveKeyFromMnemonic } from "@/lib/walletCreate";
import { encryptData } from "@/lib/encryption";

export type WalletStep =
  | "initial-choice"
  | "new-wallet-creation"
  | "recovery-phrase"
  | "phrase-verification"
  | "security-setup"
  | "complete"
  | "import-wallet";

interface WalletContextType {
  currentStep: WalletStep;
  recoveryPhrase: string[];
  isGeneratingPhrase: boolean;
  isVerifying: boolean;
  isCreatingWallet: boolean;
  verificationIndices: number[];
  verificationAnswers: Record<number, string>;
  password: string;
  wallets: {
    derivationPath: string;
    name: string;
    address: string;
    privateKey: string;
    publicKey: string;
  }[];
  isAuthenticated: boolean;

  // Navigation methods
  goToStep: (step: WalletStep) => void;
  nextStep: () => void;
  prevStep: () => void;

  // Actions
  generatePhrase: () => Promise<void>;
  setRecoveryPhrase: (phrase: string[]) => void;
  setVerificationAnswer: (index: number, word: string) => void;
  setPassword: (password: string) => void;
  verifyPhraseWords: () => Promise<boolean>;
  completeSetup: () => Promise<void>;
  setWallets: (
    wallets: {
      name: string;
      derivationPath: string;
      address: string;
      privateKey: string;
      publicKey: string;
    }[]
  ) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

const STEPS: WalletStep[] = [
  "initial-choice",
  "new-wallet-creation",
  "recovery-phrase",
  "phrase-verification",
  "security-setup",
  "complete",
];

export const WalletProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentStep, setCurrentStep] = useState<WalletStep>("initial-choice");
  const [recoveryPhrase, setRecoveryPhrase] = useState<string[]>([]);
  const [isGeneratingPhrase, setIsGeneratingPhrase] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isCreatingWallet, setIsCreatingWallet] = useState(false);
  const [verificationIndices, setVerificationIndices] = useState<number[]>([]);
  const [verificationAnswers, setVerificationAnswers] = useState<
    Record<number, string>
  >({});
  const [password, setPassword] = useState("");
  const [wallets, setWallets] = useState<
    {
      derivationPath: string;
      name: string;
      address: string;
      privateKey: string;
      publicKey: string;
    }[]
  >([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const goToStep = (step: WalletStep) => {
    setCurrentStep(step);
  };

  const nextStep = () => {
    const currentIndex = STEPS.indexOf(currentStep);
    if (currentIndex < STEPS.length - 1) {
      setCurrentStep(STEPS[currentIndex + 1]);
    }
  };

  const prevStep = () => {
    const currentIndex = STEPS.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(STEPS[currentIndex - 1]);
    }
  };

  const generatePhrase = async () => {
    setIsGeneratingPhrase(true);
    try {
      const phrase = generateRecoveryPhrase();
      setRecoveryPhrase(phrase);

      // Select 4 random indices for verification
      const indices = Array.from({ length: 4 }, () =>
        Math.floor(Math.random() * phrase.length)
      ).sort((a, b) => a - b);

      setVerificationIndices(indices);
      setVerificationAnswers({});
    } finally {
      setIsGeneratingPhrase(false);
    }
  };

  const setVerificationAnswer = (index: number, word: string) => {
    setVerificationAnswers((prev) => ({ ...prev, [index]: word }));
  };

  const verifyPhraseWords = async () => {
    setIsVerifying(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const allCorrect = verificationIndices.every(
        (index) =>
          verificationAnswers[index]?.toLowerCase() ===
          recoveryPhrase[index]?.toLowerCase()
      );
      return allCorrect;
    } finally {
      setIsVerifying(false);
    }
  };

  const completeSetup = async () => {
    setIsCreatingWallet(true);
    try {
      if (!recoveryPhrase || !password) {
        throw new Error("Recovery phrase or password is missing");
      }

      const walletList: {
        name: string;
        derivationPath: string;
        address: string;
        privateKey: string;
        publicKey: string;
      }[] = [];

      assetList.forEach((asset) => {
        const { name, derivationPath } = asset;
        try {
          const wallet = deriveKeyFromMnemonic(
            recoveryPhrase.join(" "),
            derivationPath
          );
          walletList.push({
            name,
            derivationPath,
            address: wallet.address,
            privateKey: wallet.privateKey,
            publicKey: wallet.publicKey,
          });
        } catch (err) {
          console.error(`Failed to create wallet for asset ${name}:`, err);
        }
      });

      const encryptedData = encryptData(
        JSON.stringify({
          wallets: walletList,
          password,
          mnemonic: recoveryPhrase.join(" "),
        }),
        password
      );
      localStorage.setItem("walletData", encryptedData);
      setIsAuthenticated(true);
      setWallets(walletList);
    } catch (error) {
      console.error("Failed to complete wallet setup:", error);
    } finally {
      setIsCreatingWallet(false);
    }
  };

  const value: WalletContextType = {
    currentStep,
    recoveryPhrase,
    isGeneratingPhrase,
    isVerifying,
    isCreatingWallet,
    verificationIndices,
    verificationAnswers,
    password,
    wallets,
    isAuthenticated,

    goToStep,
    nextStep,
    prevStep,

    generatePhrase,
    setRecoveryPhrase,
    setVerificationAnswer,
    setPassword,
    verifyPhraseWords,
    completeSetup,
    setWallets,
    setIsAuthenticated,
  };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
