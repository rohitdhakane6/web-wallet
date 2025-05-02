import StatCard from "@/components/dashboard/StatsCard";
import {
  ArrowDownLeft,
  ArrowUpRight,
  BarChart3,
  CoinsIcon,
  DollarSign,
  Wallet,
} from "lucide-react";

interface SectionCardProps {
  price: number;
  holdings: number;
  symbol: string;
  changeInPrice: number;
  marketCap: number;
  marketCapRank: number;
  volume: number;
  circulatingSupply: number;
  maxSupply: number;
}

export default function SectionCard({
  price,
  holdings,
  changeInPrice,
  symbol,
  marketCap,
  marketCapRank,
  volume,
  maxSupply,
  circulatingSupply,
}: SectionCardProps) {
  const portfolioValue = holdings * price;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Portfolio Overview */}
      <StatCard
        title="Portfolio Overview"
        value={`${portfolioValue.toFixed(2)} USD`}
        subtitle={
          <div className="flex flex-col text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">
                Current Price:
              </span>
              <span>${price}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">
                24h Change:
              </span>
              <span
                className={`flex items-center ${
                  changeInPrice >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {changeInPrice >= 0 ? (
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDownLeft className="h-3 w-3 mr-1" />
                )}
                {changeInPrice >= 0 ? "+" : ""}
                {changeInPrice}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">
                Holdings:
              </span>
              <span>
                {holdings} {symbol.toLocaleUpperCase()}{" "}
              </span>
            </div>
          </div>
        }
        className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-100 dark:border-blue-900"
        icon={<DollarSign className="h-4 w-4" />}
      />

      {/* Market Cap */}
      <StatCard
        title="Market Cap"
        value={`${marketCap.toLocaleString()} USD`}
        subtitle={
          <span className="text-muted-foreground">Rank: #{marketCapRank}</span>
        }
        className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-950/30 dark:to-teal-950/30 border-green-100 dark:border-green-900"
        icon={<BarChart3 className="h-4 w-4" />}
      />

      {/* Total Volume */}
      <StatCard
        title="Total Volume"
        value={`${volume.toLocaleString()} USD`}
        className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-amber-100 dark:border-amber-900"
        icon={<CoinsIcon className="h-4 w-4" />}
      />

      {/* Circulating Supply */}
      <StatCard
        title="Circulating Supply"
        value={`${circulatingSupply.toLocaleString()} ${symbol.toLocaleUpperCase()}`}
        subtitle={
          <span className="text-muted-foreground">Max: {maxSupply || "∞"}</span>
        }
        className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-purple-100 dark:border-purple-900"
        icon={<Wallet className="h-4 w-4" />}
      />
    </div>
  );
}
