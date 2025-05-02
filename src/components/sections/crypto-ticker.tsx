import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

type CryptoPrice = {
  name: string;
  symbol: string;
  price: string;
  change: string;
  isPositive: boolean;
};

const initialPrices: CryptoPrice[] = [
  { name: 'Bitcoin', symbol: 'BTC', price: '$46,290.25', change: '+3.2%', isPositive: true },
  { name: 'Ethereum', symbol: 'ETH', price: '$2,461.78', change: '+1.8%', isPositive: true },
  { name: 'Solana', symbol: 'SOL', price: '$128.95', change: '+5.3%', isPositive: true },
  { name: 'Cardano', symbol: 'ADA', price: '$0.58', change: '-2.1%', isPositive: false },
  { name: 'Ripple', symbol: 'XRP', price: '$0.52', change: '+0.7%', isPositive: true },
  { name: 'Dogecoin', symbol: 'DOGE', price: '$0.13', change: '-1.3%', isPositive: false },
  { name: 'Polkadot', symbol: 'DOT', price: '$7.32', change: '+2.8%', isPositive: true },
  { name: 'Avalanche', symbol: 'AVAX', price: '$36.92', change: '+4.1%', isPositive: true },
];

export default function CryptoTicker() {
  const [prices, setPrices] = useState<CryptoPrice[]>(initialPrices);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Simulate price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prev => 
        prev.map(coin => {
          const change = parseFloat(coin.change.replace('%', '').replace('+', '').replace('-', ''));
          const randomChange = (Math.random() * 1 - 0.5).toFixed(1);
          const newChange = (change + parseFloat(randomChange)).toFixed(1);
          const isPositive = parseFloat(newChange) >= 0;
          
          const price = parseFloat(coin.price.replace('$', '').replace(',', ''));
          const percentChange = parseFloat(randomChange) / 100;
          const newPrice = price * (1 + percentChange);
          
          return {
            ...coin,
            price: `$${newPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            change: `${isPositive ? '+' : ''}${newChange}%`,
            isPositive,
          };
        })
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="bg-background border-y py-3 relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div 
        ref={scrollRef}
        className={cn(
          "flex space-x-12 whitespace-nowrap transition-all",
          !isPaused && "animate-ticker"
        )}
      >
        {[...prices, ...prices].map((coin, index) => (
          <div key={index} className="flex items-center space-x-2">
            <span className="font-semibold">{coin.symbol}</span>
            <span>{coin.price}</span>
            <span className={cn(
              "flex items-center",
              coin.isPositive ? "text-green-500" : "text-red-500"
            )}>
              {coin.isPositive ? 
                <ArrowUpRight className="h-3 w-3 mr-0.5" /> : 
                <ArrowDownRight className="h-3 w-3 mr-0.5" />
              }
              {coin.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}