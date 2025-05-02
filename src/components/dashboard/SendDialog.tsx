import { useState } from "react";
import { Send } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { sendSolanaTransaction } from "@/lib/rpcClients";

const formSchema = z.object({
  address: z
    .string()
    .min(26, {
      message: "Wallet address must be at least 26 characters.",
    })
    .max(64, {
      message: "Wallet address cannot exceed 64 characters.",
    }),
  amount: z.coerce
    .number()
    .positive({
      message: "Amount must be positive.",
    })
    .min(0.00001, {
      message: "Minimum amount is 0.00001.",
    }),
});

interface SendDialogProps {
  name: string;
  symbol: string;
  privateKey: string;
}

export default function SendDialog({
  name,
  symbol,
  privateKey,
}: SendDialogProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
      amount: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    sendSolanaTransaction(
      privateKey,
      values.address,
      values.amount,
      'devnet'
    );

    toast(
      `Sending ${values.amount} BTC to ${values.address.substring(
        0,
        6
      )}...${values.address.substring(values.address.length - 4)}`
    );
    setOpen(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Send className="h-4 w-4" />
          Send
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Send {name.charAt(0).toLocaleUpperCase() + name.slice(1)}
          </DialogTitle>
          <DialogDescription>
            Enter the recipient address and amount to send
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipient Address</FormLabel>
                  <FormControl>
                    <Input placeholder="0x..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount ({symbol.toUpperCase()})</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.00001"
                      placeholder="0.001"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" className="w-full">
                Send Transaction
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
