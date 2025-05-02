import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";
import { Button } from "@/components/ui/button";
import { ArrowRight, Wallet, Shield, RefreshCw } from "lucide-react";

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  return (
    <section className="py-20 relative overflow-hidden" ref={ref}>
      {/* Background gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 blur-3xl transform -translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl overflow-hidden shadow-2xl">
          <div className="relative p-8 md:p-12">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white blur-3xl" />
              <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-white blur-3xl" />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <motion.h2
                  className="text-3xl md:text-4xl font-bold text-white mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
                  transition={{ duration: 0.5 }}
                >
                  Start managing your crypto with confidence
                </motion.h2>

                <motion.p
                  className="text-blue-100 text-lg mb-8 max-w-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  Join thousands of users who trust CryptoVault for their
                  digital asset security. Setting up is quick and easy.
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Button size="lg" variant="outline">
                    Create Wallet
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </motion.div>
              </div>

              <div className="lg:text-right">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    {
                      icon: Wallet,
                      title: "Wallet Setup",
                      description: "Create a wallet in less than 2 minutes",
                    },
                    {
                      icon: Shield,
                      title: "Secure Storage",
                      description: "Your keys always stay under your control",
                    },
                    {
                      icon: RefreshCw,
                      title: "Easy Transfers",
                      description:
                        "Send and receive crypto with just a few clicks",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{
                        opacity: isInView ? 1 : 0,
                        x: isInView ? 0 : 20,
                      }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white"
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <item.icon className="h-5 w-5" />
                        <h3 className="font-semibold">{item.title}</h3>
                      </div>
                      <p className="text-sm text-blue-100">
                        {item.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <motion.p
            className="text-muted-foreground mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Join our growing community of crypto enthusiasts
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            {[
              "Over 2 million users",
              "150+ countries",
              "99.99% uptime",
              "24/7 support",
              "$10B+ assets stored",
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-muted px-4 py-2 rounded-full text-sm"
              >
                {stat}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
