import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItemProps {
  symbol: string;
  name: string;
  price: number;
  colour?: string;
  change: number;
  balance: number;
  icon: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

export default function NavItem({
  symbol,
  name,
  price,
  change,
  balance,
  colour,
  icon,
  isActive = false,
  onClick,
}: NavItemProps) {
  return (
    <li>
      <button
        onClick={onClick}
        className={cn(
          "w-full cursor-pointer flex items-center justify-between p-3 rounded-lg transition-colors",
          isActive
            ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
            : "hover:bg-slate-100 dark:hover:bg-slate-800"
        )}
      >
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center text-white",
              colour
            )}
          >
            {icon}
          </div>
          <div className="text-left">
            <h3 className="font-medium capitalize">{name}</h3>
            <p className="text-sm text-muted-foreground">
              {balance} {symbol.toLocaleUpperCase()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-right">
            <p className="font-medium text-sm">${price.toLocaleString()}</p>
            <p
              className={cn(
                "text-xs",
                change >= 0 ? "text-green-600" : "text-red-600"
              )}
            >
              {change >= 0 ? "+" : ""}
              {change}%
            </p>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </div>
      </button>
    </li>
  );
}
