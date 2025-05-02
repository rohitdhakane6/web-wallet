import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/context/WalletContext";
import { motion } from "framer-motion";
import { ArrowRightIcon, Wallet, Download, Shield } from "lucide-react";

export const InitialChoice = () => {
  const { goToStep } = useWallet();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4 } },
    exit: { y: -20, opacity: 0, transition: { duration: 0.2 } },
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
        <CardHeader className="text-center">
          <motion.div variants={itemVariants}>
            <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 w-fit">
              <Wallet size={32} className="text-primary" />
            </div>
            <CardTitle className="text-3xl font-bold tracking-tight">
              Secure Crypto Wallet
            </CardTitle>
            <CardDescription className="text-lg mt-2">
              Take control of your digital assets with full security and ease
            </CardDescription>
          </motion.div>
        </CardHeader>

        <CardContent className="space-y-6 pt-4">
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              variant="outline"
              className="flex-1 h-auto py-8 px-4 flex flex-col items-center gap-3 text-lg hover:bg-primary/10 hover:text-primary group transition-all"
              onClick={() => goToStep("new-wallet-creation")}
            >
              <div className="p-3 rounded-full bg-secondary/20 group-hover:bg-primary/20 transition-colors">
                <Shield
                  size={28}
                  className="text-muted-foreground group-hover:text-primary transition-colors"
                />
              </div>
              <span>Create New Wallet</span>
              <span className="text-xs text-muted-foreground">
                Generate a new secure wallet
              </span>
              <ArrowRightIcon
                className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity"
                size={16}
              />
            </Button>

            <Button
              variant="outline"
              className="flex-1 h-auto py-8 px-4 flex flex-col items-center gap-3 text-lg hover:bg-primary/10 hover:text-primary group transition-all"
              onClick={() => goToStep('import-wallet')}
            >
              <div className="p-3 rounded-full bg-secondary/20 group-hover:bg-primary/20 transition-colors">
                <Download
                  size={28}
                  className="text-muted-foreground group-hover:text-primary transition-colors"
                />
              </div>
              <span>Import Existing Wallet</span>
              <span className="text-xs text-muted-foreground">
                Restore using recovery phrase
              </span>
              <ArrowRightIcon
                className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity"
                size={16}
              />
            </Button>
          </motion.div>
        </CardContent>

        <motion.div variants={itemVariants}>
          <CardFooter className="flex justify-center pb-6 pt-2">
            <p className="text-sm text-muted-foreground text-center max-w-md">
              Your keys, your crypto. All wallet data is encrypted and stored
              locally on your device.
            </p>
          </CardFooter>
        </motion.div>
      </Card>
    </motion.div>
  );
};
