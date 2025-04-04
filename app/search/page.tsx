"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { useTranslation } from "@/components/language-provider"
import { gsap } from "gsap"
import dynamic from "next/dynamic"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Heart, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Dynamically import the Map component to avoid SSR issues with Leaflet
const TourismMap = dynamic(() => import("@/components/tourism-map"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] w-full flex items-center justify-center bg-muted rounded-lg">
      <div className="animate-pulse">Loading map...</div>
    </div>
  ),
})

export default function SearchPage() {
  const { t } = useTranslation()
  const searchBarRef = useRef<HTMLDivElement>(null)
  const historyRef = useRef<HTMLDivElement>(null)
  const favoritesRef = useRef<HTMLDivElement>(null)

  const [searchTerm, setSearchTerm] = useState("")
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [favorites, setFavorites] = useState<{ name: string; lat: number; lon: number }[]>([])
  const [selectedLocation, setSelectedLocation] = useState<{ name: string; lat: number; lon: number } | null>(null)

  const { toast } = useToast()

  useEffect(() => {
    // Load saved data from localStorage
    const savedHistory = localStorage.getItem("searchHistory")
    const savedFavorites = localStorage.getItem("favorites")

    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory))
    }

    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }

    // Animations
    if (searchBarRef.current) {
      gsap.fromTo(searchBarRef.current, { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" })
    }

    if (historyRef.current) {
      gsap.fromTo(
        historyRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, delay: 0.2, ease: "power2.out" },
      )
    }

    if (favoritesRef.current) {
      gsap.fromTo(
        favoritesRef.current,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.6, delay: 0.4, ease: "power2.out" },
      )
    }
  }, [])

  const updateSearchHistory = (name: string) => {
    const updated = [name, ...searchHistory.filter((item) => item !== name)].slice(0, 5)
    setSearchHistory(updated)
    localStorage.setItem("searchHistory", JSON.stringify(updated))
  }

  const addToFavorites = (name: string, lat: number, lon: number) => {
    const exists = favorites.some((f) => f.name === name)
    if (exists) return

    const updated = [...favorites, { name, lat, lon }]
    setFavorites(updated)
    localStorage.setItem("favorites", JSON.stringify(updated))

    toast({
      title: t("added_to_favorites"),
      description: name,
    })
  }

  const removeFromFavorites = (name: string) => {
    const updated = favorites.filter((f) => f.name !== name)
    setFavorites(updated)
    localStorage.setItem("favorites", JSON.stringify(updated))

    toast({
      title: t("removed_from_favorites"),
      description: name,
    })
  }

  const searchAddress = async () => {
    if (!searchTerm.trim()) {
      toast({
        title: t("error"),
        description: t("enter_address"),
        variant: "destructive",
      })
      return
    }

    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchTerm)}`
      const response = await fetch(url)
      const data = await response.json()

      if (!data.length) {
        toast({
          title: t("error"),
          description: t("address_not_found"),
          variant: "destructive",
        })
        return
      }

      const { lat, lon, display_name } = data[0]
      setSelectedLocation({
        name: display_name,
        lat: Number.parseFloat(lat),
        lon: Number.parseFloat(lon),
      })

      updateSearchHistory(display_name)
    } catch (error) {
      console.error("Search error:", error)
      toast({
        title: t("error"),
        description: t("search_error"),
        variant: "destructive",
      })
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      searchAddress()
    }
  }

  return (
    <div className="min-h-screen py-12 px-4 md:px-8 lg:px-16 bg-background">
      <div className="container mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-primary text-center">{t("address_search")}</h1>

        <div ref={searchBarRef} className="max-w-3xl mx-auto mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t("enter_address_placeholder")}
                className="pl-10"
                onKeyDown={handleKeyDown}
              />
            </div>
            <Button onClick={searchAddress}>
              <Search className="mr-2" size={18} />
              {t("search")}
            </Button>
          </div>
        </div>

        <div className="mb-8">
          <TourismMap selectedLocation={selectedLocation} onAddToFavorites={addToFavorites} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card ref={historyRef}>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-primary">{t("search_history")}</h2>

              {searchHistory.length === 0 ? (
                <p className="text-muted-foreground">{t("no_history")}</p>
              ) : (
                <ul className="space-y-2">
                  {searchHistory.map((item, index) => (
                    <li key={index}>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left"
                        onClick={() => {
                          setSearchTerm(item)
                          searchAddress()
                        }}
                      >
                        <MapPin className="mr-2 text-primary" size={16} />
                        <span className="truncate">{item}</span>
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          <Card ref={favoritesRef}>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-primary">{t("favorites")}</h2>

              {favorites.length === 0 ? (
                <p className="text-muted-foreground">{t("no_favorites")}</p>
              ) : (
                <ul className="space-y-2">
                  {favorites.map((fav, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        className="flex-1 justify-start text-left"
                        onClick={() => {
                          setSelectedLocation(fav)
                        }}
                      >
                        <Heart className="mr-2 text-red-500" size={16} />
                        <span className="truncate">{fav.name}</span>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => removeFromFavorites(fav.name)}>
                        <Trash2 className="text-red-500" size={16} />
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

