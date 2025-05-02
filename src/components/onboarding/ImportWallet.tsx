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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useWallet } from "@/context/WalletContext";
import { motion } from "framer-motion";
import { ArrowLeft, AlertTriangle, ShieldCheck } from "lucide-react";
import { validateMnemonic } from "bip39";
import { toast } from "sonner";

export const ImportWallet = () => {
  const { prevStep, goToStep, setRecoveryPhrase } = useWallet();
  const [phrase, setPhrase] = useState("");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3, staggerChildren: 0.1 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
  };

  const handleImport = () => {
    if (validateMnemonic(phrase)) {
      setRecoveryPhrase(phrase.split(" "));
      toast.success("Recovery phrase is valid. Proceeding to the next step...");
      goToStep("security-setup");
    } else {
      toast.error("Invalid recovery phrase. Please check and try again.");
    }
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
                Import Your Wallet
              </CardTitle>
              <CardDescription className="mt-2">
                Choose your preferred method to import your existing wallet
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <motion.div variants={itemVariants}>
            <Alert variant="destructive" className="mb-6 border-destructive/30">
              <AlertTriangle className="h-5 w-5" />
              <AlertTitle>Security Warning</AlertTitle>
              <AlertDescription>
                Never share your recovery phrase or private keys. Verify you're
                on the correct website and beware of phishing attempts.
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <Label htmlFor="phrase">Recovery Phrase</Label>
              <Input
                id="phrase"
                placeholder="Enter your 12 or 24-word recovery phrase"
                value={phrase}
                onChange={(e) => setPhrase(e.target.value)}
                className="font-mono"
              />
              <p className="text-sm text-muted-foreground">
                Enter your recovery phrase words separated by spaces
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Alert className="mt-6 bg-primary/5 border-primary/20">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <AlertTitle>Import Tips</AlertTitle>
              <AlertDescription className="mt-2">
                <ul className="list-disc pl-4 space-y-1">
                  <li>Double-check your input before proceeding</li>
                  <li>Ensure you're in a private, secure location</li>
                  <li>Never share your recovery information</li>
                  <li>Verify the website URL and security certificate</li>
                </ul>
              </AlertDescription>
            </Alert>
          </motion.div>
        </CardContent>

        <CardFooter className="flex justify-between border-t border-border/50 pt-4">
          <Button variant="outline" onClick={prevStep} className="gap-2">
            <ArrowLeft size={16} />
            Back
          </Button>
          <Button onClick={handleImport}>Import Wallet</Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
