"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { useTranslation } from "@/components/language-provider"

// Fix Leaflet icon issues
const fixLeafletIcon = () => {
  // Only run on client
  if (typeof window !== "undefined") {
    // @ts-ignore
    delete L.Icon.Default.prototype._getIconUrl

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    })
  }
}

interface TourismMapProps {
  selectedLocation: {
    name: string
    lat: number
    lon: number
  } | null
  onAddToFavorites: (name: string, lat: number, lon: number) => void
}

export default function TourismMap({ selectedLocation, onAddToFavorites }: TourismMapProps) {
  const { t } = useTranslation()
  const mapRef = useRef<L.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const markerRef = useRef<L.Marker | null>(null)

  useEffect(() => {
    fixLeafletIcon()

    if (!mapRef.current && mapContainerRef.current) {
      // Initialize map centered on Tajikistan
      mapRef.current = L.map(mapContainerRef.current).setView([38.861, 71.2761], 7)

      // Add OpenStreetMap tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(mapRef.current)

      // Add some default points of interest in Tajikistan
      const defaultLocations = [
        { name: "Dushanbe", lat: 38.5598, lon: 68.787 },
        { name: "Khujand", lat: 40.2837, lon: 69.6219 },
        { name: "Pamir Mountains", lat: 38.6772, lon: 72.8696 },
        { name: "Iskanderkul Lake", lat: 39.0728, lon: 68.3714 },
      ]

      defaultLocations.forEach((loc) => {
        L.marker([loc.lat, loc.lon])
          .addTo(mapRef.current!)
          .bindPopup(`<b>${loc.name}</b>`)
          .on("click", () => {
            // Create custom popup content with "Add to favorites" button
            const popupContent = document.createElement("div")
            popupContent.innerHTML = `<b>${loc.name}</b>`

            const favButton = document.createElement("button")
            favButton.innerHTML = "❤️ Add to favorites"
            favButton.className =
              "mt-2 px-2 py-1 bg-red-100 text-red-600 rounded text-sm hover:bg-red-200 transition-colors"
            favButton.onclick = (e) => {
              e.stopPropagation()
              onAddToFavorites(loc.name, loc.lat, loc.lon)
            }

            popupContent.appendChild(document.createElement("br"))
            popupContent.appendChild(favButton)

            L.popup().setLatLng([loc.lat, loc.lon]).setContent(popupContent).openOn(mapRef.current!)
          })
      })
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [onAddToFavorites])

  // Update map when selected location changes
  useEffect(() => {
    if (mapRef.current && selectedLocation) {
      // Remove previous marker if exists
      if (markerRef.current) {
        markerRef.current.remove()
      }

      // Add new marker
      markerRef.current = L.marker([selectedLocation.lat, selectedLocation.lon])
        .addTo(mapRef.current)
        .bindPopup(
          `<b>${selectedLocation.name}</b><br>
          <button 
            class="mt-2 px-2 py-1 bg-red-100 text-red-600 rounded text-sm hover:bg-red-200 transition-colors"
            onclick="window.addToFavorites('${selectedLocation.name}', ${selectedLocation.lat}, ${selectedLocation.lon})"
          >
            ❤️ Add to favorites
          </button>`,
        )
        .openPopup()

      // Set view to the selected location
      mapRef.current.setView([selectedLocation.lat, selectedLocation.lon], 13)

      // Add global function to handle favorite button click
      window.addToFavorites = (name: string, lat: number, lon: number) => {
        onAddToFavorites(name, lat, lon)
      }
    }
  }, [selectedLocation, onAddToFavorites])

  return <div ref={mapContainerRef} className="h-[500px] w-full rounded-lg shadow-md" />
}

