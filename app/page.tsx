"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

export default function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [touchPosition, setTouchPosition] = useState({ x: 50, y: 50 })
  const [isMobile, setIsMobile] = useState(false)
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [viewportHeight, setViewportHeight] = useState(0)

  useEffect(() => {
    // Check if device is mobile and set viewport height
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth <= 768 || "ontouchstart" in window
      setIsMobile(isMobileDevice)
      // Set viewport height for mobile to handle browser UI
      setViewportHeight(window.innerHeight)
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
    <div
      ref={containerRef}
      className={`relative ${isMobile ? "h-screen overflow-hidden" : "min-h-screen"}`}
      style={isMobile ? { height: `${viewportHeight}px` } : {}}
    >
      {/* Base gradient background */}
      <div className="absolute inset-0 z-0">
        {isMobile ? (
          <Image
            src="/images/mobile-new-background.png"
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

      {/* Interactive light orbs - desktop only */}
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

      {/* Mobile SVG elements - optimized positioning to avoid overlapping with background text */}
      {isMobile && (
        <div className="absolute inset-0 z-30 pointer-events-none">
          {/* Top Left - Toudai (University of Tokyo Production Exhibition) */}
          <div className="absolute top-[5%] left-[5%] w-[40%] max-w-[150px]">
            <Image
              src="/images/toudai.svg"
              alt="東京大学制作展"
              width={207}
              height={34}
              className="w-full h-auto"
              priority
            />
          </div>

          {/* Top Right - iii exhibition Beginning 2025 */}
          <div className="absolute top-[5%] right-[5%] w-[40%] max-w-[150px]">
            <Image
              src="/images/iiiexhibition.svg"
              alt="iii exhibition Beginning 2025"
              width={213}
              height={62}
              className="w-full h-auto"
              priority
            />
          </div>

          {/* Bottom Left - Dates (NEW) */}
          <div className="absolute bottom-[5%] left-[5%] w-[40%] max-w-[150px]">
            <div className="relative">
              {/* Subtle glow effect */}
              <div
                className="absolute inset-0 blur-md opacity-20 bg-white rounded-full transform scale-110"
                aria-hidden="true"
              ></div>
              <Image
                src="/images/dates-ok-new.svg"
                alt="Exhibition date information"
                width={191}
                height={324}
                className="w-full h-auto relative z-10"
                priority
              />
            </div>
          </div>

          {/* Bottom Right - Venue */}
          <div className="absolute bottom-[5%] right-[5%] w-[40%] max-w-[150px]">
            <div className="relative">
              {/* Subtle glow effect */}
              <div
                className="absolute inset-0 blur-md opacity-20 bg-white rounded-full transform scale-110"
                aria-hidden="true"
              ></div>
              <Image
                src="/images/venue-ok.svg"
                alt="Exhibition venue information"
                width={140}
                height={200}
                className="w-full h-auto relative z-10"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
