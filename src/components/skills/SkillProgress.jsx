"use client"
import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(useGSAP)

const SkillProgress = ({ skillName, skillPercentage, index }) => {
    const containerRef = useRef(null)
    const percentageRef = useRef(null)
    const barRef = useRef(null)
    const trackRef = useRef(null)
    const timelineRef = useRef(null)

    const animateBar = () => {
        if (!trackRef.current || !barRef.current) return

        // Kill any old animation
        if (timelineRef.current) timelineRef.current.kill()

        const percentage = Number.parseFloat(skillPercentage)
        const count = { val: 0 }

        // Use the actual width of the bar container (track)
        const trackWidth = trackRef.current.offsetWidth || 300
        const targetWidth = `${(trackWidth * percentage) / 100}px`

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
            },
        })

        // Fade + slide in
        tl.fromTo(containerRef.current, { y: 30, opacity: 0 }, {
            y: 0, opacity: 1, duration: 1, delay: index * 0.1, ease: "power2.out",
        })

        // Progress bar grow
        tl.fromTo(barRef.current, { width: "0px" }, {
            width: targetWidth, duration: 1.5, ease: "power2.out",
        }, "-=0.4")

        // Counter animation
        tl.to(count, {
            val: percentage,
            duration: 1.5,
            ease: "power1.out",
            onUpdate: () => {
                if (percentageRef.current) {
                    percentageRef.current.textContent = `${Math.floor(count.val)} %`
                }
            },
        }, "-=1.2")

        timelineRef.current = tl
    }

    // Run GSAP on mount
    useGSAP(() => {
        animateBar()
    }, [skillPercentage, index])

    // Re-run animation on resize with debounce
    useEffect(() => {
        let resizeId
        const handleResize = () => {
            cancelAnimationFrame(resizeId)
            resizeId = requestAnimationFrame(() => {
                if (barRef.current) {
                    gsap.set(barRef.current, { width: 0 }) // reset instantly
                    animateBar()
                }
            })
        }
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <div
            ref={containerRef}
            className="
                    w-[80%] sm:w-[80%] md:w-[90%] xl:w-[90%] 2xl:w-[480px] max-w-[480px]
                    h-[clamp(80px,12vw,137px)]
                    py-3 px-4 md:py-4 md:px-6
                    rounded-2xl bg-blue-night
                  "
        >

        <h2 className="font-fsp-stencil text-[clamp(10px,1.2vw,20px)] mb-2 md:mb-4">
                {skillName}
            </h2>
            <div>
      <span
          ref={percentageRef}
          className="block text-[clamp(9px,1vw,16px)] font-sans font-black"
      >
        0 %
      </span>
                <div
                    ref={trackRef}
                    className="
          w-[92%] h-[clamp(8px,1.5vw,22px)]
          bg-[#5F439D4D] rounded-md mt-1 md:mt-[6px]
          overflow-hidden
        "
                >
                    <div
                        ref={barRef}
                        className="h-full rounded-lg bg-[#5F439D] shadow-[0_1px_28px_rgba(129,91,216,0.2),_0_2px_28px_rgba(129,91,216,0.25)]"
                    />
                </div>
            </div>
        </div>
    )

}

export default SkillProgress
