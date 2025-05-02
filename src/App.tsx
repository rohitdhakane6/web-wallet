import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import LandingPage from "@/components/pages/landing-page";
import Dashboard from "@/components/pages/dashboard";
import Onboarding from "@/components/pages/onboarding";
import PasswordScreen from "@/components/pages/PasswordScreen";
import { useWallet } from "@/context/WalletContext";
import { useEffect, useState } from "react";

export default function App() {
  const { isAuthenticated } = useWallet();
  const [isWalletExists, setIsWalletExists] = useState(false);

  useEffect(() => {
    const walletData = localStorage.getItem("walletData");
    if (walletData) {
      setIsWalletExists(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<LandingPage />} />

        {/* Onboarding: if wallet exists, redirect to password screen */}
        <Route
          path="/onboarding"
          element={
            isWalletExists ? (
              <Navigate to="/password" replace />
            ) : (
              <Onboarding />
            )
          }
        />

        {/* Password: if wallet does not exist, redirect to onboarding */}
        <Route
          path="/password"
          element={
            isWalletExists ? (
              <PasswordScreen />
            ) : (
              <Navigate to="/onboarding" replace />
            )
          }
        />

        {/* Dashboard: requires authentication */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard />
            ) : (
              <Navigate to="/password" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}
