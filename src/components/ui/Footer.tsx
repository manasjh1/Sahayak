import { 
  GraduationCap, 
  Mail, 
  MapPin, 
  Phone, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Facebook,
  Youtube,
  BookOpen,
  Users,
  FileText,
  HelpCircle,
  Shield,
  FileCheck
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { icon: BookOpen, label: "Courses", href: "#" },
    { icon: Users, label: "About Us", href: "#" },
    { icon: FileText, label: "Blog", href: "#" },
    { icon: HelpCircle, label: "Help Center", href: "#" },
  ];

  const legal = [
    { icon: Shield, label: "Privacy Policy", href: "#" },
    { icon: FileCheck, label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "Refund Policy", href: "#" },
  ];

  const socialLinks = [
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn", color: "hover:text-blue-500" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter", color: "hover:text-sky-400" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram", color: "hover:text-pink-500" },
    { icon: Facebook, href: "https://facebook.com", label: "Facebook", color: "hover:text-blue-600" },
    { icon: Youtube, href: "https://youtube.com", label: "YouTube", color: "hover:text-red-500" },
  ];

  const contactInfo = [
    { icon: Mail, text: "support@sahayak.me", href: "mailto:support@sahayak.me" },
    { icon: Phone, text: "+91 XXXXX XXXXX", href: "tel:+91XXXXXXXXXX" },
    { icon: MapPin, text: "India", href: "#" },
  ];

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 border-t border-slate-800">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">Sahayak</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Your AI-powered education assistant helping students learn smarter and teachers teach better.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`w-10 h-10 bg-slate-800/50 backdrop-blur-sm rounded-lg flex items-center justify-center text-slate-400 ${social.color} border border-slate-700/50 hover:border-slate-600 transition-all duration-300 hover:scale-110`}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors duration-300 group"
                    >
                      <Icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                      <span>{link.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Legal</h3>
            <ul className="space-y-3">
              {legal.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors duration-300 group"
                  >
                    {item.icon && <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />}
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <ul className="space-y-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <li key={index}>
                    <a
                      href={info.href}
                      className="flex items-start gap-3 text-slate-400 hover:text-cyan-400 transition-colors duration-300 group"
                    >
                      <Icon className="w-5 h-5 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                      <span className="text-sm">{info.text}</span>
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Newsletter */}
            <div className="pt-4">
              <p className="text-sm text-slate-400 mb-3">Subscribe to our newsletter</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors duration-300"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-white text-sm font-medium hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 hover:scale-105">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              © {currentYear} Sahayak. All rights reserved.
            </p>
            <p className="text-slate-500 text-sm">
              Made with <span className="text-red-500">❤</span> in India
            </p>
            <div className="flex items-center gap-4 text-slate-500 text-sm">
              <span>Powered by AI</span>
              <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
              <a href="https://sahayak.me" className="hover:text-cyan-400 transition-colors duration-300">
                sahayak.me
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
