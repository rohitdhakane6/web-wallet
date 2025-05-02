import { cn } from '@/lib/utils';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/use-in-view';
import { 
  Shield, 
  Lock, 
  Key, 
  FileCheck, 
  RefreshCw, 
  UserCheck, 
  ServerOff,
  AlertTriangle,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

const securityFeatures = [
  {
    icon: Lock,
    title: 'Advanced Encryption',
    description: 'Enterprise-grade AES-256 encryption for all data at rest and in transit.',
  },
  {
    icon: Key,
    title: 'Self-Custody',
    description: 'You control your private keys. No one else can access your funds.',
  },
  {
    icon: FileCheck,
    title: 'Regular Audits',
    description: 'Security audited by leading firms to ensure the highest standards.',
  },
  {
    icon: RefreshCw,
    title: 'Automatic Backups',
    description: 'Encrypted backups to recover your wallet if needed.',
  },
  {
    icon: UserCheck,
    title: 'Multi-Factor Auth',
    description: 'Extra layers of protection with biometric and 2FA options.',
  },
  {
    icon: ServerOff,
    title: 'No Single Point of Failure',
    description: 'Distributed architecture prevents central security vulnerabilities.',
  },
];

export default function SecuritySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  return (
    <section 
      id="security" 
      className="py-20 relative overflow-hidden"
      ref={ref}
    >
      {/* Background security pattern */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="w-full h-full">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-sm md:text-base font-mono"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.1,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            >
              {[
                '🔒', '0x1a2b3c', 'ENCRYPT', 'SECURE', 'HASH',
                '256-BIT', 'VERIFY', 'AUTH', 'PROTECT', 'SHA256'
              ][i % 10]}
            </div>
          ))}
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge 
              variant="outline" 
              className="mb-4 bg-background"
            >
              Bank-Grade Security
            </Badge>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              We take your security{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-red-500">
                extremely seriously
              </span>
            </h2>
            
            <p className="text-muted-foreground text-lg mb-6">
              Your assets deserve the highest level of protection. Our wallet implements multiple layers of security to keep your crypto safe from all threats.
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 flex items-start space-x-4">
                <div className="shrink-0">
                  <AlertTriangle className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Security Advisory</h4>
                  <p className="text-sm text-muted-foreground">
                    Never share your seed phrase or private keys with anyone, including CryptoVault support. We will never ask for this information.
                  </p>
                </div>
              </div>
            </motion.div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700">
                <Shield className="mr-2 h-4 w-4" />
                Security Features
              </Button>
              <Button variant="outline">
                Learn About Our Audits
              </Button>
            </div>
          </div>
          
          <div>
            <div className="bg-card/50 backdrop-blur-md rounded-xl border shadow-lg p-6">
              <div className="flex items-center mb-6">
                <Shield className="h-6 w-6 text-green-500 mr-2" />
                <h3 className="text-xl font-bold">Security Certifications</h3>
              </div>
              
              <div className="space-y-6">
                {securityFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 20 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className={cn(
                      "flex gap-4",
                      index !== securityFeatures.length - 1 && "pb-6 border-b"
                    )}
                  >
                    <div className="shrink-0 bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <Separator className="my-16" />
        
        <div className="text-center max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">Trusted by security experts worldwide</h3>
          <p className="text-muted-foreground mb-8">
            Our security measures have been verified and acclaimed by leading cybersecurity firms.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {['Securitas', 'CryptoGuard', 'BlockShield', 'SafeChain'].map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                className="flex justify-center"
              >
                <div className="bg-muted/60 rounded-lg px-4 py-2 w-full text-center">
                  <span className="font-semibold text-muted-foreground">{partner}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}