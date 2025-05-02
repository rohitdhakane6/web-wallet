import { AnimatePresence } from "framer-motion";
import { useWallet } from "@/context/WalletContext";
import { InitialChoice } from "@/components/onboarding/InitialChoice";
import { NewWalletCreation } from "@/components/onboarding/NewWalletCreation";
import { RecoveryPhraseDisplay } from "@/components/onboarding/RecoveryPhraseDisplay";
import { PhraseVerification } from "@/components/onboarding/PhraseVerification";
import { SecuritySetup } from "@/components/onboarding/SecuritySetup";
import { CompleteSetup } from "@/components/onboarding/CompleteSetup";
import { ImportWallet } from "@/components/onboarding/ImportWallet";

export default function Onboarding() {
  const { currentStep } = useWallet();
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/90 flex items-center justify-center p-4">
      <div className="w-full max-w-xl mx-auto">
        <AnimatePresence mode="wait">
          {currentStep === "initial-choice" && (
            <InitialChoice key="initial-choice" />
          )}
          {currentStep === "new-wallet-creation" && (
            <NewWalletCreation key="new-wallet-creation" />
          )}
          {currentStep === "import-wallet" && (
            <ImportWallet key="import-wallet" />
          )}
          {currentStep === "recovery-phrase" && (
            <RecoveryPhraseDisplay key="recovery-phrase" />
          )}
          {currentStep === "phrase-verification" && (
            <PhraseVerification key="phrase-verification" />
          )}
          {currentStep === "security-setup" && (
            <SecuritySetup key="security-setup" />
          )}
          {currentStep === "complete" && <CompleteSetup key="complete" />}
        </AnimatePresence>
      </div>
    </div>
  );
}
