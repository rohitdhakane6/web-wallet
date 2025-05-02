import { useState } from "react";
import { useNavigate } from "react-router";
import { decryptData } from "@/lib/encryption";
import { useWallet } from "@/context/WalletContext";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle, Eye, EyeOff, Shield, LockKeyhole } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Header from "@/components/layout/header";

export default function PasswordScreen() {
  const { setWallets, setRecoveryPhrase, setIsAuthenticated } = useWallet();
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleUnlock = () => {
    if (!password.trim()) {
      setPasswordError("Password cannot be empty");
      return;
    }

    setIsLoading(true);

    const encryptedData = localStorage.getItem("walletData");
    if (!encryptedData) {
      setPasswordError("No wallet found. Please onboard again.");
      setIsLoading(false);
      setTimeout(() => navigate("/onboarding"), 1500);
      return;
    }

    try {
      const decrypted = decryptData(encryptedData, password);
      if (decrypted) {
        console.log("Decrypted Wallet Data:", JSON.parse(decrypted).wallets);
        setWallets(JSON.parse(decrypted).wallets);
        setRecoveryPhrase(JSON.parse(decrypted).mnemonic.split(" "));
        setIsAuthenticated(true);
        setIsLoading(false);
        navigate("/dashboard");
      } else {
        setIsLoading(false);
        setPasswordError("Incorrect password. Please try again.");
      }
    } catch (err) {
      console.error("Decryption error:", err);
      setIsLoading(false);
      setPasswordError("Incorrect password. Please try again.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleUnlock();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/90 to-background/80 flex items-center justify-center p-6">
      <Header />

      <div className="w-full max-w-md mx-auto">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
            <LockKeyhole className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
          <p className="text-muted-foreground mt-2">
            Please unlock your wallet to continue
          </p>
        </div>

        <Card className="border-muted/20 bg-card/95 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden">
          <CardHeader className="pb-3 pt-6 space-y-1 text-center">
            <CardTitle className="text-xl font-semibold flex items-center justify-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Unlock Your Wallet
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Enter your password to access your assets
            </CardDescription>
          </CardHeader>

          <CardContent className=" space-y-5">
            <div className="space-y-3">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError) setPasswordError("");
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter your password"
                  className="pr-10 h-11 bg-background/50 border-muted/50 focus:border-primary"
                  autoFocus
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground hover:text-foreground"
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

            {passwordError && (
              <Alert
                variant="destructive"
                className="bg-red-500/10 border border-red-500/20 text-red-500 py-3"
              >
                <AlertTriangle className="h-4 w-4 mr-2 shrink-0" />
                <AlertDescription className="text-sm">
                  {passwordError}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>

          <CardFooter className="flex justify-between border-t border-border/10 px-6 py-4 mt-2">
            <Button
              onClick={handleUnlock}
              className="w-full h-11 font-medium rounded-lg"
              disabled={isLoading}
            >
              {isLoading ? "Unlocking..." : "Unlock Wallet"}
            </Button>
          </CardFooter>
        </Card>

        <div className="mt-6 text-center">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="link"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Need to create a new wallet?
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  {`This will reset your current wallet. You can create a new one or import an existing wallet using a recovery phrase. Make sure your recovery phrase is backed up before continuing.`}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    localStorage.removeItem("walletData");
                    navigate("/onboarding");
                    window.location.reload();
                  }}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
