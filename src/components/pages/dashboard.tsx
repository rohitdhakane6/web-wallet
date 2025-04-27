// app/dashboard/page.tsx or your Dashboard component

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Dashboard() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-[300px] border-r p-4 flex flex-col">
        <div className="text-center mb-6">
          <div className="text-2xl font-bold">$0.00</div>
          <div className="text-muted-foreground text-sm">Portfolio Value</div>
        </div>

        {/* Wallets List */}
        <div className="space-y-2 overflow-y-auto">
          {wallets.map((wallet, index) => (
            <Card key={index} className="cursor-pointer hover:shadow-md">
              <CardContent className="flex items-center p-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  {/* Chain Icon Placeholder */}
                  <span className="text-sm font-bold">{wallet.symbol}</span>
                </div>
                <div className="ml-4">
                  <div className="font-medium">{wallet.name}</div>
                  <div className="text-sm text-muted-foreground">{wallet.balance}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Bitcoin</h2>
          <div className="text-muted-foreground">BTC</div>
        </div>

        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-3xl font-bold">$0.00</div>
            <div className="text-sm text-muted-foreground">Balance: 0 BTC</div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">Send</Button>
            <Button variant="outline">Receive</Button>
            <Button variant="outline">Swap</Button>
            <Button variant="outline">History</Button>
          </div>
        </div>

        {/* No Chart, only tabs */}
        <div className="flex space-x-4">
          {['1D', '7D', '14D', '1M', '1Y'].map((range) => (
            <Button key={range} variant="ghost" size="sm">
              {range}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

// Example dummy data
const wallets = [
  { symbol: "BTC", name: "Bitcoin", balance: "$93,922.00" },
  { symbol: "ETH", name: "Ethereum", balance: "$1,796.32" },
  { symbol: "USDT", name: "Tether", balance: "$1.00" },
  { symbol: "XRP", name: "XRP", balance: "$2.24" },
]
