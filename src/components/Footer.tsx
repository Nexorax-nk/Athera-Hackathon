import { Github, Twitter, Instagram, Mail, MapPin } from "lucide-react";
import GlitchText from "./GlitchText";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const displayYear = currentYear > 2077 ? currentYear : 2077;

  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com/hackswithmagnus", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com/hackswithmagnus", label: "Instagram" },
    { icon: Github, href: "https://github.com/hackswithmagnus", label: "GitHub" },
    { icon: Mail, href: "mailto:hello@hackswithmagnus.nc", label: "Email" },
  ];

  const quickLinks = [
    { name: "About", href: "#about" },
    { name: "Tracks", href: "#tracks" },
    { name: "Schedule", href: "#schedule" },
    { name: "Prizes", href: "#prizes" },
    { name: "FAQ", href: "#faq" },
    { name: "Register", href: "#register" },
  ];

  return (
    <footer className="relative border-t border-border/50 bg-card/30">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <a href="#home" className="inline-block mb-4">
              <GlitchText className="font-orbitron font-bold text-2xl text-primary text-glow-cyan">
  HACKSWITHMAGNUS
</GlitchText>

            </a>
           <GlitchText
  className="font-rajdhani text-muted-foreground mb-6 max-w-sm block"
  triggerOnHover={true}
>
  Night City's premier hackathon. 48 hours of innovation, competition, and building the future in the dark future.
</GlitchText>

            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <MapPin className="w-4 h-4 text-neon-magenta" />
              <span className="font-mono text-sm">Afterlife Club, Night City</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="w-4 h-4 text-neon-cyan" />
              <span className="font-mono text-sm">hello@hackswithmagnus.nc</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-orbitron font-semibold text-foreground mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="font-rajdhani text-muted-foreground hover:text-primary transition-colors"
                  >
                   <GlitchText className="hover:text-primary">
  {link.name}
</GlitchText>

                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-orbitron font-semibold text-foreground mb-4">
              Connect
            </h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-2 border border-border/50 rounded hover:border-neon-cyan hover:text-neon-cyan transition-all"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs text-muted-foreground">
            © {displayYear} HacksWithMagnus. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a href="#" className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors">
              Code of Conduct
            </a>
          </div>
        </div>
      </div>

      {/* Decorative line */}
      <div className="h-1 bg-gradient-to-r from-neon-cyan via-neon-magenta to-accent" />
    </footer>
  );
};

export default Footer;
