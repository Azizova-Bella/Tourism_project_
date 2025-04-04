"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import { useTranslation } from "@/components/language-provider"
import { Card, CardContent } from "@/components/ui/card"
import { gsap } from "gsap"
import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    country: "United States",
    avatar: "https://physicaleducationandwellness.mit.edu/wp-content/uploads/Untitled-1.png",
    rating: 5,
    text: "testimonial_1",
  },
  {
    id: 2,
    name: "Michael Chen",
    country: "Canada",
    avatar: "https://static.wixstatic.com/media/45281b_c4363a6b9fad4d348378989dca653f90~mv2.jpg/v1/fill/w_640,h_554,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/45281b_c4363a6b9fad4d348378989dca653f90~mv2.jpg",
    rating: 5,
    text: "testimonial_2",
  },
  {
    id: 3,
    name: "Elena Petrova",
    country: "Russia",
    avatar: "https://media.licdn.com/dms/image/v2/C4D03AQGcG4cuibaz4Q/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1580640021021?e=2147483647&v=beta&t=D3qWXQPZ2eGXTUzwYaYNgzk3zWcJcohjDg59mYKnbmQ",
    rating: 4,
    text: "testimonial_3",
  },
  {
    id: 4,
    name: "Ahmed Al-Farsi",
    country: "UAE",
    avatar: "https://i1.rgstatic.net/ii/profile.image/463373776232449-1487488325650_Q512/Ahmed-Al-Farsi.jpg",
    rating: 5,
    text: "testimonial_4",
  },
]

export default function Testimonials() {
  const { t } = useTranslation()
  const testimonialsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (testimonialsRef.current) {
      const cards = testimonialsRef.current.querySelectorAll(".testimonial-card")

      gsap.fromTo(
        cards,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        },
      )
    }
  }, [])

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold mb-2 text-center text-primary">{t("what_travelers_say")}</h2>
      <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">{t("testimonials_description")}</p>

      <div ref={testimonialsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="testimonial-card">
            <CardContent className="p-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
                  />
                ))}
              </div>

              <p className="text-muted-foreground mb-6 italic">"{t(testimonial.text)}"</p>

              <div className="flex items-center">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-primary">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.country}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

