"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import { useTranslation } from "@/components/language-provider"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { gsap } from "gsap"
import { Clock, Users, Calendar } from "lucide-react"

const packages = [
  {
    id: 1,
    name: "cultural_heritage_tour",
    image: "https://www.tajagroun.tj/images/posts/2020/qalai-hisor.jpg",
    duration: "7_days",
    groupSize: "max_12_people",
    startDate: "monthly_departures",
    price: "$850",
    description: "cultural_tour_description",
  },
  {
    id: 2,
    name: "pamir_highway_adventure",
    image: "https://media.cnn.com/api/v1/images/stellar/prod/160422152929-01-tajikistan-pamir-highway.jpg?q=w_2000,h_1333,x_0,y_0,c_fill",
    duration: "10_days",
    groupSize: "max_8_people",
    startDate: "june_to_september",
    price: "$1200",
    description: "pamir_highway_description",
  },
  {
    id: 3,
    name: "silk_road_expedition",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyHM-AJMNgifDJi5c8qU9a4BSZiAgZCXMJWA&s",
    duration: "12_days",
    groupSize: "max_10_people",
    startDate: "april_to_october",
    price: "$1450",
    description: "silk_road_description",
  },
]

export default function TravelPackages() {
  const { t } = useTranslation()
  const packagesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (packagesRef.current) {
      const cards = packagesRef.current.querySelectorAll(".package-card")

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
      <h2 className="text-3xl font-bold mb-2 text-center text-primary">{t("travel_packages")}</h2>
      <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">{t("travel_packages_description")}</p>

      <div ref={packagesRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {packages.map((pkg) => (
          <Card key={pkg.id} className="package-card overflow-hidden flex flex-col">
            <div className="relative h-48 overflow-hidden">
              <Image src={pkg.image || "/placeholder.svg"} alt={t(pkg.name)} fill className="object-cover" />
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 rounded-bl-lg font-medium">
                {pkg.price}
              </div>
            </div>
            <CardContent className="p-5 flex-grow">
              <h3 className="text-xl font-semibold mb-4 text-primary">{t(pkg.name)}</h3>

              <div className="space-y-2 mb-4">
                <div className="flex items-center">
                  <Clock size={16} className="text-primary mr-2" />
                  <span className="text-sm text-muted-foreground">{t(pkg.duration)}</span>
                </div>
                <div className="flex items-center">
                  <Users size={16} className="text-primary mr-2" />
                  <span className="text-sm text-muted-foreground">{t(pkg.groupSize)}</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={16} className="text-primary mr-2" />
                  <span className="text-sm text-muted-foreground">{t(pkg.startDate)}</span>
                </div>
              </div>

              <p className="text-muted-foreground line-clamp-3">{t(pkg.description)}</p>
            </CardContent>
            <CardFooter className="px-5 pb-5 pt-0">
              <Button className="w-full">{t("book_now")}</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

