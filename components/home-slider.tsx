"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useTranslation } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { X, Send } from "lucide-react"
import { gsap } from "gsap"
import { toast } from "@/components/ui/use-toast"

const slides = [
  {
    id: 1,
    image: "https://static.euronews.com/articles/stories/07/04/88/70/1200x675_cmsv2_0a756090-ca5d-5799-943e-48226670388e-7048870.jpg",
    title: "explore_tajikistan",
    subtitle: "explore_tajikistan_subtitle",
    button1: "contact_us",
    button2: "packages",
  },
  {
    id: 2,
    image: "https://eurasia.travel/wp-content/uploads/2024/08/Tajik-culture-2.jpg",
    title: "discover_tajikistan",
    subtitle: "mountains_culture_tradition",
    button1: "explore_now",
    button2: "view_packages",
  },
  {
    id: 3,
    image: "https://paramountjourney.com/wp-content/uploads/2023/03/tajik-cuisine.jpeg",
    title: "taste_national_cuisine",
    subtitle: "delicious_dishes_await",
    button1: "reserve_table",
    button2: "view_menu",
  },
]

export default function HomeSlider() {
  const { t } = useTranslation()
  const [current, setCurrent] = useState(0)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const sliderRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (textRef.current) {
    
      gsap.fromTo(
        textRef.current.children,
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
        },
      )
    }
  }, [current])

  const slide = slides[current]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const message = `
📝 New Contact Form Submission:
👤 Name: ${formData.name}
👥 Surname: ${formData.surname}
📧 Email: ${formData.email}
    `.trim()

    const BOT_TOKEN = "7766547611:AAGB8SFWPkMlRQ5ZlJ5SfnZ1G1qzVFHUB8A"
    const CHAT_ID = 5462887942

    try {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
        }),
      })

      toast({
        title: t("message_sent"),
        description: t("message_sent_description"),
      })

      setFormData({ name: "", surname: "", email: "" })
      setShowForm(false)
      window.open("https://t.me/TJKGuideBot", "_blank")
    } catch (error) {
      console.error("Telegram Error:", error)
      toast({
        title: t("error"),
        description: t("message_send_error"),
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div ref={sliderRef} className="relative h-[80vh] overflow-hidden">
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          backgroundImage: `url(${slide.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 1,
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 h-full flex items-center justify-center text-white">
        <div ref={textRef} className="text-center px-4 max-w-3xl">
          <p className="text-lg md:text-xl mb-4 text-white/90">{t(slide.subtitle)}</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">{t(slide.title)}</h1>
          <div className="flex flex-wrap justify-center gap-4">
            {slide.button1 === "contact_us" ? (
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => setShowForm(true)}
              >
                {t(slide.button1)}
              </Button>
            ) : (
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                {t(slide.button1)}
              </Button>
            )}
            <Button size="lg" variant="outline" className="border-white text-white bg-slate-700 hover:bg-white/20">
              {t(slide.button2)}
            </Button>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              index === current ? "bg-white scale-125" : "bg-white/50"
            }`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>

      {/* Contact Form Modal */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="sm:max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{t("contact_us")}</h2>
            <Button variant="ghost" size="icon" onClick={() => setShowForm(false)}>
              <X size={18} />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">{t("name")}</label>
              <Input name="name" value={formData.name} onChange={handleChange} required placeholder={t("your_name")} />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">{t("surname")}</label>
              <Input
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                required
                placeholder={t("your_surname")}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">{t("email")}</label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder={t("your_email")}
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                {t("cancel")}
              </Button>
              <Button type="submit" disabled={isSubmitting} className="flex items-center">
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {t("sending")}
                  </span>
                ) : (
                  <>
                    <Send className="mr-2" size={16} />
                    {t("send")}
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

