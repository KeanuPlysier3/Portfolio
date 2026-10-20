import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export default function useTitleReveal(ref, titleSelector) {
    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                const title = ref.current.querySelector(titleSelector);
                const split = SplitText.create(title, { type: "words" });

                gsap.from(split.words, {
                    opacity: 0,
                    yPercent: 60,
                    ease: "power3.out",
                    stagger: 0.25,
                    scrollTrigger: {
                        trigger: title,
                        start: "bottom bottom",
                        end: "top 50%",
                        scrub: 1,
                    },
                });

                return () => split.revert();
            });
        },
        { scope: ref },
    );
}
