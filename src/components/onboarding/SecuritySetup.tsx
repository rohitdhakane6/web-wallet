import { useState, useEffect } from "react";
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
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useWallet } from "@/context/WalletContext";
import { motion } from "framer-motion";
import { ArrowLeft, Eye, EyeOff, Shield, AlertTriangle } from "lucide-react";
import {
  evaluatePasswordStrength,
  getPasswordStrengthLabel,
  getPasswordStrengthColor,
} from "@/lib/wallet";

export const SecuritySetup = () => {
  const { password, setPassword, nextStep, prevStep,completeSetup } = useWallet();

  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    if (password) {
      setPasswordStrength(evaluatePasswordStrength(password));
    } else {
      setPasswordStrength(0);
    }

    setPasswordError("");
  }, [password]);

  const validatePassword = () => {
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return false;
    }

    if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must include an uppercase letter");
      return false;
    }

    if (!/[a-z]/.test(password)) {
      setPasswordError("Password must include a lowercase letter");
      return false;
    }

    if (!/[0-9]/.test(password)) {
      setPasswordError("Password must include a number");
      return false;
    }

    if (!/[^A-Za-z0-9]/.test(password)) {
      setPasswordError("Password must include a special character");
      return false;
    }

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleContinue = () => {
    if (!validatePassword()) return;
    completeSetup();
    nextStep();
  };

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
      className="w-full max-w-md mx-auto"
    >
      <Card className="border-muted/30 bg-card/95 backdrop-blur-sm shadow-xl rounded-xl overflow-hidden">
        <CardHeader className="pb-4 pt-6">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevStep}
              className="h-8 w-8 rounded-full hover:bg-muted/80 hover:text-primary"
            >
              <ArrowLeft size={16} />
            </Button>
            <div>
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Secure Your Wallet
              </CardTitle>
              <CardDescription className="mt-1 text-sm text-muted-foreground">
                Create a strong password to protect your assets
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="px-6 py-2 space-y-6">
          <motion.div variants={itemVariants} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter strong password"
                  className="pr-10 h-10 bg-background/50 border-muted/50 focus:border-primary"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {password && (
              <div className="space-y-1.5 bg-muted/20 p-3 rounded-lg">
                <div className="flex justify-between text-xs">
                  <span className="font-medium">Password strength</span>
                  <span className={`font-medium ${getPasswordStrengthColor(passwordStrength).replace('bg-', 'text-')}`}>
                    {getPasswordStrengthLabel(passwordStrength)}
                  </span>
                </div>
                <Progress
                  value={(passwordStrength / 4) * 100}
                  className={`h-1.5 ${getPasswordStrengthColor(passwordStrength)}`}
                />
                
                <div className="mt-3 text-xs text-muted-foreground grid grid-cols-2 gap-x-2 gap-y-1">
                  <div className={`flex items-center gap-1 ${password.length >= 8 ? 'text-green-500' : 'text-muted-foreground'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${password.length >= 8 ? 'bg-green-500' : 'bg-muted-foreground'}`}></div>
                    <span>8+ characters</span>
                  </div>
                  <div className={`flex items-center gap-1 ${/[A-Z]/.test(password) ? 'text-green-500' : 'text-muted-foreground'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${/[A-Z]/.test(password) ? 'bg-green-500' : 'bg-muted-foreground'}`}></div>
                    <span>Uppercase letter</span>
                  </div>
                  <div className={`flex items-center gap-1 ${/[a-z]/.test(password) ? 'text-green-500' : 'text-muted-foreground'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${/[a-z]/.test(password) ? 'bg-green-500' : 'bg-muted-foreground'}`}></div>
                    <span>Lowercase letter</span>
                  </div>
                  <div className={`flex items-center gap-1 ${/[0-9]/.test(password) ? 'text-green-500' : 'text-muted-foreground'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${/[0-9]/.test(password) ? 'bg-green-500' : 'bg-muted-foreground'}`}></div>
                    <span>Number</span>
                  </div>
                  <div className={`flex items-center gap-1 ${/[^A-Za-z0-9]/.test(password) ? 'text-green-500' : 'text-muted-foreground'}`} style={{ gridColumn: "span 2" }}>
                    <div className={`w-1.5 h-1.5 rounded-full ${/[^A-Za-z0-9]/.test(password) ? 'bg-green-500' : 'bg-muted-foreground'}`}></div>
                    <span>Special character (!@#$%^&*)</span>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="pr-10 h-10 bg-background/50 border-muted/50 focus:border-primary"
                />
              </div>
            </div>

            {passwordError && (
              <Alert variant="destructive" className="bg-red-500/10 border border-red-500/20 text-red-500">
                <AlertTriangle className="h-4 w-4 mr-2" />
                <AlertDescription className="text-sm">{passwordError}</AlertDescription>
              </Alert>
            )}
          </motion.div>
        </CardContent>
        
        <CardFooter className="flex justify-between border-t border-border/30 px-6 py-4 mt-4">
          <Button 
            variant="outline" 
            onClick={prevStep} 
            className="gap-2 px-4 h-10 bg-background/70 hover:bg-background"
          >
            <ArrowLeft size={16} />
            Back
          </Button>
          <Button 
            onClick={handleContinue}
            className="px-6 h-10 font-medium"
          >
            Complete Setup
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};