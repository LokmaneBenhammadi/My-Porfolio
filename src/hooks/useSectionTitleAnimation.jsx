import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger, SplitText);

export const useSectionTitleAnimation = () => {
    const titleRef = useRef(null);
    const isMobile = useMediaQuery({ maxWidth: 767 });

    useGSAP(() => {
        if (!titleRef.current) return;

        // Split into words + chars
        const titleSplit = new SplitText(titleRef.current, {
            type: "words,chars",
            wordsClass: "split-word",
            charsClass: "split-char",
            tag: "span",
        });

        // Initial state (words invisible, moved down)
        gsap.set(titleSplit.words, { opacity: 0, y: 50 });

        // Animate words in sequence
        gsap.to(titleSplit.words, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: titleRef.current,
                start: isMobile ? "top 50%" : "top 75%",
            },
        });

        // Cleanup
        return () => {
            titleSplit.revert();
        };
    }, []);

    return titleRef;
};
