import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useWallet } from "@/context/WalletContext";
import { motion } from "framer-motion";
import { AlertTriangle, ArrowLeft, ShieldAlert, Loader2 } from "lucide-react";

export const NewWalletCreation = () => {
  const { generatePhrase, isGeneratingPhrase, prevStep, nextStep } = useWallet();

  const handleGeneratePhrase = async () => {
    await generatePhrase();
    nextStep();
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3, staggerChildren: 0.1 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 }
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
              <CardTitle className="text-2xl font-bold">Generate Your Secure Wallet</CardTitle>
              <CardDescription className="mt-2">
                We will create a unique recovery phrase for your new wallet
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <motion.div variants={itemVariants}>
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-primary/10">
                <ShieldAlert size={40} className="text-primary" />
              </div>
            </div>
            
            <Alert variant="default" className="bg-card border-amber-500/30">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <AlertTitle className="text-amber-500 font-medium">Important Security Notice</AlertTitle>
              <AlertDescription className="text-muted-foreground mt-2">
                <p className="mb-2">
                  We will generate a unique 12-word recovery phrase. This phrase is the <strong>only way</strong> to access your wallet if you lose access to this device.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Write it down on paper and store it securely</li>
                  <li>Never share it with anyone</li>
                  <li>Make multiple backup copies</li>
                  <li>We cannot recover your phrase if you lose it</li>
                </ul>
              </AlertDescription>
            </Alert>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col items-center gap-4 mt-6"
          >
            <Alert variant="destructive" className="border-destructive/30">
              <AlertTriangle className="h-5 w-5" />
              <AlertTitle>Critical Warning</AlertTitle>
              <AlertDescription>
                Never share your recovery phrase. Anyone with these words can access and steal your funds.
              </AlertDescription>
            </Alert>
            
            <Button 
              onClick={handleGeneratePhrase}
              className="w-full mt-4" 
              size="lg"
              disabled={isGeneratingPhrase}
            >
              {isGeneratingPhrase ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Secure Phrase...
                </>
              ) : (
                "Generate Recovery Phrase"
              )}
            </Button>
          </motion.div>
        </CardContent>
        <CardFooter className="flex justify-center border-t border-border/50 pt-4">
          <p className="text-sm text-muted-foreground text-center">
            This step is critical for your wallet's security.
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
};