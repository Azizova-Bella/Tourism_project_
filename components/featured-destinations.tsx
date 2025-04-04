"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import { useTranslation } from "@/components/language-provider"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { gsap } from "gsap"
import { MapPin } from "lucide-react"

const destinations = [
  {
    id: 1,
    name: "pamir_mountains",
    location: "gbao_region",
    image: 'https://trektajikistan.com/wp-content/uploads/2021/08/yashilkul-pamir-3.jpg',
    description: "pamir_mountains_description",
  },
  {
    id: 2,
    name: "iskanderkul_lake",
    location: "sughd_region",
  	image: 'https://exploretraveloasis.com/wp-content/uploads/2023/03/Iskanderkul-Lake-4-.jpeg',
    description: "iskanderkul_description",
  },
  {
    id: 3,
    name: "hisor_fortress",
    location: "hisor_district",
    image: "https://daytrip.imgix.net/Hisor-Fortress.jpg?auto=compress%2Cenhance%2Cformat&w=2048&h=560&fit=crop&q=30",
    description: "hisor_description",
  },
  {
    id: 4,
    name: "wakhan_corridor",
    location: "gbao_region",
    image: 'https://adventure.com/wp-content/uploads/2018/05/Hero-Afghanistan-five-years-on-The-Whakan-Photo-credit-Tracey-Croke-1920x1080.jpg',
    description: "wakhan_description",
  },
]

export default function FeaturedDestinations() {
  const { t } = useTranslation()
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll(".destination-card")

      gsap.fromTo(
        cards,
        {
          y: 50,
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
      <h2 className="text-3xl font-bold mb-2 text-center text-primary">{t("featured_destinations")}</h2>
      <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
        {t("featured_destinations_description")}
      </p>

      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {destinations.map((destination) => (
          <Card key={destination.id} className="destination-card overflow-hidden group">
            <div className="relative h-48 overflow-hidden">
              <Image
                src={destination.image || "/placeholder.svg"}
                alt={t(destination.name)}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <CardContent className="p-5">
              <div className="flex items-center mb-2">
                <MapPin size={16} className="text-primary mr-2" />
                <span className="text-sm text-muted-foreground">{t(destination.location)}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-primary">{t(destination.name)}</h3>
              <p className="text-muted-foreground mb-4 line-clamp-3">{t(destination.description)}</p>
              <Button variant="outline" className="w-full">
                {t("learn_more")}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

