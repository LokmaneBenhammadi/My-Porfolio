"use client"
import { useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"

const ContactInfo = ({ infoIcon, infoTitle, infoContent }) => {
    const containerRef = useRef(null)
    useGSAP(() => {
        const container = containerRef.current
        const handleMouseEnter = () => {
            gsap.to(container, {
                duration: 0.3,
                boxShadow: "0 0 20px rgba(139, 92, 246, 0.3), 0 0 40px rgba(139, 92, 246, 0.1)",
                borderColor: "rgba(139, 92, 246, 0.8)",
                scale: 1.02,
                ease: "power2.out",
            })
        }
        const handleMouseLeave = () => {
            gsap.to(container, {
                duration: 0.3,
                boxShadow: "none",
                borderColor: "rgb(139, 92, 246)",
                scale: 1,
                ease: "power2.out",
            })
        }
        container.addEventListener("mouseenter", handleMouseEnter)
        container.addEventListener("mouseleave", handleMouseLeave)
        return () => {
            container.removeEventListener("mouseenter", handleMouseEnter)
            container.removeEventListener("mouseleave", handleMouseLeave)
        }
    }, [])
    return (
        <div
            ref={containerRef}
            className="w-full h-auto p-[10px] rounded-[5px] mb-[16px] flex items-center justify-start gap-[12px] md:w-full md:h-auto md:p-3 lg:p-4 xl:p-5 2xl:px-[18px] 2xl:py-4 bg-blue-night md:rounded-lg lg:rounded-xl xl:rounded-2xl border-[1.5px] border-violet-secondary md:mb-4 lg:mb-5 xl:mb-6 2xl:mb-7 transition-all duration-300"
        >
            <div className="text-violet-primary size-4 xl:size-5 2xl:size-6 contact-icon mr-3">
                {infoIcon}
            </div>
            <div>
                <h3 className="font-fsp-bold font-normal text-[#464B60] text-[8px] lg:text-[10px] xl:text[10px] 2xl:text-xs md:mb-1 lg:mb-2 xl:mb-2 2xl:mb-3">
                    {infoTitle}
                </h3>
                <span className="block text-[10px] lg:text-xs xl:text-xs 2xl:text-sm text-white font-poppins-medium font-normal">
          {infoContent}
        </span>
            </div>
        </div>
    )
}
export default ContactInfo
