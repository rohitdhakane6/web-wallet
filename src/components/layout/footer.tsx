import { Wallet, Github, Twitter, Disc as Discord, Mail, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const footerLinks = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#' },
      { label: 'Security', href: '#' },
      { label: 'Roadmap', href: '#' },
      { label: 'Pricing', href: '#' },
      { label: 'FAQ', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '#' },
      { label: 'Developers', href: '#' },
      { label: 'API', href: '#' },
      { label: 'Status', href: '#' },
      { label: 'Community', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
      { label: 'Cookies', href: '#' },
      { label: 'Licenses', href: '#' },
      { label: 'Settings', href: '#' },
    ],
  },
];

export default function Footer() {

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    toast("You have been added to our newsletter.");
    const target = e.target as HTMLFormElement;
    target.reset();
  };


  return (
    <footer className="bg-muted/40 border-t pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <Wallet className="h-6 w-6 text-primary mr-2" />
              <span className="text-lg font-bold">CryptoVault</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Secure, fast, and user-friendly cryptocurrency wallet. Store, manage, and exchange your digital assets with confidence.
            </p>
            
            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                required
                className="flex-1 bg-background"
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
          
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="font-medium mb-4">{group.title}</h3>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a 
                      href={link.href} 
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} CryptoVault. All rights reserved.
          </div>
          
          <div className="flex items-center space-x-4">
            <a 
              href="#" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Discord"
            >
              <Discord className="h-5 w-5" />
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div className="text-center text-xs text-muted-foreground mt-8 flex items-center justify-center">
          Made with <Heart className="h-3 w-3 mx-1 text-red-500 inline" /> by the CryptoVault Team
        </div>
      </div>
    </footer>
  );
}