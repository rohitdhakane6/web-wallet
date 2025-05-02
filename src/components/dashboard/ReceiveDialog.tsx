import { useState } from "react";
import { Copy, Download } from "lucide-react";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import Qrcode from "react-qr-code";

interface ReceiveDialogProps {
  name: string;
  symbol: string;
  publicKey: string;
}

export default function ReceiveDialog({
  name,
  publicKey,
  symbol,
}: ReceiveDialogProps) {
  const [open, setOpen] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(publicKey);
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
          <DialogTitle className="capitalize">Receive {name}</DialogTitle>
          <DialogDescription>
            Share your wallet address to receive funds
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="mx-auto bg-white p-4 rounded-lg w-48 h-48 flex items-center justify-center">
            <Qrcode value={publicKey} />
          </div>

          <div className="relative">
            <div className="border rounded-md p-3 pr-10 bg-muted/50 break-all text-sm">
              {publicKey}
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
              Only send {name} ({symbol.toUpperCase()}) to this address.
              <br />
              Sending any other asset may result in permanent loss.
            </p>
            {symbol === "sol" && (
              <Alert variant="destructive">
                <AlertDescription className="text-sm">
                  The solana Address are case sensitive, make sure to copy the
                  address correctly.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
