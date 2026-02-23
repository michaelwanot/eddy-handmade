'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export type HeroSlide = {
  image: string
  imageAlt: string
  title: React.ReactNode
  subtitle: React.ReactNode
}

const AUTOPLAY_MS = 6000

export default function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0)
  const current = slides[index] ?? slides[0]

  const goTo = useCallback(
    (i: number) => {
      setIndex((prev) => {
        const next = i < 0 ? slides.length - 1 : i >= slides.length ? 0 : i
        return next
      })
    },
    [slides.length]
  )

  useEffect(() => {
    if (slides.length <= 1) return
    const id = setInterval(() => goTo(index + 1), AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [index, goTo, slides.length])

  if (!slides.length) return null

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative w-full min-h-[70vh] md:min-h-[85vh]">
        {slides.map((slide, i) => (
          <div
            key={slide.image + i}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === index ? 1 : 0 }}
            aria-hidden={i !== index}
          >
            <Image
              src={slide.image}
              alt={slide.imageAlt}
              fill
              priority={i === 0}
              className="object-cover"
              sizes="100vw"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-linear-to-r from-black/50 via-black/20 to-transparent" />
        <div className="absolute inset-0 z-10 flex items-center">
          <div className="max-w-6xl px-6 py-12 md:px-12">
            <div className="transition-opacity duration-500">
              <h1 className="font-serif text-4xl leading-tight tracking-tight text-white drop-shadow-md md:text-6xl lg:text-7xl xl:text-8xl">
                {current.title}
              </h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-white/90 drop-shadow-sm md:text-lg lg:text-xl">
                {current.subtitle}
              </p>
              <div className="mt-8">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center rounded-full bg-white/95 px-7 py-3 text-sm font-medium text-ink shadow-soft transition hover:bg-white md:px-8 md:py-3.5 md:text-base"
                >
                  Scopri la collezione
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-2.5 text-white backdrop-blur-sm transition hover:bg-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white md:left-6"
            aria-label="Slide precedente"
          >
            <i className="pi pi-chevron-left text-lg md:text-xl" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-2.5 text-white backdrop-blur-sm transition hover:bg-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white md:right-6"
            aria-label="Slide successiva"
          >
            <i className="pi pi-chevron-right text-lg md:text-xl" aria-hidden />
          </button>
          <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className="h-2 w-2 rounded-full transition md:h-2.5 md:w-2.5"
                style={{
                  backgroundColor: i === index ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.4)',
                }}
                aria-label={`Vai allo slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}
