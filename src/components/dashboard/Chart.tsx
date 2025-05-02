import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "next-themes";

interface ChartProps {
  selectedAsset: "bitcoin" | "ethereum" | "solana";
}

export default function Chart({ selectedAsset }: ChartProps) {
  const { theme } = useTheme();
  const [selectedTimeframe, setSelectedTimeframe] = useState("1D");
  const [chartData, setChartData] = useState([]);
  const isDarkMode = theme === "dark";

  const calculateTicks = (min: number, max: number) => {
    const step = (max - min) / 5; // Divide the range into 5 steps
    const ticks = [];
    ticks.push(min - step);
    for (let i = 0; i <= 5; i++) {
      ticks.push(min + step * i);
    }
    ticks.push(max + step);
    return ticks;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${selectedAsset}/market_chart?vs_currency=usd&days=${
            selectedTimeframe === "1D"
              ? 1
              : selectedTimeframe === "1W"
              ? 7
              : selectedTimeframe === "1M"
              ? 30
              : selectedTimeframe === "1Y"
              ? 365
              : 3650
          }`
        );
        const data = response.data.prices.map((price: any) => ({
          name: new Date(price[0]).toLocaleDateString(
            "en-US",
            selectedTimeframe === "1D"
              ? { hour: "2-digit", minute: "2-digit" }
              : selectedTimeframe === "1W"
              ? { weekday: "short", month: "short", day: "2-digit" }
              : selectedTimeframe === "1M"
              ? { month: "short", day: "2-digit" }
              : selectedTimeframe === "1Y"
              ? { month: "short", year: "numeric" }
              : { year: "numeric" }
          ),
          [selectedAsset]: price[1],
        }));
        setChartData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedAsset, selectedTimeframe]);

  // Calculate min and max values for dynamic ticks
  const minValue = Math.min(
    ...chartData.map((data: any) => data[selectedAsset])
  );
  const maxValue = Math.max(
    ...chartData.map((data: any) => data[selectedAsset])
  );
  const ticks = calculateTicks(minValue, maxValue);

  const isPriceUp =
    chartData.length > 0 &&
    chartData[chartData.length - 1][selectedAsset] >
      chartData[0][selectedAsset];
  const lineColor = isPriceUp
    ? isDarkMode
      ? "#4ade80"
      : "#22c55e"
    : isDarkMode
    ? "#f87171"
    : "#ef4444";

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Price History (Price in USD)</CardTitle>
          <CardDescription>
            {selectedAsset.charAt(0).toUpperCase() + selectedAsset.slice(1)}{" "}
            price over the last{" "}
            {selectedTimeframe === "1D"
              ? "day"
              : selectedTimeframe === "1W"
              ? "week"
              : selectedTimeframe === "1M"
              ? "month"
              : selectedTimeframe === "1Y"
              ? "year"
              : "decade"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={
                    isDarkMode
                      ? "rgba(255, 255, 255, 0.1)"
                      : "rgba(0, 0, 0, 0.1)"
                  }
                />
                <XAxis
                  dataKey="name"
                  stroke={isDarkMode ? "#a3a3a3" : "#6b7280"}
                  tick={{ fill: isDarkMode ? "#e5e7eb" : "#374151" }}
                />
                <YAxis
                  dataKey={selectedAsset}
                  stroke={isDarkMode ? "#a3a3a3" : "#6b7280"}
                  tick={{ fill: isDarkMode ? "#e5e7eb" : "#374151" }}
                  interval={0}
                  domain={[minValue, maxValue]}
                  ticks={ticks}
                  tickFormatter={(value) =>
                    typeof value === "number" ? `$${value.toFixed(2)}` : value
                  }
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDarkMode
                      ? "rgba(17, 24, 39, 0.9)"
                      : "rgba(255, 255, 255, 0.9)",
                    color: isDarkMode ? "#e5e7eb" : "#374151",
                    borderRadius: "8px",
                    border: `1px solid ${isDarkMode ? "#4b5563" : "#e5e7eb"}`,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                  labelStyle={{
                    color: isDarkMode ? "#e5e7eb" : "#374151",
                    fontWeight: "bold",
                    marginBottom: "4px",
                  }}
                  itemStyle={{
                    color: isDarkMode ? "#e5e7eb" : "#374151",
                  }}
                  formatter={(value) =>
                    typeof value === "number" ? `${value.toFixed(2)}` : value
                  }
                />
                <Line
                  type="monotone"
                  dataKey={selectedAsset}
                  stroke={lineColor}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 8, fill: isDarkMode ? "#a78bfa" : "#8884d8" }}
                  animationDuration={1000}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-2">
          <Button
            variant={selectedTimeframe === "1D" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedTimeframe("1D")}
          >
            1D
          </Button>
          <Button
            variant={selectedTimeframe === "1W" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedTimeframe("1W")}
          >
            1W
          </Button>
          <Button
            variant={selectedTimeframe === "1M" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedTimeframe("1M")}
          >
            1M
          </Button>
          <Button
            variant={selectedTimeframe === "1Y" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedTimeframe("1Y")}
          >
            1Y
          </Button>
          {/* <Button
            variant={selectedTimeframe === "All" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedTimeframe("All")}
          >
            All
          </Button> */}
        </CardFooter>
      </Card>
    </div>
  );
}
