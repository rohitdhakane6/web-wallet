import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import { Toaster } from "@/components/ui/sonner.tsx";
import { WalletProvider } from "@/context/WalletContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WalletProvider>
      <ThemeProvider defaultTheme="dark" storageKey="cryptowallet-theme">
        <App />
        <Toaster />
      </ThemeProvider>
    </WalletProvider>
  </StrictMode>
);
