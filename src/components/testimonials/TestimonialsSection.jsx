"use client"
import { useRef, useEffect, useState, useMemo } from "react"
import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import TestimonialCard from "./TestimonialCard.jsx"
import { testimonials } from "../../assets/constants/index.js"
import "./testimonials.css"

gsap.registerPlugin(ScrollTrigger)

const TestimonialsSection = () => {
    const sectionRef = useRef(null)
    const titleRef = useRef(null)
    const sliderRef = useRef(null)
    const [currentDot, setCurrentDot] = useState(0)
    const [isScrolling, setIsScrolling] = useState(false)
    const autoScrollIntervalRef = useRef(null)

    // Use useMemo to prevent recalculation on resize
    const isMobile = useMemo(() => {
        if (typeof window === 'undefined') return false;
        return window.innerWidth <= 767;
    }, []);

    // Create a circular array for infinite scroll
    const circularTestimonials = [...testimonials, ...testimonials, ...testimonials]
    const originalLength = testimonials.length
    const numberOfDots = originalLength

    useGSAP(() => {
        // Entrance animation for section
        gsap.fromTo(
            sectionRef.current,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                },
            },
        )

        // Title animation
        if (titleRef.current) {
            gsap.fromTo(
                titleRef.current,
                {
                    opacity: 0,
                    y: 30,
                    scale: 0.95,
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: "top 85%",
                        end: "bottom 15%",
                        toggleActions: "play none none reverse",
                    },
                },
            )
        }
    }, [])

    const updateOpacity = () => {
        if (!sliderRef.current) return
        const slider = sliderRef.current
        const cards = slider.children
        const viewportWidth = window.innerWidth

        Array.from(cards).forEach((card) => {
            const cardRect = card.getBoundingClientRect()
            const cardCenter = cardRect.left + cardRect.width / 2
            const viewportCenter = viewportWidth / 2
            const distance = Math.abs(cardCenter - viewportCenter)
            const maxDistance = viewportWidth / 2 + cardRect.width / 2
            let opacity = 1 - distance / maxDistance
            opacity = Math.max(0, Math.min(1, opacity))
            card.style.opacity = opacity
            card.style.transform = `scale(${0.8 + opacity * 0.2})`
            card.style.transformOrigin = "center center"
        })

        const cardBaseWidth = isMobile ? 358 : 579
        const cardGap = 32
        const cardWidthWithGap = cardBaseWidth + cardGap

        const adjustedScrollLeft = slider.scrollLeft
        const currentIndex = Math.round(adjustedScrollLeft / cardWidthWithGap)

        // Calculate active dot index (wrap around original length)
        let visibleIndex = (currentIndex - originalLength) % originalLength
        if (visibleIndex < 0) visibleIndex += originalLength
        setCurrentDot(visibleIndex)

        // ✅ Infinite scroll fix: keep inside middle section
        const middleSectionStart = originalLength * cardWidthWithGap
        const middleSectionEnd = (2 * originalLength) * cardWidthWithGap

        if (adjustedScrollLeft < middleSectionStart) {
            slider.scrollLeft = adjustedScrollLeft + originalLength * cardWidthWithGap
        } else if (adjustedScrollLeft >= middleSectionEnd) {
            slider.scrollLeft = adjustedScrollLeft - originalLength * cardWidthWithGap
        }
    }

    const scrollToSection = (dotIndex) => {
        if (!sliderRef.current || isScrolling) return
        setIsScrolling(true)
        const slider = sliderRef.current

        const cardBaseWidth = isMobile ? 358 : 579
        const cardGap = 32
        const cardWidthWithGap = cardBaseWidth + cardGap

        // Target inside the middle section
        const targetIndex = originalLength + dotIndex

        slider.scrollTo({
            left: targetIndex * cardWidthWithGap,
            behavior: "smooth",
        })
        setTimeout(() => setIsScrolling(false), 500)
    }

    const startAutoScroll = () => {
        clearInterval(autoScrollIntervalRef.current)
        autoScrollIntervalRef.current = setInterval(() => {
            setCurrentDot(prevDot => {
                const nextDot = (prevDot + 1) % numberOfDots
                scrollToSection(nextDot)
                return nextDot
            })
        }, 10000) // every 10s
    }

    const resetAutoScroll = () => {
        clearInterval(autoScrollIntervalRef.current)
        startAutoScroll()
    }

    const handleDotClick = (dotIndex) => {
        scrollToSection(dotIndex)
        resetAutoScroll()
    }

    useEffect(() => {
        const slider = sliderRef.current
        if (!slider) return

        const cardBaseWidth = isMobile ? 358 : 579
        const cardGap = 32
        const cardWidthWithGap = cardBaseWidth + cardGap

        // Start in the middle section
        slider.scrollLeft = originalLength * cardWidthWithGap

        const handleScroll = () => {
            requestAnimationFrame(updateOpacity)
        }

        slider.addEventListener("scroll", handleScroll, { passive: true })

        // Initial update
        setTimeout(() => updateOpacity(), 100)

        // Auto-scroll
        startAutoScroll()

        return () => {
            slider.removeEventListener("scroll", handleScroll)
            clearInterval(autoScrollIntervalRef.current)
        }
    }, [isMobile, numberOfDots])

    // Half card width for padding
    const halfCardWidthForPadding = useMemo(() => {
        return isMobile ? 179 : 289.5;
    }, [isMobile]);

    return (
        <section
            ref={sectionRef}
            id="testimonials"
            className="stars py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32 overflow-hidden"
        >
            <h2 className="section-title" ref={titleRef}>
                What<span className="font-serif">'</span>s it like to work with me?
            </h2>
            <div
                ref={sliderRef}
                className="flex gap-6 sm:gap-8 overflow-x-auto scrollbar-hide py-4"
                style={{
                    scrollSnapType: "x mandatory",
                    WebkitOverflowScrolling: "touch",
                    paddingLeft: `calc(50vw - ${halfCardWidthForPadding}px)`,
                    paddingRight: `calc(50vw - ${halfCardWidthForPadding}px)`,
                }}
            >
                {circularTestimonials.map((testimonial, index) => (
                    <div
                        key={`${index}-${testimonial.name}`}
                        className="flex-shrink-0"
                        style={{ scrollSnapAlign: "center" }}
                    >
                        <TestimonialCard {...testimonial} />
                    </div>
                ))}
            </div>

            {/* Dots */}
            <div className="flex justify-center items-center gap-3 mt-12 sm:mt-16 md:mt-20 lg:mt-24 xl:mt-32">
                {[...Array(numberOfDots)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handleDotClick(index)}
                        className={`
                            w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6
                            rounded-full transition-all duration-300 ${
                            currentDot === index
                                ? "bg-violet-500 scale-125"
                                : "bg-white hover:bg-white/70 cursor-pointer"
                        }`}
                        aria-label={`Go to section ${index + 1} of testimonials`}
                    />
                ))}
            </div>
        </section>
    )
}

export default TestimonialsSection
