import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle, Wallet } from "lucide-react";
import { useNavigate } from "react-router";

export const CompleteSetup = () => {
  const navigate = useNavigate();
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.4 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  const successVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
        delay: 0.2,
      },
    },
  };

  const buttonVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { delay: 0.5 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full"
    >
      <Card className="border-muted/30 bg-card/90 backdrop-blur-sm shadow-lg text-center">
        <CardHeader className="pb-2">
          <motion.div
            variants={successVariants}
            className="mx-auto mb-6 w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center"
          >
            <CheckCircle size={40} className="text-primary" />
          </motion.div>
          <CardTitle className="text-3xl font-bold">Wallet Created!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground"
          >
            Your crypto wallet has been successfully set up and secured.
            <br />
            You're ready to start managing your digital assets!
          </motion.p>

          <motion.div
            variants={buttonVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-6"
          >
            <Button className="gap-2" size="lg"
            onClick={() => navigate("/dashboard")}
            >
              <Wallet size={18} />
              Go to My Wallet
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
