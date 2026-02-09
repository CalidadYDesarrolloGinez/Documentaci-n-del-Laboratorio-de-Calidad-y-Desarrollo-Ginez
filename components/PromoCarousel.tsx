"use client"

import * as React from "react"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"
import { getBasePath } from "@/lib/utils"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

const BANNER_IMAGES = [
    {
        src: "/banners/slide1.png",
        alt: "Calidad Ginez - Innovación y Excelencia",
    },
    {
        src: "/banners/slide2.png",
        alt: "Laboratorio de Control y Desarrollo",
    },
    {
        src: "/banners/slide3.png",
        alt: "Documentación y Normatividad",
    },
    {
        src: "/banners/slide4.png",
        alt: "Ginez - Compromiso con la Calidad",
    },
]

export function PromoCarousel() {
    const plugin = React.useRef(
        Autoplay({ delay: 6000, stopOnInteraction: true })
    )

    return (
        <div className="w-full max-w-[1400px] mx-auto px-4 mb-10">
            <Carousel
                plugins={[plugin.current]}
                className="w-full group"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
                opts={{
                    align: "start",
                    loop: true,
                }}
            >
                <CarouselContent className="-ml-2 md:-ml-4">
                    {BANNER_IMAGES.map((image, index) => (
                        <CarouselItem key={index} className="pl-2 md:pl-4">
                            <div className="relative w-full aspect-[24/7] overflow-hidden rounded-2xl border border-border/40 shadow-xl bg-muted">
                                <Image
                                    src={`${getBasePath()}${image.src}`}
                                    alt={image.alt}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                                    priority={index === 0}
                                />
                                {/* Subtle Overlay para legibilidad si las imágenes son muy brillantes */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60" />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Navigation Buttons - Only visible on hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <CarouselPrevious className="left-6 h-10 w-10 bg-white/80 backdrop-blur-sm border-white/20 text-blue-900 hover:bg-white hover:scale-110" />
                    <CarouselNext className="right-6 h-10 w-10 bg-white/80 backdrop-blur-sm border-white/20 text-blue-900 hover:bg-white hover:scale-110" />
                </div>

                {/* Indicators (Optional visually but good for UX) */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                    {BANNER_IMAGES.map((_, i) => (
                        <div
                            key={i}
                            className="h-1.5 w-1.5 rounded-full bg-border transition-all duration-300"
                        />
                    ))}
                </div>
            </Carousel>
        </div>
    )
}
