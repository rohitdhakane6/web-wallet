import { useState, useEffect } from "react";
import { Wallet, Settings, RefreshCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import NavItem from "@/components/dashboard/Navitem";
import SendDialog from "@/components/dashboard/SendDialog";
import ReceiveDialog from "@/components/dashboard/ReceiveDialog";
import { ModeToggle } from "@/components/mode-toggle";
import { assetList } from "@/data";
import SectionCard from "@/components/dashboard/SectionCard";
import Chart from "@/components/dashboard/Chart";
import { useCryptoData } from "@/hooks/crypto-data";
import { useWallet } from "@/context/WalletContext";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("chart");
  const [activeAsset, setActiveAsset] = useState("sol");

  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const { data: assetData, error, loading, refresh } = useCryptoData();
  const { wallets } = useWallet();
  const currentAssetData = assetData.find((a) => a.symbol === activeAsset);
  console.log(currentAssetData);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  if (error) {
    toast.error("Failed to fetch asset data");
  }
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 transition-transform duration-300 fixed md:relative z-30 
          w-72 md:w-64 lg:w-72 border-r p-4 flex flex-col bg-white dark:bg-slate-900 h-screen`}
      >
        <div className="flex items-center gap-2 mb-8">
          <Wallet className="h-6 w-6 text-blue-600" />
          <h1 className="text-2xl font-bold">CryptoVault</h1>

          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto"
              onClick={() => setIsSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              &times;
            </Button>
          )}
        </div>

        <nav className="flex flex-col gap-1 w-full flex-1 overflow-auto p-2">
          <h2 className="text-xs uppercase font-semibold text-muted-foreground mb-2 ml-1">
            My Assets
          </h2>

          <ul className="space-y-2">
            {loading
              ? assetList.map((asset) => (
                  <Skeleton key={asset.symbol} className=" h-15 w-[240px]" />
                ))
              : assetList.map((asset) => {
                  return (
                    <NavItem
                      key={asset.symbol}
                      icon={asset.icon}
                      name={asset.name}
                      balance={
                        assetData.find((a) => a.symbol === asset.symbol)
                          ?.balance || 0
                      }
                      symbol={asset.symbol}
                      price={
                        assetData.find((a) => a.symbol === asset.symbol)
                          ?.current_price || 0
                      }
                      change={
                        assetData.find((a) => a.symbol === asset.symbol)
                          ?.price_change_percentage_24h || 0
                      }
                      isActive={asset.symbol === activeAsset}
                      onClick={() => setActiveAsset(asset.symbol)}
                    />
                  );
                })}
          </ul>
        </nav>

        <div className="mt-auto hidden md:block">
          <div className="flex items-center justify-between mb-4">
            <Button variant="outline" className="gap-2">
              <Settings className="w-4 h-4" /> Settings
            </Button>
            <ModeToggle />
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-2">
              Upgrade to Pro
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
              Get advanced trading features, lower fees, and priority support
            </p>
            <Button size="sm" className="w-full text-xs">
              Upgrade Now
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 overflow-auto h-screen relative">
        {/* Mobile header with menu button */}
        {isMobile && (
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(true)}
            >
              <span className="sr-only">Open menu</span>☰
            </Button>
            <div className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-blue-600" />
              <h1 className="text-xl font-bold">CryptoVault</h1>
            </div>
            <ModeToggle />
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-3 mb-6">
            <h2 className="text-2xl font-bold capitalize">
            {assetList.find((asset) => asset.symbol === activeAsset)?.name ||
              "Unknown Asset"} (Devnet Mode)
            </h2>

          <div className="ml-auto flex gap-3">
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={refresh}
            >
              <RefreshCcw />
            </Button>
            <SendDialog
              privateKey={
                wallets.find(
                  (wallet) =>
                    wallet.name.toLowerCase() ===
                    currentAssetData?.name.toLowerCase()
                )?.privateKey || ""
              }
              name={currentAssetData?.name || ""}
              symbol={currentAssetData?.symbol || ""}
            />
            <ReceiveDialog
              name={currentAssetData?.name || ""}
              symbol={currentAssetData?.symbol || ""}
              publicKey={
                wallets.find(
                  (wallet) =>
                    wallet.name.toLowerCase() ===
                    currentAssetData?.name.toLowerCase()
                )?.publicKey || ""
              }
            />
          </div>
        </div>

        {currentAssetData && (
          <SectionCard
            holdings={currentAssetData.balance}
            symbol={activeAsset}
            price={currentAssetData.current_price || 0}
            changeInPrice={currentAssetData.price_change_percentage_24h ?? 0}
            marketCap={currentAssetData.market_cap}
            marketCapRank={currentAssetData.market_cap_rank || 0}
            volume={currentAssetData.total_volume || 0}
            circulatingSupply={currentAssetData.circulating_supply || 0}
            maxSupply={currentAssetData.max_supply || 0}
          />
        )}

        {/* Tabs for different sections */}
        <Tabs
          defaultValue="chart"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
            <TabsTrigger value="chart" className="cursor-pointer">
              Price Chart
            </TabsTrigger>
            <TabsTrigger value="transactions" className="cursor-pointer">
              Transactions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chart">
            <Chart
              selectedAsset={
                (assetList.find((asset) => asset.symbol === activeAsset)
                  ?.name as "bitcoin" | "ethereum" | "solana") || "solana"
              }
            />
          </TabsContent>
          <TabsContent value="transactions"></TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
