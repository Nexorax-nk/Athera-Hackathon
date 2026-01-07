import { Instagram, Mail, MapPin, Phone, Linkedin } from "lucide-react";
import GlitchText from "./GlitchText";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Instagram,
      href: "https://www.instagram.com/athera_cit/",
      label: "Instagram",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/athera-cit-21a04b39b/",
      label: "LinkedIn",
    },
    {
      icon: Mail,
      href: "mailto:athera@citchennai.net",
      label: "Email",
    },
  ];

  // ✅ UPDATED QUICK LINKS (MATCH HEADER)
  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Domains", href: "#tracks" },
    { name: "Schedule", href: "#schedule" },
    { name: "Prizes", href: "#prizes" },
    { name: "FAQ", href: "#faq" },
    { name: "Register", href: "#register" },
  ];

  return (
    <footer className="relative border-t border-border/50 bg-card/30">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-12">

          {/* BRAND */}
          <div className="md:col-span-2">
            <a href="#home" className="inline-block mb-4">
              <GlitchText className="font-orbitron font-bold text-2xl text-primary text-glow-cyan">
                HACKWITHMAGNUS
              </GlitchText>
            </a>

            <p className="font-rajdhani text-muted-foreground mb-6 max-w-sm">
              A hackathon designed to encourage students to ideate, build, and
              present impactful technological solutions addressing real-world
              problems.
            </p>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 text-neon-magenta" />
                <span className="font-mono text-sm">
                  Chennai Institute of Technology
                </span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4 text-neon-cyan" />
                <span className="font-mono text-sm">
                  athera@citchennai.net
                </span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4 text-accent" />
                <span className="font-mono text-sm">
                  9361243990 | 6381362898
                </span>
              </div>
            </div>
          </div>

          {/* QUICK LINKS */}
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
                    <GlitchText triggerOnHover className="hover:text-primary">
                      {link.name}
                    </GlitchText>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CONNECT */}
          <div>
            <h4 className="font-orbitron font-semibold text-foreground mb-4">
              Connect With Us
            </h4>

            <div className="flex gap-3 mb-6">
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

            <div className="p-4 border border-neon-cyan/30 rounded-lg bg-card/30">
              <p className="font-mono text-xs text-muted-foreground mb-1">
                Organized by
              </p>
              <p className="font-orbitron font-semibold text-sm text-primary">
                ATHERA CLUB
              </p>
              <p className="font-rajdhani text-xs text-muted-foreground">
                Chennai Institute of Technology
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs text-muted-foreground">
            © {currentYear} HACKWITHMAGNUS. All rights reserved.
          </p>

          <div className="flex gap-6">
            <a className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors">
              Code of Conduct
            </a>
          </div>
        </div>
      </div>

      {/* DECORATIVE LINE */}
      <div className="h-1 bg-gradient-to-r from-neon-cyan via-neon-magenta to-accent" />
    </footer>
  );
};

export default Footer;
