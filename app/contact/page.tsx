"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslation } from "@/components/language-provider"
import { gsap } from "gsap"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { toast } from "@/components/ui/use-toast"
import { MapPin, Phone, Mail, Send } from "lucide-react"
import Image from 'next/image'
export default function ContactPage() {
  const { t } = useTranslation()
  const formRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Form animation
    if (formRef.current) {
      gsap.fromTo(formRef.current, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" })
    }

    // Info animation
    if (infoRef.current) {
      gsap.fromTo(infoRef.current, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" })
    }
  }, [])

  // Form validation schema
  const formSchema = z.object({
    name: z.string().min(2, {
      message: t("name_too_short"),
    }),
    surname: z.string().min(2, {
      message: t("surname_too_short"),
    }),
    email: z.string().email({
      message: t("invalid_email"),
    }),
    message: z.string().min(10, {
      message: t("message_too_short"),
    }),
  })

  // Form setup
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      message: "",
    },
  })

  // Form submission handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      const message = `
📝 New Contact Form Submission:
👤 Name: ${values.name}
👥 Surname: ${values.surname}
📧 Email: ${values.email}
💬 Message: ${values.message}
      `.trim()

      const BOT_TOKEN = "7766547611:AAGB8SFWPkMlRQ5ZlJ5SfnZ1G1qzVFHUB8A"
      const CHAT_ID = 5462887942

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

      form.reset()
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
    <div className="min-h-screen py-12 px-4 md:px-8 lg:px-16 bg-background">
      <div className="container mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-primary text-center">{t("contact_us")}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card ref={formRef} className="overflow-hidden">
            <CardHeader className="bg-primary text-primary-foreground">
              <CardTitle>{t("send_us_message")}</CardTitle>
              <CardDescription className="text-primary-foreground/80">{t("contact_form_description")}</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("name")}</FormLabel>
                          <FormControl>
                            <Input placeholder={t("your_name")} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="surname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("surname")}</FormLabel>
                          <FormControl>
                            <Input placeholder={t("your_surname")} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("email")}</FormLabel>
                        <FormControl>
                          <Input placeholder={t("your_email")} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("message")}</FormLabel>
                        <FormControl>
                          <Textarea placeholder={t("your_message")} className="min-h-[120px]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                      <span className="flex items-center">
                        <Send className="mr-2" size={18} />
                        {t("send_message")}
                      </span>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card ref={infoRef}>
            <CardHeader className="bg-primary text-primary-foreground">
              <CardTitle>{t("contact_information")}</CardTitle>
              <CardDescription className="text-primary-foreground/80">{t("contact_info_description")}</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="flex items-start">
                <MapPin className="text-primary mr-4 mt-1" />
                <div>
                  <h3 className="font-medium text-lg">{t("address")}</h3>
                  <p className="text-muted-foreground">Rudaki Avenue 80, Dushanbe, Tajikistan</p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="text-primary mr-4 mt-1" />
                <div>
                  <h3 className="font-medium text-lg">{t("phone")}</h3>
                  <p className="text-muted-foreground">+992 37 221 18 03</p>
                  <p className="text-muted-foreground">+992 93 505 44 44</p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="text-primary mr-4 mt-1" />
                <div>
                  <h3 className="font-medium text-lg">{t("email")}</h3>
                  <p className="text-muted-foreground">info@tajikistanguide.com</p>
                  <p className="text-muted-foreground">support@tajikistanguide.com</p>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-medium text-lg mb-4">{t("telegram_bot")}</h3>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.open("https://t.me/TJKGuideBot", "_blank")}
                >
                  {t("open_telegram_bot")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-center mt-10">
  <Image
    src="/Logo.png"
    alt="Logo"
    width={900}
    height={100}
  />
</div>



    </div>
  )
}

