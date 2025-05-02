import { useState, useEffect } from "react";
import { assetList } from "@/data";
import { getEthereumBalance, getSolanaBalance } from "@/lib/rpcClients";
import { useWallet } from "@/context/WalletContext";

interface Coin {
  id: string; // Unique ID of the coin (used in API requests)
  symbol: string; // Short symbol for the coin (like "btc" for Bitcoin)
  name: string; // Full name of the coin (like "Bitcoin")
  image: string; // URL of the coin's logo/image
  current_price: number; // Current trading price in the selected currency (like USD)
  market_cap: number; // Total market value = current_price * circulating_supply
  market_cap_rank: number; // Rank of the coin based on market cap
  fully_diluted_valuation: number | null; // Market cap if all possible coins are in circulation (can be null if not applicable)
  total_volume: number; // Total trading volume in the last 24 hours
  high_24h: number; // Highest price of the coin in the last 24 hours
  low_24h: number; // Lowest price of the coin in the last 24 hours
  price_change_24h: number; // Absolute price change in the last 24 hours
  price_change_percentage_24h: number; // Percentage price change in the last 24 hours
  market_cap_change_24h: number; // Absolute change in market cap in the last 24 hours
  market_cap_change_percentage_24h: number; // Percentage change in market cap in the last 24 hours
  circulating_supply: number; // Number of coins that are currently available for trading
  total_supply: number | null; // Total number of coins that currently exist (can be null)
  max_supply: number | null; // Maximum number of coins that can ever exist (if there's a limit)
  ath: number; // All-time highest price the coin ever reached
  ath_change_percentage: number; // Percentage drop from the all-time high price
  ath_date: string; // Date and time when the all-time high price happened
  atl: number; // All-time lowest price the coin ever had
  atl_change_percentage: number; // Percentage rise from the all-time low price
  atl_date: string; // Date and time when the all-time low price happened
  roi: {
    times: number; // How many times the coin has multiplied compared to its initial price
    currency: string; // Base currency used to calculate ROI (like BTC)
    percentage: number; // ROI as a percentage
  } | null; // ROI can be null if not available
  last_updated: string; // Last time the data was updated (ISO timestamp)
  balance: number; //  balance field for the coin
}

export const useCryptoData = (vsCurrency: string = "usd") => {
  const [data, setData] = useState<Coin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { wallets } = useWallet();

  const fetchData = async () => {
    try {
      setLoading(true);
      const idsParam = assetList.map((coin) => coin.name).join(",");
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${vsCurrency}&ids=${idsParam}`
      );
      const json = await response.json();
      setData(json);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch crypto data.");
    } finally {
      setLoading(false);
    }
  };

  const fetchBalance = async () => {
    const ethereumPublicKey = wallets.find(
      (wallet) => wallet.name.toLowerCase() === "ethereum"
    )?.publicKey;
    const solanaPublicKey = wallets.find(
      (wallet) => wallet.name.toLowerCase() === "solana"
    )?.publicKey;
    if (!ethereumPublicKey || !solanaPublicKey) {
      console.error("Public key not found for Ethereum or Solana");
      return;
    }
    try {
      const solanaBalance = await getSolanaBalance(solanaPublicKey, "devnet");
      const ethereumBalance = await getEthereumBalance(ethereumPublicKey);
      setData((prevData) =>
        prevData.map((coin) => {
          if (coin.name.toLowerCase() === "solana") {
            return { ...coin, balance: solanaBalance / 1e9 };
          }
          if (coin.name.toLowerCase() === "ethereum") {
            return { ...coin, balance: ethereumBalance / 1e18 };
          }
          return coin;
        })
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (assetList.length > 0) {
      fetchData();
      fetchBalance();
    }
  }, [vsCurrency, wallets]);

  const refreshData = async () => {
    await fetchData();
    await fetchBalance();
  };
  return { data, loading, error, refresh: () => refreshData() };
};
