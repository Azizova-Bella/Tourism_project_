"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslation } from "@/components/language-provider"
import { gsap } from "gsap"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"

export default function GalleryPage() {
  const { t } = useTranslation()
  const galleryRef = useRef<HTMLDivElement>(null)

  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [category, setCategory] = useState("all")

  useEffect(() => {
    if (galleryRef.current) {
      const images = galleryRef.current.querySelectorAll(".gallery-item")

      gsap.fromTo(
        images,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: "back.out(1.7)",
        },
      )
    }
  }, [category])

  const galleryImages = [
    {
      id: 1,
      src: "https://peakvisor.com/img/news/Pamir-Mountains-summer.jpg",
      alt: "Pamir Mountains",
      category: "nature",
    },
    {
      id: 2,
      src: "https://static.euronews.com/articles/stories/07/04/88/70/1440x810_cmsv2_0a756090-ca5d-5799-943e-48226670388e-7048870.jpg",
      alt: "Dushanbe City",
      category: "cities",
    },
    {
      id: 3,
      src: "https://adventuresoflilnicki.com/wp-content/uploads/2020/11/Uzbek-Samsa.jpg",
      alt: "Traditional Tajik Food",
      category: "culture",
    },
    {
      id: 4,
      src: "https://voicesoncentralasia.org/wp-content/uploads/2020/02/Khurshed-Sattorov-Tajik-Wedding-Dresses-Models-Nodira-Mazitova-Parvina-Arzykulov.-Manucher-Ruziev-photo-jpg.jpg",
      alt: "Tajik Traditional Clothing",
      category: "culture",
    },
    {
      id: 5,
      src: "https://central-asia.guide/wp-content/uploads/2022/01/Iskander_Kul_beach_water-1024x682.jpg",
      alt: "Iskanderkul Lake",
      category: "nature",
    },
    {
      id: 6,
      src: "https://minzifatravel.com/wp-content/uploads/2022/10/c91c8b517a99349de019f-scaled-1.jpg",
      alt: "Khujand City",
      category: "cities",
    },
    {
      id: 7,
      src: "https://www.min-on.org/wp-content/uploads/2025/03/716128527-tajikistan-22-min.jpg",
      alt: "Tajik Dance Performance",
      category: "culture",
    },
    {
      id: 8,
      src: "https://www.goingthewholehogg.com/wp-content/uploads/Tajikistan-Fann-Mountains-Bibidzhonat-reflection.jpg",
      alt: "Fann Mountains",
      category: "nature",
    },
    {
      id: 9,
      src: "https://minzifatravel.com/wp-content/uploads/2021/03/tajikistan-souvenirs-gal.jpg",
      alt: "Tajik Handicrafts",
      category: "culture",
    },
    {
      id: 10,
      src: "https://www.orexca.com/img/tajikistan/nurek.jpg",
      alt: "Nurek Dam",
      category: "nature",
    },
    {
      id: 11,
      src: "https://mfa.tj/uploads/berlin/2021/11/51299290280-23b93d87ed-o.jpg",
      alt: "Hisor Fortress",
      category: "historical",
    },
    {
      id: 12,
      src: "https://visitcentralasia.org/storage/caz/images/services/vd.png ",
      alt: "Ancient Ruins",
      category: "historical",
    },
  ]

  const categories = [
    { value: "all", label: "all_categories" },
    { value: "nature", label: "nature" },
    { value: "cities", label: "cities" },
    { value: "culture", label: "culture" },
    { value: "historical", label: "historical" },
  ]

  const filteredImages = category === "all" ? galleryImages : galleryImages.filter((img) => img.category === category)

  return (
    <div className="min-h-screen py-12 px-4 md:px-8 lg:px-16 bg-background">
      <div className="container mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-primary text-center">{t("tajikistan_gallery")}</h1>

        <div className="max-w-xs mx-auto mb-12">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder={t("select_category")} />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {t(cat.label)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div ref={galleryRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="gallery-item relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
              onClick={() => setSelectedImage(image.src)}
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-lg font-medium">{image.alt}</span>
              </div>
            </div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">{t("no_images_found")}</p>
          </div>
        )}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-transparent border-none">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-10 bg-black/50 text-white hover:bg-black/70 hover:text-white"
              onClick={() => setSelectedImage(null)}
            >
              <X size={20} />
            </Button>
            {selectedImage && (
              <div className="relative h-[80vh] max-h-[80vh] w-full">
                <Image src={selectedImage || "/placeholder.svg"} alt="Gallery image" fill className="object-contain" />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

