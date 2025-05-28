"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

export default function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [touchPosition, setTouchPosition] = useState({ x: 50, y: 50 })
  const [isMobile, setIsMobile] = useState(false)
  const [isMouseDown, setIsMouseDown] = useState(false)

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || "ontouchstart" in window)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || isMobile) return

      const { clientX, clientY } = e
      const { width, height } = containerRef.current.getBoundingClientRect()

      const x = (clientX / width) * 100
      const y = (clientY / height) * 100

      setTouchPosition({ x, y })
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!containerRef.current) return

      const touch = e.touches[0]
      const { clientX, clientY } = touch
      const { width, height } = containerRef.current.getBoundingClientRect()

      const x = (clientX / width) * 100
      const y = (clientY / height) * 100

      setTouchPosition({ x, y })
    }

    const handleTouchEnd = () => {
      // Slowly return to center when touch ends
      setTimeout(() => {
        setTouchPosition({ x: 50, y: 50 })
      }, 100)
    }

    const handleMouseDown = () => {
      setIsMouseDown(true)
    }

    const handleMouseUp = () => {
      setIsMouseDown(false)
    }

    if (isMobile) {
      window.addEventListener("touchmove", handleTouchMove)
      window.addEventListener("touchend", handleTouchEnd)
    } else {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mousedown", handleMouseDown)
      window.addEventListener("mouseup", handleMouseUp)
      // Handle case when mouse is released outside the window
      window.addEventListener("mouseleave", handleMouseUp)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleTouchEnd)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("mouseleave", handleMouseUp)
    }
  }, [isMobile])

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden">
      {/* Base gradient background */}
      <div className="absolute inset-0 z-0">
        {isMobile ? (
          <Image
            src="/images/mobile-background.png"
            alt="iii Exhibition | Beginning 2025"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        ) : (
          <Image
            src="/images/japanese-gradient-background.png"
            alt="iii Exhibition | Beginning 2025"
            fill
            priority
            className="object-cover transition-transform duration-500 ease-out"
            sizes="100vw"
            style={{
              transform: `scale(1.05) translate(${(touchPosition.x - 50) * -0.02}%, ${(touchPosition.y - 50) * -0.02}%)`,
            }}
          />
        )}
      </div>

      {/* Darkening overlay when mouse is pressed */}
      {!isMobile && (
        <div
          className="absolute inset-0 z-5 bg-black pointer-events-none transition-opacity duration-300"
          style={{
            opacity: isMouseDown ? 0.3 : 0,
          }}
        />
      )}

      {/* Animated overlay that follows touch/cursor */}
      <div
        className="absolute inset-0 z-10 bg-gradient-radial animate-pulse-slow opacity-30 pointer-events-none transition-all duration-500"
        style={{
          background: `radial-gradient(circle at ${touchPosition.x}% ${touchPosition.y}%, rgba(255,255,255,0.25) 0%, rgba(0,0,0,0) ${isMobile ? "40%" : "50%"})`,
        }}
      />

      {/* Interactive light orbs - simplified for mobile */}
      {!isMobile && (
        <>
          <div
            className="absolute z-20 w-40 h-40 rounded-full blur-3xl animate-float-slow opacity-40 pointer-events-none transition-all duration-700"
            style={{
              background: "radial-gradient(circle, rgba(159,122,234,0.7) 0%, rgba(159,122,234,0) 70%)",
              left: `calc(${touchPosition.x}% - 5rem)`,
              top: `calc(${touchPosition.y}% - 5rem)`,
            }}
          />

          <div
            className="absolute z-20 w-24 h-24 rounded-full blur-2xl animate-float-slow-reverse opacity-40 pointer-events-none transition-all duration-700"
            style={{
              background: "radial-gradient(circle, rgba(236,72,153,0.7) 0%, rgba(236,72,153,0) 70%)",
              left: `calc(${touchPosition.x}% - 3rem)`,
              top: `calc(${touchPosition.y}% - 3rem)`,
              animationDelay: "0.5s",
            }}
          />
        </>
      )}

      {/* Mobile-optimized single orb */}
      {isMobile && (
        <div
          className="absolute z-20 w-32 h-32 rounded-full blur-2xl animate-pulse opacity-50 pointer-events-none transition-all duration-700"
          style={{
            background:
              "radial-gradient(circle, rgba(159,122,234,0.8) 0%, rgba(236,72,153,0.4) 50%, rgba(159,122,234,0) 70%)",
            left: `calc(${touchPosition.x}% - 4rem)`,
            top: `calc(${touchPosition.y}% - 4rem)`,
          }}
        />
      )}

      {/* Fixed exhibition information overlay - desktop only */}
      {!isMobile && (
        <div className="absolute inset-0 z-30 pointer-events-none">
          <Image
            src="/images/info.png"
            alt="iii Exhibition | Beginning 2025 - 7.4 (Fri) ~ 7.7 (Mon) - 11:00 ~ 19:00"
            fill
            priority
            className="object-contain"
            sizes="100vw"
          />
        </div>
      )}

      {/* Mobile SVG elements with increased margins */}
      {isMobile && (
        <>
          {/* Top Left - Toudai */}
          <div className="absolute top-8 left-8 z-30 pointer-events-none w-[35%] max-w-[140px]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 217.35 30" className="w-full h-auto">
              <text
                transform="translate(0 24.95)"
                fill="#fff"
                fontFamily="ToppanBunkyuMidashiMinchoStdN-ExtraBold-83pv-RKSJ-H, 'Toppan Bunkyu Midashi Mincho'"
                fontWeight="700"
                fontSize="28.35px"
                letterSpacing=".05em"
              >
                <tspan x="0" y="0">
                  東京大学制作展
                </tspan>
              </text>
            </svg>
          </div>

          {/* Top Right - iii exhibition with Beginning 2025 */}
          <div className="absolute top-8 right-8 z-30 pointer-events-none w-[35%] max-w-[140px]">
            <Image
              src="/images/iii.svg"
              alt="iii exhibition Beginning 2025"
              width={140}
              height={60}
              className="w-full h-auto"
              priority
            />
          </div>

          {/* Bottom Left - Venue */}
          <div className="absolute bottom-8 left-8 z-30 pointer-events-none w-[35%] max-w-[140px]">
            <Image
              src="/images/venue-ok.svg"
              alt="Exhibition venue information"
              width={140}
              height={200}
              className="w-full h-auto"
              priority
            />
          </div>

          {/* Bottom Right - Dates */}
          <div className="absolute bottom-8 right-8 z-30 pointer-events-none w-[35%] max-w-[140px]">
            <Image
              src="/images/dates-ok.svg"
              alt="Exhibition date information"
              width={140}
              height={200}
              className="w-full h-auto"
              priority
            />
          </div>
        </>
      )}
    </div>
  )
}
