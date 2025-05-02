import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useWallet } from "@/context/WalletContext";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
export const PhraseVerification = () => {
  const { 
    recoveryPhrase, 
    verificationIndices, 
    verificationAnswers,
    setVerificationAnswer, 
    verifyPhraseWords,
    isVerifying,
    nextStep, 
    prevStep 
  } = useWallet();
  
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isVerified, setIsVerified] = useState<boolean | null>(null);

  useEffect(() => {
    // Initialize local state with context values
    setAnswers(verificationAnswers || {});
  }, [verificationAnswers]);

  const handleInputChange = (index: number, value: string) => {
    setAnswers(prev => {
      const newAnswers = { ...prev, [index]: value };
      setVerificationAnswer(index, value);
      return newAnswers;
    });
    
    // Reset verification state when user changes input
    if (isVerified !== null) {
      setIsVerified(null);
    }
  };

  const handleVerify = async () => {
    const result = await verifyPhraseWords();
    setIsVerified(result);
    
    if (result) {
      toast("Verification successful! Proceeding to the next step...");
      
      // Move to next step after a short delay
      setTimeout(() => {
        nextStep();
      }, 1000);
    } else {
      toast.error("Verification failed. Please check your answers and try again.")
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3, staggerChildren: 0.05 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: -10, opacity: 0 }
  };

  // Check if all required words have been entered
  const allWordsEntered = verificationIndices.every(
    index => answers[index] && answers[index].trim() !== ''
  );

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
              <CardTitle className="text-2xl font-bold">Verify Recovery Phrase</CardTitle>
              <CardDescription className="mt-2">
                Enter the requested words to verify you've saved your phrase
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <motion.div variants={itemVariants}>
            <p className="text-sm text-muted-foreground mb-6">
              Please enter the following words from your recovery phrase to verify you've saved it correctly.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            {verificationIndices.map((index) => (
              <div key={index} className="space-y-2">
                <Label htmlFor={`word-${index}`}>Word #{index + 1}</Label>
                <Input
                  id={`word-${index}`}
                  value={answers[index] || ''}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  placeholder={`Enter word #${index + 1}`}
                  className={`
                    ${isVerified === true && answers[index].toLowerCase() === recoveryPhrase[index].toLowerCase() 
                      ? 'border-green-500/50 focus-visible:ring-green-500/20' 
                      : isVerified === false && answers[index].toLowerCase() !== recoveryPhrase[index].toLowerCase()
                        ? 'border-destructive/50 focus-visible:ring-destructive/20'
                        : ''}
                  `}
                />
              </div>
            ))}
          </motion.div>

          <AnimatePresence>
            {isVerified !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Alert 
                  variant={isVerified ? "default" : "destructive"}
                  className={`${isVerified ? 'bg-green-500/10 border-green-500/30 text-green-500' : ''}`}
                >
                  {isVerified 
                    ? <CheckCircle2 className="h-4 w-4" /> 
                    : <AlertCircle className="h-4 w-4" />
                  }
                  <AlertDescription>
                    {isVerified 
                      ? "Verification successful! Proceeding to the next step..."
                      : "Verification failed. Please check your answers and try again."
                    }
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
        <CardFooter className="flex justify-between border-t border-border/50 pt-4">
          <Button variant="outline" onClick={prevStep} className="gap-2">
            <ArrowLeft size={16} />
            Back
          </Button>
          <Button 
            onClick={handleVerify} 
            disabled={!allWordsEntered || isVerifying || isVerified === true}
            className="gap-2"
          >
            {isVerifying ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                Verify
                <ArrowRight size={16} />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};