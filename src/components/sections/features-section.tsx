import { cn } from "@/lib/utils";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";
import {
  Wallet,
  LockKeyhole,
  BarChart3,
  RefreshCw,
  Globe,
  Shield,
  Smartphone,
  Zap,
  CheckCircle2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const features = [
  {
    icon: Wallet,
    title: "Asset Management",
    description:
      "Store and manage multiple cryptocurrencies in one secure place with real-time portfolio tracking.",
    badge: "Core Feature",
    tab: "manage",
  },
  {
    icon: RefreshCw,
    title: "Fast Transactions",
    description:
      "Send and receive crypto with lightning speed. Enjoy low transaction fees and quick confirmations.",
    badge: "Enhanced",
    tab: "transact",
  },
  {
    icon: BarChart3,
    title: "Portfolio Tracking",
    description:
      "Track your portfolio performance with detailed analytics, charts, and insights.",
    badge: "Analytics",
    tab: "track",
  },
  {
    icon: LockKeyhole,
    title: "Bank-grade Security",
    description:
      "Enterprise-level security with advanced encryption, two-factor authentication, and biometric protection.",
    badge: "Security",
    tab: "secure",
  },
  {
    icon: Globe,
    title: "Cross-chain Support",
    description:
      "Seamlessly interact with multiple blockchains from a single wallet interface.",
    badge: "Interoperability",
    tab: "manage",
  },
  {
    icon: Smartphone,
    title: "Mobile-first Design",
    description:
      "Access your wallet anytime, anywhere with our mobile-optimized experience.",
    badge: "Accessibility",
    tab: "transact",
  },
  {
    icon: Shield,
    title: "Self-custody Solution",
    description:
      "Maintain complete control of your private keys with our non-custodial architecture.",
    badge: "Ownership",
    tab: "secure",
  },
  {
    icon: Zap,
    title: "Lightning Network",
    description:
      "Support for Bitcoin Lightning Network payments for instant, low-cost transactions.",
    badge: "Speed",
    tab: "transact",
  },
];

const tabContent = {
  manage: {
    title: "Seamless Asset Management",
    description: "Manage all your digital assets in one secure location",
    image:
      "https://images.pexels.com/photos/7788009/pexels-photo-7788009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    benefits: [
      "Simplified portfolio overview with customizable dashboards",
      "Multi-wallet support for different purposes",
      "Detailed transaction history with filtering options",
      "Custom labeling for transactions and addresses",
      "Smart notifications for important events",
    ],
  },
  transact: {
    title: "Fast & Secure Transactions",
    description: "Send and receive crypto with confidence",
    image:
      "https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    benefits: [
      "Lightning-fast transaction processing",
      "Custom fee settings for optimal speed/cost balance",
      "Batch transactions for efficiency",
      "Address book for frequent recipients",
      "Scheduled transactions for recurring payments",
    ],
  },
  track: {
    title: "Advanced Portfolio Analytics",
    description: "Gain insights into your investment performance",
    image:
      "https://images.pexels.com/photos/6774731/pexels-photo-6774731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    benefits: [
      "Real-time performance tracking across all assets",
      "Historical data visualization with customizable charts",
      "Tax reporting tools and export options",
      "Price alerts and notifications",
      "Market intelligence and trend analysis",
    ],
  },
  secure: {
    title: "Uncompromising Security",
    description: "Enterprise-grade protection for your digital assets",
    image:
      "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    benefits: [
      "Multi-layer encryption for all sensitive data",
      "Optional biometric authentication",
      "Hardware wallet integration",
      "Advanced phishing protection",
      "Regular security audits by independent experts",
    ],
  },
};

export default function FeaturesSection() {
  const [activeTab, setActiveTab] = useState("manage");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  return (
    <section id="features" className="bg-muted/30 py-20" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4 bg-background">
            Powerful Features
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything you need to manage your crypto
          </h2>
          <p className="text-muted-foreground text-lg">
            Our wallet combines security, speed, and usability to provide the
            best experience for both beginners and experts.
          </p>
        </div>

        <Tabs
          defaultValue="manage"
          value={activeTab}
          onValueChange={setActiveTab}
          className="mb-12"
        >
          <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full max-w-2xl mx-auto mb-6">
            <TabsTrigger value="manage">Manage</TabsTrigger>
            <TabsTrigger value="transact">Transact</TabsTrigger>
            <TabsTrigger value="track">Track</TabsTrigger>
            <TabsTrigger value="secure">Secure</TabsTrigger>
          </TabsList>

          {Object.entries(tabContent).map(([key, content]) => (
            <TabsContent
              key={key}
              value={key}
              className={cn(
                "transition-all duration-500",
                activeTab === key
                  ? "opacity-100 transform translate-y-0"
                  : "opacity-0 transform translate-y-4"
              )}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="order-2 lg:order-1">
                  <h3 className="text-2xl font-bold mb-3">{content.title}</h3>
                  <p className="text-muted-foreground mb-6">
                    {content.description}
                  </p>

                  <ul className="space-y-3">
                    {content.benefits.map((benefit, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{
                          opacity: isInView ? 1 : 0,
                          x: isInView ? 0 : -10,
                        }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-start"
                      >
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                        <span>{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="order-1 lg:order-2">
                  <div className="rounded-xl overflow-hidden aspect-video shadow-xl bg-card relative transform hover:scale-[1.02] transition-transform duration-300">
                    <img
                      src={content.image}
                      alt={content.title}
                      className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setActiveTab(feature.tab)}
            >
              <Card
                className={cn(
                  "h-full cursor-pointer transition-all duration-300 hover:shadow-lg",
                  activeTab === feature.tab ? "border-primary shadow-md" : ""
                )}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <Badge variant="secondary" className="font-normal text-xs">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="mt-3">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
