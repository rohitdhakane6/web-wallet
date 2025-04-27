import { BrowserRouter as Router, Routes, Route } from "react-router";
import MnemonicGenerator from "@/components/generateMnemonic";
import Wallet from "@/components/Wallet";
import LandingPage from "@/components/pages/landing-page";
import Dashboard from "@/components/pages/dashboard";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/generate" element={<MnemonicGenerator />} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
      <Footer />
    </Router>
  );
}
