import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { useWallet } from "@/context/WalletContext";
import { motion } from "framer-motion";
import {
  Copy,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Check,
} from "lucide-react";
import { toast } from "sonner";

export const RecoveryPhraseDisplay = () => {
  const { recoveryPhrase, nextStep, prevStep } = useWallet();
  const [copied, setCopied] = useState(false);
  const [confirmations, setConfirmations] = useState({
    saved: false,
    understood: false,
  });

  const copyToClipboard = () => {
    navigator.clipboard.writeText(recoveryPhrase.join(" "));
    setCopied(true);
    toast("Recovery phrase copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCheckboxChange = (key: keyof typeof confirmations) => {
    setConfirmations((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const allConfirmed = confirmations.saved && confirmations.understood;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3, staggerChildren: 0.05 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: -10, opacity: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full"
    >
      <Card className="border-muted/30 bg-card/90 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevStep}
              className="mr-2 hover:text-primary"
            >
              <ArrowLeft size={18} />
            </Button>
            <div>
              <CardTitle className="text-2xl font-bold">
                Your Recovery Phrase
              </CardTitle>
              <CardDescription className="mt-2">
                Write down these 12 words in order and keep them safe
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <motion.div variants={itemVariants}>
            <Alert variant="destructive" className="mb-4 border-destructive/30">
              <AlertTriangle className="h-5 w-5" />
              <AlertTitle>STORE SECURELY</AlertTitle>
              <AlertDescription>
                This is your only chance to save these words. Anyone with access
                to this phrase can control your wallet.
              </AlertDescription>
            </Alert>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 sm:grid-cols-4 gap-2 bg-muted/30 p-4 rounded-lg border border-border/50"
          >
            {recoveryPhrase.map((word, index) => (
              <div
                key={index}
                className="flex items-center p-2 bg-background rounded border border-muted/30"
              >
                <span className="text-muted-foreground mr-2 text-xs min-w-[18px]">
                  {index + 1}.
                </span>
                <span className="font-mono">{word}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex justify-center mt-4"
          >
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={copyToClipboard}
            >
              {copied ? (
                <>
                  <Check size={14} />
                  Copied
                </>
              ) : (
                <>
                  <Copy size={14} />
                  Copy to clipboard
                </>
              )}
            </Button>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-3 mt-6">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="saved"
                checked={confirmations.saved}
                onCheckedChange={() => handleCheckboxChange("saved")}
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="saved"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I have securely saved my recovery phrase
                </label>
                <p className="text-sm text-muted-foreground">
                  I understand this is required to recover my wallet
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="understood"
                checked={confirmations.understood}
                onCheckedChange={() => handleCheckboxChange("understood")}
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="understood"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I understand that lost phrases cannot be recovered
                </label>
                <p className="text-sm text-muted-foreground">
                  If I lose this phrase, I will lose access to my funds
                  permanently
                </p>
              </div>
            </div>
          </motion.div>
        </CardContent>
        <CardFooter className="flex justify-between border-t border-border/50 pt-4">
          <Button variant="outline" onClick={prevStep} className="gap-2">
            <ArrowLeft size={16} />
            Back
          </Button>
          <Button onClick={nextStep} disabled={!allConfirmed} className="gap-2">
            Continue
            <ArrowRight size={16} />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
