import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

import {
  Menu,
  X,
  Wallet,
  ChevronDown,
  DivideIcon as LucideIcon,
} from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { useNavigate } from "react-router";

type NavItem = {
  title: string;
  href: string;
  icon?: typeof LucideIcon;
  children?: {
    title: string;
    href: string;
    description: string;
  }[];
};

const navItems: NavItem[] = [
  {
    title: "Features",
    href: "#features",
  },
  {
    title: "Security",
    href: "#security",
  },
  {
    title: "Pricing",
    href: "#pricing",
  },
  {
    title: "Resources",
    href: "#resources",
    children: [
      {
        title: "Documentation",
        href: "#",
        description: "Detailed guides and API references.",
      },
      {
        title: "Blog",
        href: "#",
        description: "Latest updates and articles.",
      },
      {
        title: "Community",
        href: "#",
        description: "Join our Discord community.",
      },
    ],
  },
];

export default function Header() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll event to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out p-4 md:px-8",
        isScrolled
          ? "bg-background/90 backdrop-blur-md shadow-sm border-b"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="/">
          <div className="flex items-center">
            <Wallet className="h-8 w-8 text-primary mr-2" />
            <span className="text-xl font-bold">CryptoVault</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
          {navItems.map((item) => (
            <div key={item.title} className="relative group">
              <a
                href={item.href}
                className="text-foreground/80 hover:text-foreground transition-colors flex items-center"
              >
                {item.title}
                {item.children && (
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
                )}
              </a>

              {item.children && (
                <div className="absolute left-0 top-full mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 origin-top-left">
                  <div className="py-2 bg-popover rounded-md shadow-lg border">
                    {item.children.map((child) => (
                      <a
                        key={child.title}
                        href={child.href}
                        className="block px-4 py-2 hover:bg-accent text-sm"
                      >
                        <div className="font-medium">{child.title}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {child.description}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <ModeToggle />

          <Button
          onClick={() => navigate("/dashboard")}
            className="transition-all bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Create Wallet
          </Button>
        </div>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between py-4">
                <div className="flex items-center">
                  <Wallet className="h-6 w-6 text-primary mr-2" />
                  <span className="text-lg font-bold">CryptoVault</span>
                </div>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </SheetTrigger>
              </div>

              <nav className="flex flex-col space-y-4 py-8">
                {navItems.map((item) => (
                  <div key={item.title}>
                    <a
                      href={item.href}
                      className="text-foreground/80 hover:text-foreground transition-colors block py-2 font-medium"
                    >
                      {item.title}
                    </a>

                    {item.children && (
                      <div className="ml-4 mt-2 space-y-2">
                        {item.children.map((child) => (
                          <a
                            key={child.title}
                            href={child.href}
                            className="text-muted-foreground hover:text-foreground transition-colors block py-1 text-sm"
                          >
                            {child.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              <div className="mt-auto space-y-4 py-6">
                <ModeToggle />

                <Button
                  className="w-full"
                  onClick={() => navigate("/dashboard")}
                >
                  Create Wallet
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
