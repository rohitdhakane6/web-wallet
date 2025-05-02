import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  SystemProgram,
  Transaction,
  PublicKey,
} from "@solana/web3.js";

const ETHEREUM_RPC_URL =
  "https://eth-mainnet.g.alchemy.com/v2/-ng9k9eFbu4AWgmdlNvsz2bCmqewVfyR";
const SOLANA_DEVNET_RPC_URL =
  "https://solana-devnet.g.alchemy.com/v2/-ng9k9eFbu4AWgmdlNvsz2bCmqewVfyR"; // Example for devnet
const SOLANA_MAINNET_RPC_URL =
  "https://solana-mainnet.g.alchemy.com/v2/-ng9k9eFbu4AWgmdlNvsz2bCmqewVfyR"; // Example for mainnet

export async function getSolanaBalance(
  publicKey: string,
  selectedNetType: "mainnet-beta" | "devnet"
) {
  const url =
    selectedNetType === "mainnet-beta"
      ? SOLANA_MAINNET_RPC_URL
      : SOLANA_DEVNET_RPC_URL;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "getBalance",
      params: [publicKey],
    }),
  });
  const data = await res.json();

  return data.result?.value || 0; // lamports
}

export async function getEthereumBalance(publicKey: string) {
  const res = await fetch(ETHEREUM_RPC_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "eth_getBalance",
      params: [publicKey, "latest"],
    }),
  });
  const data = await res.json();
  return data.result;
}

export async function getSolanaTransactions(
  publicKey: string,
  selectedNetType: "mainnet-beta" | "devnet"
) {
  const url =
    selectedNetType === "mainnet-beta"
      ? SOLANA_MAINNET_RPC_URL
      : SOLANA_DEVNET_RPC_URL;

  // Step 1: Fetch the signatures for the address
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "getSignaturesForAddress",
      params: [publicKey, { limit: 10 }],
    }),
  });

  const data = await res.json();

  if (!data.result) {
    return [];
  }

  // Step 2: For each signature, fetch detailed transaction info
  const transactions = await Promise.all(
    data.result.map(async (signature: any) => {
      const txRes = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "getTransaction",
          params: [signature.signature, { encoding: "json" }],
        }),
      });

      const txData = await txRes.json();

      if (txData.result) {
        const tx = txData.result;
        return {
          signature: signature.signature,
          blockTime: tx.blockTime,
          instructions: tx.transaction.message.instructions,
          signers: tx.transaction.message.accountKeys,
        };
      }

      return null;
    })
  );

  // Filter out any failed requests (null values) and return the transactions
  return transactions.filter((tx) => tx !== null);
}

export async function sendSolanaTransaction(
  privateKey: string,
  recipient: string,
  amount: number, // amount in SOL
  selectedNetType: "mainnet-beta" | "devnet"
) {
  const url =
    selectedNetType === "mainnet-beta"
      ? SOLANA_MAINNET_RPC_URL
      : SOLANA_DEVNET_RPC_URL;
  const connection = new Connection(url, "confirmed");

  // Create Keypair from private key (assuming privateKey is hex string)
  const secretKey = Uint8Array.from(Buffer.from(privateKey, "hex"));
  const sender = Keypair.fromSecretKey(secretKey);

  // Fetch recent blockhash
  const { blockhash } = await connection.getLatestBlockhash();

  // Create transaction
  const transaction = new Transaction({
    recentBlockhash: blockhash,
    feePayer: sender.publicKey,
  }).add(
    SystemProgram.transfer({
      fromPubkey: sender.publicKey,
      toPubkey: new PublicKey(recipient),
      lamports: amount * LAMPORTS_PER_SOL, // 1 SOL = 10^9 lamports
    })
  );

  // Sign transaction
  transaction.sign(sender);

  // Serialize transaction
  const serializedTx = transaction.serialize();

  // Send transaction
  const txid = await connection.sendRawTransaction(serializedTx);

  return txid; // Return the transaction signature
}
