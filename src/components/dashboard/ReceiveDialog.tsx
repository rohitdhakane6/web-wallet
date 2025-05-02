import { useState } from "react";
import { QrCode, Copy, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export default function ReceiveDialog() {
  const [open, setOpen] = useState(false);
  const walletAddress = "0xbc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
    toast("Wallet address copied to clipboard");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Receive
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Receive Cryptocurrency</DialogTitle>
          <DialogDescription>
            Share your wallet address to receive funds
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="mx-auto bg-white p-4 rounded-lg w-48 h-48 flex items-center justify-center">
            <QrCode className="w-36 h-36 text-black" />
          </div>

          <div className="relative">
            <div className="border rounded-md p-3 bg-muted/50 break-all text-sm">
              {walletAddress}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1.5"
              onClick={copyToClipboard}
            >
              <Copy className="h-4 w-4" />
              <span className="sr-only">Copy address</span>
            </Button>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm text-center text-muted-foreground">
              Only send Bitcoin (BTC) to this address.
              <br />
              Sending any other asset may result in permanent loss.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
