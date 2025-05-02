import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { ArrowRight, Shield, Clock, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router";
import { useCryptoData } from "@/hooks/crypto-data";

export default function HeroSection() {
  const { data } = useCryptoData();
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background">
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl transform -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 right-0 h-[500px] bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-green-500/10 blur-3xl transform translate-y-1/2" />
      </div>

      {/* Cryptocurrency symbols floating in the background */}
      <div className="absolute inset-0 overflow-hidden z-0 opacity-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl md:text-3xl font-bold text-foreground/20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 45 - 22.5}deg)`,
              animation: `float ${10 + Math.random() * 20}s linear infinite`,
              animationDelay: `-${Math.random() * 20}s`,
            }}
          >
            {["₿", "Ξ", "₸", "Ł", "Ð", "₳", "₴", "₵", "₱", "₲"][i % 10]}
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div
            className={cn(
              "flex flex-col space-y-6 transition-all duration-1000 transform",
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            )}
          >
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold bg-muted/50 self-start">
              <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2"></span>
              New Features Available
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Secure your crypto{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-violet-500">
                with confidence
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
              Store, manage, and exchange your digital assets with the most
              secure and user-friendly wallet in the crypto space.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white transition-all"
                onClick={() => navigate("/dashboard")}
              >
                Create Wallet
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="flex flex-col items-center">
                <div className="font-bold text-xl sm:text-2xl">50M+</div>
                <div className="text-muted-foreground text-sm text-center">
                  Users Worldwide
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="font-bold text-xl sm:text-2xl">250+</div>
                <div className="text-muted-foreground text-sm text-center">
                  Cryptocurrencies
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="font-bold text-xl sm:text-2xl">99.99%</div>
                <div className="text-muted-foreground text-sm text-center">
                  Uptime
                </div>
              </div>
            </div>
          </div>

          <div
            className={cn(
              "relative transition-all duration-1000 delay-300 transform",
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            )}
          >
            <div className="relative z-10 bg-card/50 backdrop-blur-lg border rounded-xl shadow-xl overflow-hidden transform rotate-1 hover:rotate-0 transition-transform duration-500">
              <div className="p-6 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10">
                {/* Simulated wallet interface */}
                <div className="bg-card rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold">My Portfolio</h3>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate("/dashboard")}
                    >
                      View All
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {["Solana", "Ethereum"].map((coinName) => {
                      const coin = data.find((c) => c.name === coinName);

                      return (
                        <div
                          key={coinName}
                          className="flex items-center justify-between p-3 bg-background/50 rounded-lg hover:bg-background/80 transition-colors"
                        >
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full mr-3 flex items-center justify-center text-green-500 bg-green-500/10">
                              <img src={coin?.image} alt="" />
                            </div>
                            <div>
                              <div className="font-medium">
                                {coin?.name || coinName}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {coin?.symbol?.toUpperCase() || ""}
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="font-medium">
                              {coin?.current_price
                                ? `${coin.current_price} USD`
                                : "N/A"}
                            </div>
                            <div
                              className={cn(
                                "text-xs",
                                (coin?.price_change_percentage_24h || 0) > 0
                                  ? "text-green-500"
                                  : "text-red-500"
                              )}
                            >
                              {coin?.price_change_percentage_24h
                                ? `${coin.price_change_percentage_24h.toFixed(
                                    2
                                  )}%`
                                : "N/A"}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-card rounded-lg p-3 text-center hover:shadow-md transition-shadow">
                    <Shield className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <div className="text-xs font-medium">Secure</div>
                  </div>
                  <div className="bg-card rounded-lg p-3 text-center hover:shadow-md transition-shadow">
                    <Clock className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <div className="text-xs font-medium">Fast</div>
                  </div>
                  <div className="bg-card rounded-lg p-3 text-center hover:shadow-md transition-shadow">
                    <BarChart3 className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <div className="text-xs font-medium">Analytics</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual elements */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-blue-500/30 rounded-full blur-2xl" />
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
