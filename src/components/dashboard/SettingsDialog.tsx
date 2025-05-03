"use client";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Settings, Copy } from "lucide-react";
import { useWallet } from "@/context/WalletContext";
import { toast } from "sonner";

export function SettingsDialog({ activeAsset }: { activeAsset: string }) {
  const { wallets, recoveryPhrase } = useWallet();

  const selectedAsset = wallets.find((w) => w.name === activeAsset);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard");
    } catch (error) {
      toast.error("Failed to copy");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl">
            {activeAsset.charAt(0).toLocaleUpperCase() + activeAsset.slice(1)}{" "}
            Keys
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 pb-6 pt-2 overflow-y-auto space-y-8">
          {/* Connected Wallet Section */}
          <section className="space-y-4">
            {selectedAsset ? (
              <div className="p-4 rounded-lg bg-muted flex flex-col space-y-4">
                <WalletDetail
                  label="Public Key"
                  value={selectedAsset.publicKey}
                  onCopy={() => copyToClipboard(selectedAsset.publicKey)}
                />
                <WalletDetail
                  label="Private Key"
                  value={selectedAsset.privateKey}
                  onCopy={() => copyToClipboard(selectedAsset.privateKey)}
                />
                <WalletDetail
                  label="Derivation Path"
                  value={selectedAsset.derivationPath}
                  onCopy={() => copyToClipboard(selectedAsset.derivationPath)}
                />
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No wallet selected.
              </p>
            )}
          </section>

          {/* Recovery Phrase Section */}
          <motion.section
            className="space-y-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Recovery Phrase</h2>
              {recoveryPhrase.length > 0 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => copyToClipboard(recoveryPhrase.join(" "))}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="p-4 rounded-lg bg-muted">
              {recoveryPhrase.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {recoveryPhrase.map((word, idx) => (
                    <motion.span
                      key={idx}
                      className="px-2 py-1 bg-background rounded text-xs"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: idx * 0.02 }}
                    >
                      {idx + 1}. {word}
                    </motion.span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No recovery phrase available.
                </p>
              )}
            </div>
          </motion.section>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function WalletDetail({
  label,
  value,
  onCopy,
}: {
  label: string;
  value: string;
  onCopy: () => void;
}) {
  return (
    <div className="flex flex-col space-y-1">
      <span className="text-xs text-muted-foreground">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-sm truncate max-w-[16rem]">{value}</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 flex-shrink-0"
          onClick={onCopy}
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
