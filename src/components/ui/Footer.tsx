import { Linkedin, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" }, 
    { icon: Youtube, href: "#", label: "YouTube" }
  ];

  return (
    <footer className="py-8 px-4 border-t border-border/50">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left - Copyright */}
          <div className="text-sm text-muted-foreground">
            © 2025 Sahayak
          </div>
          
          {/* Center - Tagline */}
          <div className="text-sm text-muted-foreground">
            Your AI-powered Education Assistant
          </div>
          
          {/* Right - Social Icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-8 h-8 rounded-full bg-secondary hover:bg-black flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                >
                  <Icon className="w-4 h-4 text-muted-foreground group-hover:text-white transition-colors" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;