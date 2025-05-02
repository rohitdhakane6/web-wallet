import { cn } from '@/lib/utils';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/use-in-view';
import { 
  Check, 
  X,
  CreditCard, 
  BadgeCheck,
  Wallet,
  Zap,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

type PlanFeature = {
  name: string;
  basic: boolean;
  pro: boolean;
  enterprise: boolean;
};

const planFeatures: PlanFeature[] = [
  { name: 'Unlimited wallets', basic: true, pro: true, enterprise: true },
  { name: 'Real-time portfolio tracking', basic: true, pro: true, enterprise: true },
  { name: 'Basic security features', basic: true, pro: true, enterprise: true },
  { name: 'Transaction history', basic: true, pro: true, enterprise: true },
  { name: 'Mobile app access', basic: true, pro: true, enterprise: true },
  { name: 'Advanced analytics', basic: false, pro: true, enterprise: true },
  { name: 'Priority support', basic: false, pro: true, enterprise: true },
  { name: 'Multiple portfolio profiles', basic: false, pro: true, enterprise: true },
  { name: 'Enhanced security suite', basic: false, pro: true, enterprise: true },
  { name: 'API access', basic: false, pro: false, enterprise: true },
  { name: 'White-glove onboarding', basic: false, pro: false, enterprise: true },
  { name: 'Custom integrations', basic: false, pro: false, enterprise: true },
];

export default function PricingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const [annual, setAnnual] = useState(true);

  return (
    <section 
      id="pricing" 
      className="py-20 bg-muted/30"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge 
            variant="outline" 
            className="mb-4 bg-background"
          >
            Pricing Plans
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Choose the perfect plan for your needs
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            From basic wallets to enterprise-grade solutions, we've got you covered.
          </p>
          
          <div className="flex items-center justify-center space-x-4">
            <Label htmlFor="billing-toggle" className={cn(
              "transition-colors", 
              !annual ? "text-foreground" : "text-muted-foreground"
            )}>
              Monthly
            </Label>
            <Switch 
              id="billing-toggle" 
              checked={annual} 
              onCheckedChange={setAnnual}
            />
            <Label htmlFor="billing-toggle" className={cn(
              "transition-colors", 
              annual ? "text-foreground" : "text-muted-foreground"
            )}>
              Annually <Badge variant="outline" className="ml-1 text-xs font-normal">Save 20%</Badge>
            </Label>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Basic Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.5 }}
            className="bg-card border rounded-xl shadow-sm overflow-hidden relative"
          >
            <div className="p-6 pb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Basic</h3>
                <Badge variant="secondary">Free</Badge>
              </div>
              <div className="mb-4">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="text-muted-foreground mb-6">
                Perfect for beginners exploring the crypto space.
              </p>
              <Button className="w-full" variant="outline">
                <Wallet className="mr-2 h-4 w-4" />
                Get Started Free
              </Button>
            </div>
            <div className="bg-muted/40 p-6">
              <div className="flex items-center mb-4">
                <CreditCard className="h-5 w-5 mr-2 text-primary" />
                <span className="font-medium">Basic Features</span>
              </div>
              <ul className="space-y-3">
                {planFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm">
                    {feature.basic ? (
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                    ) : (
                      <X className="h-4 w-4 text-muted-foreground mr-2" />
                    )}
                    <span className={feature.basic ? '' : 'text-muted-foreground'}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
          
          {/* Pro Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card border rounded-xl shadow-lg overflow-hidden relative transform md:scale-105 md:-translate-y-1 z-10"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
            <div className="p-6 pb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Pro</h3>
                <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">Popular</Badge>
              </div>
              <div className="mb-4">
                <span className="text-4xl font-bold">${annual ? '12' : '15'}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="text-muted-foreground mb-6">
                For active traders and serious crypto enthusiasts.
              </p>
              <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                <Zap className="mr-2 h-4 w-4" />
                Upgrade to Pro
              </Button>
            </div>
            <div className="bg-muted/40 p-6">
              <div className="flex items-center mb-4">
                <BadgeCheck className="h-5 w-5 mr-2 text-blue-500" />
                <span className="font-medium">Everything in Basic, plus:</span>
              </div>
              <ul className="space-y-3">
                {planFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm">
                    {feature.pro ? (
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                    ) : (
                      <X className="h-4 w-4 text-muted-foreground mr-2" />
                    )}
                    <span className={feature.pro ? '' : 'text-muted-foreground'}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
          
          {/* Enterprise Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card border rounded-xl shadow-sm overflow-hidden relative"
          >
            <div className="p-6 pb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Enterprise</h3>
                <Badge variant="secondary">Custom</Badge>
              </div>
              <div className="mb-4">
                <span className="text-4xl font-bold">Custom</span>
              </div>
              <p className="text-muted-foreground mb-6">
                Tailored solutions for businesses and institutions.
              </p>
              <Button className="w-full" variant="outline">
                Contact Sales
              </Button>
            </div>
            <div className="bg-muted/40 p-6">
              <div className="flex items-center mb-4">
                <BadgeCheck className="h-5 w-5 mr-2 text-primary" />
                <span className="font-medium">Everything in Pro, plus:</span>
              </div>
              <ul className="space-y-3">
                {planFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm">
                    {feature.enterprise ? (
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                    ) : (
                      <X className="h-4 w-4 text-muted-foreground mr-2" />
                    )}
                    <span>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
        
        <div className="mt-16 text-center bg-card border rounded-xl p-8 max-w-3xl mx-auto">
          <h3 className="text-xl font-bold mb-4">
            Need a custom solution?
          </h3>
          <p className="text-muted-foreground mb-6">
            Our enterprise plan can be customized to fit your organization's specific requirements. From custom integrations to dedicated support, we've got you covered.
          </p>
          <Button size="lg">
            Schedule a Consultation
          </Button>
        </div>
      </div>
    </section>
  );
}