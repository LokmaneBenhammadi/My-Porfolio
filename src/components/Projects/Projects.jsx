"use client"
import { useState, useRef, useEffect, useCallback } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import ProjectCard from "./ProjectCard"
import WhiteButton from "../buttons/WhiteButton"
import { projectsData } from "../../assets/constants/index.js"
import { useSectionTitleAnimation } from "../../hooks/useSectionTitleAnimation.jsx"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger)

const Projects = () => {
    const titleRef = useSectionTitleAnimation()
    const [currentPage, setCurrentPage] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)
    const carouselInnerRef = useRef(null)
    const projectsSectionRef = useRef(null)
    const whiteButtonRef = useRef(null)
    const [projectsPerPage, setProjectsPerPage] = useState(3)
    const [itemWidthWithGap, setItemWidthWithGap] = useState(0)
    const totalProjects = projectsData.length
    const totalPages = Math.ceil(totalProjects / projectsPerPage)
    const shouldShowButton = totalProjects > projectsPerPage

    const calculateLayoutMetrics = useCallback(() => {
        const currentWidth = window.innerWidth
        let newProjectsPerPage

        if (currentWidth <= 640) {
            newProjectsPerPage = 1
        } else if (currentWidth <= 1279) {
            newProjectsPerPage = 2
        } else {
            newProjectsPerPage = 3
        }

        setProjectsPerPage(newProjectsPerPage)

        // ✅ Calculate based on container width
        const containerWidth = carouselInnerRef.current?.parentElement.offsetWidth || 0
        const newItemWidthWithGap = containerWidth / newProjectsPerPage
        setItemWidthWithGap(newItemWidthWithGap)

        const newTotalPages = Math.ceil(totalProjects / newProjectsPerPage)
        if (currentPage >= newTotalPages) {
            setCurrentPage(0)
            gsap.set(carouselInnerRef.current, { x: 0 })
        } else {
            const targetX = -currentPage * newItemWidthWithGap * newProjectsPerPage
            gsap.set(carouselInnerRef.current, { x: targetX })
        }
    }, [currentPage, totalProjects])


    useEffect(() => {
        calculateLayoutMetrics()
        window.addEventListener("resize", calculateLayoutMetrics)
        return () => window.removeEventListener("resize", calculateLayoutMetrics)
    }, [calculateLayoutMetrics])

    const handleSeeMore = () => {
        if (isAnimating || itemWidthWithGap === 0) return
        setIsAnimating(true)

        let nextPageIndex = currentPage + 1
        let targetX

        if (nextPageIndex >= totalPages) {
            nextPageIndex = 0
            targetX = 0
        } else {
            targetX = -nextPageIndex * itemWidthWithGap * projectsPerPage
        }

        gsap.to(carouselInnerRef.current, {
            x: targetX,
            duration: 0.8,
            ease: "power3.inOut",
            onComplete: () => {
                setCurrentPage(nextPageIndex)
                setIsAnimating(false)
            },
        })
    }

    useGSAP(
        () => {
            if (!projectsSectionRef.current || !carouselInnerRef.current || !whiteButtonRef.current) return

            const projectsContainer = projectsSectionRef.current.querySelector(".projects-carousel-container")

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: projectsSectionRef.current,
                    start: "top center",
                    once: true,
                },
            })

            gsap.set(projectsContainer, { x: "-100vw", opacity: 0 })
            gsap.set(whiteButtonRef.current, { opacity: 0, y: 20 })

            tl.to(projectsContainer, {
                x: 0,
                opacity: 1,
                duration: 1.2,
                ease: "power3.out",
            })

            tl.to(
                whiteButtonRef.current,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "back.out(1.7)",
                },
                "<0.3",
            )
        },
        { scope: projectsSectionRef },
    )

    return (
        <section id="projects" className="stars" ref={projectsSectionRef}>
            <h2 className="section-title" ref={titleRef}>
                What ideas have I brought to life?
            </h2>

            <div className="projects-wrapper">
                <div className="projects-carousel-container">
                    <div
                        className="projects-flex-row"
                        ref={carouselInnerRef}
                        style={{ maxHeight: "514px" }}
                    >
                        {projectsData.map(({ id, projectImg, projectTitle, projectDescription, tags, link }, index) => (
                            <ProjectCard
                                key={id}
                                projectImg={projectImg}
                                projectTitle={projectTitle}
                                projectDescription={projectDescription}
                                tags={tags}
                                link={link}
                                index={index}
                            />
                        ))}
                    </div>
                </div>

                {shouldShowButton && (
                    <div className="see-more-wrapper mt-10 md:mt-20">
                        <WhiteButton
                            onClick={handleSeeMore}
                            disabled={isAnimating}
                            className="btn-white border-[2px] text-[10px] py-2 px-4 md:border-[3px] md:py-3 md:px-6 md:text-2xl rounded-lg"
                            ref={whiteButtonRef}
                        >
                            {currentPage === totalPages - 1 ? "Return to First Projects" : "See More"}
                        </WhiteButton>
                    </div>
                )}
            </div>
        </section>
    )
}

export default Projects
