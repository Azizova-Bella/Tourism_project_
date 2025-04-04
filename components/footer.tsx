"use client"

import Link from "next/link"
import { useTranslation } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Twitter, Youtube, Send } from "lucide-react"

export default function Footer() {
  const { t } = useTranslation()

  const footerLinks = [
    {
      title: "company",
      links: [
        { label: "about_us", href: "#" },
        { label: "team", href: "#" },
        { label: "careers", href: "#" },
        { label: "blog", href: "#" },
      ],
    },
    {
      title: "destinations",
      links: [
        { label: "pamir_mountains", href: "#" },
        { label: "fann_mountains", href: "#" },
        { label: "dushanbe", href: "#" },
        { label: "khujand", href: "#" },
      ],
    },
    {
      title: "support",
      links: [
        { label: "faq", href: "#" },
        { label: "contact", href: "/contact" },
        { label: "privacy_policy", href: "#" },
        { label: "terms", href: "#" },
      ],
    },
  ]

  const socialLinks = [
    { icon: Facebook, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Youtube, href: "#" },
  ]

  return (
    <footer className="bg-muted pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <Link href="/" className="font-bold text-2xl text-primary">
              Tajikistan Guide
            </Link>
            <p className="mt-4 text-muted-foreground max-w-md">{t("footer_description")}</p>

            {/* Newsletter */}
            <div className="mt-6">
              <h3 className="font-medium mb-2">{t("subscribe_newsletter")}</h3>
              <div className="flex gap-2">
                <Input type="email" placeholder={t("your_email")} className="max-w-xs" />
                <Button size="icon">
                  <Send size={16} />
                </Button>
              </div>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-medium text-lg mb-4 text-primary">{t(section.title)}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                      {t(link.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Tajikistan Guide. {t("all_rights_reserved")}
          </p>

          <div className="flex space-x-4">
            {socialLinks.map((link, index) => {
              const Icon = link.icon
              return (
                <a
                  key={index}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon size={20} />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}

