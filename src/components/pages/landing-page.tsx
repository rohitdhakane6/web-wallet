import { useEffect } from "react"
import HeroSection from "@/components/sections/hero-section";
import FeaturesSection from "@/components/sections/features-section";
import SecuritySection from "@/components/sections/security-section";
import PricingSection from "@/components/sections/pricing-section";
import CTASection from "@/components/sections/cta-section";
import CryptoTicker from "@/components/sections/crypto-ticker";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function LandingPage() {
  // Set page title
  useEffect(() => {
    document.title = "CryptoVault - Secure Cryptocurrency Wallet";

    // Set meta tags
    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content =
      "Secure, fast, and user-friendly cryptocurrency wallet. Store, manage, and exchange your digital assets with confidence.";
    document.head.appendChild(metaDescription);

    const metaKeywords = document.createElement("meta");
    metaKeywords.name = "keywords";
    metaKeywords.content =
      "cryptocurrency, wallet, crypto, bitcoin, ethereum, blockchain, secure wallet";
    document.head.appendChild(metaKeywords);

    return () => {
      document.head.removeChild(metaDescription);
      document.head.removeChild(metaKeywords);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <CryptoTicker />
        <FeaturesSection />
        <SecuritySection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
