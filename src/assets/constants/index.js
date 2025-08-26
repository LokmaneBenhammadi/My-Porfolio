import dirasatiCard from "/images/projects/dirasati.webp"
import portfolioCard from "/images/projects/portfolio.webp"
import museumCard from "/images/projects/museum.webp"
import kitabyCard from "/images/projects/kitaby.webp"
import AdobeXD from "/images/skills/AdobeXD.png"
import Coding from "/images/skills/Coding.png"
import DesignThinking from "/images/skills/DesignThinking.png"
import Figma from "/images/skills/Figma.png"
import Prototyping from "/images/skills/Prototyping.png"
import Researche from "/images/skills/Researche.png"
import Ui_ux from "/images/skills/Ui_ux.png"
import Wireframing from "/images/skills/Wireframing.png"
import testimonialImage from "/images/testimonials/testimonial_image.png"

export const navLinks = [
    {
        id: "about",
        title: "About",
    },
    {
        id: "projects",
        title: "Projects",
    },
    {
        id: "skills",
        title: "Skills",
    },
    {
        id: "testimonials",
        title: "Testimonials",
    },
    {
        id: "contact",
        title: "Contact",
    },
]

// Sample project data
export const projectsData = [
  {
    id: 1,
    projectImg: portfolioCard,
    projectTitle: "Space Portfolio",
    projectDescription: "A modern portfolio inspired by space and cosmic aesthetics.",
    tags: ["Figma", "UI UX", "Responsive"],
    link: "https://www.behance.net/gallery/232934627/Space-Portfolio"
  },
  {
    id: 2,
    projectImg: museumCard,
    projectTitle: "NMFA App",
    projectDescription: "National Museum of Fine Arts of Algiers mobile app design.",
    tags: ["Figma", "UI UX", "Mobile"],
    link: "https://www.behance.net/gallery/229326107/National-Museum-of-Fine-Arts-of-Algiers-App-Design"
  },
  {
    id: 3,
    projectImg: dirasatiCard,
    projectTitle: "Dirasati Platform",
    projectDescription: "School management dashboards for teachers parents.",
    tags: ["Figma", "UI UX", "Backend"],
    link: "https://www.behance.net/gallery/227125413/Dirasati"
  },
  {
    id: 4,
    projectImg: kitabyCard,
    projectTitle: "Kitaby",
    projectDescription: "A social app for book lovers to share discover reads.",
    tags: ["Figma", "Flutter", "Frontend"],
    link: "https://www.behance.net/gallery/232934023/Kitaby"
  },
]

export const skillsInfos = [
    {
        sizes: {
            fontSize: "clamp(14px, 1.2vw, 26px)", // scales text
            bgSize: "clamp(100px, 15vw, 252px)",  // scales planet
        },
        infos: {
            text: "UI UX",
            bg: Ui_ux,
        },
        dimensions: {
            left: "clamp(0px, 2vw, 12px)",  // responsive positioning
            top: "clamp(10px, 4vh, 32px)",
        },
    },
    {
        sizes: {
            fontSize: "clamp(12px, 1vw, 21px)",
            bgSize: "clamp(90px, 12vw, 200px)",
        },
        infos: {
            text: "Prototyping",
            bg: Prototyping,
        },
        dimensions: {
            left: "clamp(120px, 22vw, 352px)",
            top: "clamp(20px, 6vh, 68px)",
        },
    },
    {
        sizes: {
            fontSize: "clamp(14px, 1.2vw, 26px)",
            bgSize: "clamp(100px, 15vw, 252px)",
        },
        infos: {
            text: "Figma",
            bg: Figma,
        },
        dimensions: {
            left: "clamp(220px, 40vw, 686px)",
            top: "clamp(0px, 1vh, 3px)",
        },
    },
    {
        sizes: {
            fontSize: "clamp(12px, 1vw, 21px)",
            bgSize: "clamp(90px, 12vw, 200px)",
        },
        infos: {
            text: "Wireframing",
            bg: Wireframing,
        },
        dimensions: {
            left: "clamp(340px, 60vw, 1070px)",
            top: "clamp(10px, 4vh, 29px)",
        },
    },
    {
        sizes: {
            fontSize: "clamp(14px, 1.2vw, 26px)",
            bgSize: "clamp(100px, 15vw, 252px)",
        },
        infos: {
            text: "Adobe XD",
            bg: AdobeXD,
        },
        dimensions: {
            left: "clamp(450px, 80vw, 1400px)",
            top: "clamp(0px, 1vh, 5px)",
        },
    },
    {
        sizes: {
            fontSize: "clamp(12px, 1vw, 21px)",
            bgSize: "clamp(90px, 12vw, 200px)",
        },
        infos: {
            text: "Design Thinking",
            bg: DesignThinking,
        },
        dimensions: {
            left: "clamp(60px, 12vw, 163px)",
            top: "clamp(100px, 40vh, 374px)",
        },
    },
    {
        sizes: {
            fontSize: "clamp(14px, 1.2vw, 26px)",
            bgSize: "clamp(100px, 15vw, 252px)",
        },
        infos: {
            text: "Coding",
            bg: Coding,
        },
        dimensions: {
            left: "clamp(220px, 40vw, 686px)",
            top: "clamp(120px, 60vh, 411px)",
        },
    },
    {
        sizes: {
            fontSize: "clamp(12px, 1vw, 21px)",
            bgSize: "clamp(90px, 12vw, 200px)",
        },
        infos: {
            text: "User Research",
            bg: Researche,
        },
        dimensions: {
            left: "clamp(380px, 70vw, 1270px)",
            top: "clamp(100px, 50vh, 374px)",
        },
    },
]


export const otherSkills = [
    {
        skillName: "Python",
        skillPercentage: "80",
    },
    {
        skillName: "Pandas",
        skillPercentage: "80",
    },
    {
        skillName: "NumPy",
        skillPercentage: "80",
    },
    {
        skillName: "Matplotlib",
        skillPercentage: "80",
    },
    {
        skillName: "Seaborn",
        skillPercentage: "80",
    },
    {
        skillName: "R",
        skillPercentage: "80",
    },
    {
        skillName: "Excel",
        skillPercentage: "80",
    },
    {
        skillName: "Power BI",
        skillPercentage: "80",
    },
    {
        skillName: "Tableau",
        skillPercentage: "80",
    },
    {
        skillName: "SQL",
        skillPercentage: "63",
    },
    {
        skillName: "PHP Laravel",
        skillPercentage: "90",
    },
    {
        skillName: "Docker",
        skillPercentage: "80",
    },
    {
        skillName: "Java",
        skillPercentage: "85",
    },
    {
        skillName: "Flutter",
        skillPercentage: "60",
    },
    {
        skillName: "Git",
        skillPercentage: "85",
    },
    {
        skillName: "Databases",
        skillPercentage: "85",
    },
    {
        skillName: "Communication",
        skillPercentage: "100",
    },
    {
        skillName: "Planification",
        skillPercentage: "60",
    },
]

export const testimonials = [
    {
        image: testimonialImage,
        fullName: "Hellassa Wassim",
        job: "Dorouscom, CEO",
        rating: 4,
        description:
            "It was an amazing experience working with him. He designed the teacher profile page and the teacher search page for Dorouscom with great creativity and attention to detail. The results were exactly what we needed!"
    },
    {
        image: testimonialImage,
        fullName: "Benhammadi Ilyas",
        job: "Full-Stack Developer",
        rating: 4,
        description:
            "I coded his designs for the Dorouscom teacher platform. His UI work was very well structured, visually consistent, and user-friendly. It made the development process smooth and allowed me to focus on functionality without worrying about design clarity."
    },
    {
        image: testimonialImage,
        fullName: "Boudjeris Abdessamed",
        job: "Frontend Developer",
        rating: 5,
        description:
            "I collaborated with him on his space-themed portfolio. He created the entire design, and I handled the coding. His design was futuristic, clean, and inspiring, which made it exciting and smooth to bring to life in code."
    },
    {
        image: testimonialImage,
        fullName: "Yasser Tioursi",
        job: "Backend Developer",
        rating: 4,
        description:
            "We worked together on the Dirasati school platform project. His designs for the platform were professional, modern, and easy to integrate with the backend. They gave the project a polished and reliable look."
    },
    {
        image: testimonialImage,
        fullName: "Salih Chiali",
        job: "Frontend Developer",
        rating: 5,
        description:
            "I worked with him on the Kitaby books app. His design for the platform was excellent — professional, intuitive, and easy to use. The overall user flow for loaning books from a library was very well thought out, which made my job coding it much easier."
    }

]

export const socialLinks = {
        linkedIn: "https://www.linkedin.com/in/benhammadi-lokmane-1b3539313",
        github: "https://github.com/LokmaneBenhammadi",
        behance: "https://www.behance.net/benhammlokmane"
}