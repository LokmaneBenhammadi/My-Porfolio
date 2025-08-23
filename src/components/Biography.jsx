"use client"
import { useRef, useState } from "react"
import { useMediaQuery } from "react-responsive"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import PurpleButton from "./buttons/PurpleButton"
import astronautMobile from "/images/about/Astro_Mobile.png"
import astronautDesktop from "/images/about/Astro.webp"
import { useSectionTitleAnimation } from "../hooks/useSectionTitleAnimation.jsx"

// Register ScrollTrigger plugin once
gsap.registerPlugin(ScrollTrigger)

const Biography = () => {
    const astroRef = useRef(null)
    const titleRef = useSectionTitleAnimation()
    const sectionRef = useRef(null)
    const resumeRef = useRef(null)
    const purpleButtonRef = useRef(null) 
    const [imageLoaded, setImageLoaded] = useState(false)
    const isMobile = useMediaQuery({ maxWidth: 767 })

    // GSAP astronaut floating animation
    useGSAP(
        () => {
            if (!astroRef.current || !sectionRef.current || !imageLoaded) return

            gsap.set(astroRef.current, { opacity: 1, willChange: "transform" })

            if (!isMobile) {
                const container = astroRef.current.parentElement
                const containerBounds = container.getBoundingClientRect()
                const imageBounds = astroRef.current.getBoundingClientRect()
                const maxX = containerBounds.width - imageBounds.width - 40
                const maxY = containerBounds.height - imageBounds.height - 40
                const initialX = Math.min(maxX * 0.7, maxX)
                const initialY = Math.max(20, maxY * 0.3)

                gsap.set(astroRef.current, {
                    x: initialX,
                    y: initialY,
                    rotation: 0,
                    transformOrigin: "center center",
                    force3D: true,
                })

                const floatAnimation = () => {
                    const currentX = gsap.getProperty(astroRef.current, "x")
                    const currentY = gsap.getProperty(astroRef.current, "y")
                    const safeMargin = 60
                    const minX = safeMargin
                    const maxSafeX = containerBounds.width - imageBounds.width - safeMargin
                    const minY = safeMargin
                    const maxSafeY = containerBounds.height - imageBounds.height - safeMargin

                    let moveX = (Math.random() - 0.5) * 50
                    let moveY = (Math.random() - 0.5) * 35

                    const newX = currentX + moveX
                    const newY = currentY + moveY

                    if (newX < minX || newX > maxSafeX) {
                        moveX = -moveX * 0.7
                    }
                    if (newY < minY || newY > maxSafeY) {
                        moveY = -moveY * 0.7
                    }

                    const rotationAmount = (Math.random() - 0.5) * 10
                    const duration = 4 + Math.random()

                    gsap.to(astroRef.current, {
                        x: `+=${moveX}`,
                        y: `+=${moveY}`,
                        rotation: `+=${rotationAmount}`,
                        duration: duration,
                        ease: "power2.inOut",
                        force3D: true,
                        onComplete: floatAnimation,
                    })
                }
                gsap.delayedCall(0.5, floatAnimation)
            }
        },
        { dependencies: [imageLoaded, isMobile], scope: sectionRef },
    )

    // GSAP for Biography entry animation
    useGSAP(
        () => {
            if (!sectionRef.current || !resumeRef.current || !purpleButtonRef.current || !astroRef.current) return

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top center",
                    once: true,
                },
            })

            gsap.set(resumeRef.current.children, { opacity: 0, y: 20 })
            gsap.set(purpleButtonRef.current, { opacity: 0, y: 20 })

            tl.to(resumeRef.current.children, {
                opacity: 1,
                y: 0,
                stagger: 0.2,
                duration: 0.8,
                ease: "power2.out",
            })

            tl.to(
                purpleButtonRef.current,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    delay: 0.3,
                },
                "<0.5",
            )

            gsap.to(astroRef.current, {
                scale: 0.7,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom center",
                    scrub: true,
                },
            })
        },
        { scope: sectionRef, dependencies: [imageLoaded] },
    )

    const handleImageLoad = () => {
        setImageLoaded(true)
    }

    // ✅ Static resume download (resume.pdf in /public folder)
    const downloadResume = () => {
        window.open("/resume.pdf", "_blank")
    }

    return (
        <section id="about" className="stars" ref={sectionRef}>
            <div className="w-full flex justify-center -mb-16 md:-mb-80">
                <h2 ref={titleRef} className="section-title inline-block whitespace-normal overflow-visible">
                    Who<span className="font-serif">'</span>s behind the designs and prototypes?
                </h2>
            </div>
            <div className="flex items-center md:flex-row flex-col-reverse md:gap-[152px] gap-11">
                <div className="text-center md:text-left">
                    <p
                        ref={resumeRef}
                        className="w-[358px] md:w-[967px] font-fsp-bold text-[10px] md:text-2xl font-normal leading-[1.8] mb-4 md:mb-8"
                    >
                        <span className="block">
                            I<span className="font-serif">'</span>m a passionate UI UX designer with a sharp eye for detail and a love
                            for intuitive, user centred design.
                        </span>
                        <span className="block">
                            Currently studying at the Higher School of Computer Science in Sidi Bel Abbes, I blend creativity with
                            clear thinking to turn ideas into clean, functional products.
                        </span>
                        <span className="block">
                            I<span className="font-serif">'</span>ve worked on projects like{" "}
                            <span className="text-violet-primary">Dirasati</span> and{" "}
                            <span className="text-violet-primary">Dorouscom</span>, collaborating with developers and building a solid
                            understanding of real world implementation. My work spans research, wireframing, prototyping, and visual
                            design all focused on creating experiences that truly work for users.
                        </span>
                    </p>
                    <PurpleButton
                        onClick={downloadResume}
                        className="btn-purple text-xs px-[10px] py-[6px] rounded-md md:text-xl md:py-4 md:px-7 md:rounded-2xl"
                        ref={purpleButtonRef}
                    >
                        Download resume
                    </PurpleButton>
                </div>
                <div className="relative w-fit">
                    <img
                        ref={astroRef}
                        src={isMobile ? astronautMobile : astronautDesktop}
                        alt="Floating astronaut"
                        onLoad={handleImageLoad}
                        className="w-[168px] md:w-[660px] h-auto object-contain"
                        style={{ opacity: 0 }}
                    />
                </div>
            </div>
        </section>
    )
}

export default Biography
