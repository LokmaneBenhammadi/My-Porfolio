"use client"
import { useState, useEffect } from "react"
import { skillsInfos, otherSkills } from "../../assets/constants/index.js"
import SkillPlanet from "./SkillPlanet.jsx"
import SkillProgress from "./SkillProgress.jsx"
import { useSectionTitleAnimation } from "../../hooks/useSectionTitleAnimation.jsx"
import "./skill_planet.css"

const SkillsSection = () => {
    const titleRef = useSectionTitleAnimation()

    // Pagination state
    const [currentPage, setCurrentPage] = useState(0)
    const [buttonText, setButtonText] = useState("See more")
    const [responsiveSkillsPerPage, setResponsiveSkillsPerPage] = useState(6)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        let resizeId
        const handleResize = () => {
            cancelAnimationFrame(resizeId)
            resizeId = requestAnimationFrame(() => {
                const width = window.innerWidth
                if (width >= 1536) {
                    setResponsiveSkillsPerPage(6) // 3 cols × 2 rows
                    setIsMobile(false)
                } else if (width >= 768) {
                    setResponsiveSkillsPerPage(4) // 2 cols × 2 rows
                    setIsMobile(false)
                } else {
                    setResponsiveSkillsPerPage(2) // 1 col × 2 rows
                    setIsMobile(true)
                }
            })
        }

        handleResize() // initial
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    const totalPages = Math.ceil(otherSkills.length / responsiveSkillsPerPage)

    const startIdx = currentPage * responsiveSkillsPerPage
    const endIdx = startIdx + responsiveSkillsPerPage
    const currentSkills = otherSkills.slice(startIdx, endIdx)

    useEffect(() => {
        setButtonText(currentPage === totalPages - 1 ? "Return" : "See more")
    }, [currentPage, totalPages])

    const handlePaginationClick = () => {
        setCurrentPage(currentPage === totalPages - 1 ? 0 : currentPage + 1)
    }

    return (
        <section id="skills" className="stars">
            {/* Main Skills Planets Section */}
            <h1 className="section-title" ref={titleRef}>
                What skills do I bring to the table?
            </h1>

            <div
                className={`planets-container ${
                    isMobile
                        ? "grid grid-cols-2 gap-x-4 gap-y-8 justify-items-center items-center"
                        : ""
                }`}
                style={{
                    width: "100%",
                    maxWidth: "1600px",
                    height: "auto",
                    minHeight: "600px",
                    position: "relative",
                    margin: "100px auto",
                }}
            >
                {skillsInfos.map((skill, index) => (
                    <SkillPlanet
                        key={`skill-${index}`}
                        sizes={skill.sizes}
                        infos={skill.infos}
                        dimensions={skill.dimensions}
                        index={index}
                        isParentMobile={isMobile}
                    />
                ))}
            </div>

            {/* Other Skills */}
            <div className="other-skills-container w-full max-w-full mx-auto mt-8 md:mt-20 px-4">
                <h1 className="other-skills-title">Other Skills</h1>
                <div
                    className="
                        other-skills mx-auto
                        grid gap-6
                        grid-cols-1
                        md:grid-cols-2
                        2xl:grid-cols-3
                        w-full max-w-[1600px]
                        place-items-center
                    "
                >
                    {currentSkills.map((skill, index) => (
                        <div
                            key={`otherSkill-${startIdx + index}`}
                            className="w-full sm:w-4/5 2xl:w-auto flex justify-center"
                        >
                            <SkillProgress
                                skillName={skill.skillName}
                                skillPercentage={skill.skillPercentage}
                                index={startIdx + index}
                            />
                        </div>
                    ))}
                </div>

                {/* Pagination Button */}
                <div className="w-full flex-center mt-8 md:mt-20">
                    <button
                        onClick={handlePaginationClick}
                        className="btn-white border-2 text-xs px-4 py-2 rounded-lg md:text-xl md:px-6 md:py-3"
                    >
                        {buttonText}
                    </button>
                </div>
            </div>
        </section>
    )
}

export default SkillsSection
