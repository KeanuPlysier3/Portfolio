import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function useReveal(ref, itemSelector) {
    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: no-preference)", (context) => {
                const reveal = (element) =>
                    gsap.from(element, {
                        opacity: 0,
                        y: 48,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: element,
                            start: "top 90%", //starts when 
                            
                            end: "top 45%", //starts 
                            // ...and follows the scrollbar (1 = a second of smoothing)
                            scrub: 1,
                        },
                    });

                if (!itemSelector) {
                    reveal(ref.current);
                    return;
                }

                let frame;
                let attempts = 0;
                const findItems = () => {
                    const items = gsap.utils.toArray(itemSelector, ref.current);
                    if (!items.length && attempts++ < 20) {
                        frame = requestAnimationFrame(findItems);
                        return;
                    }
                    context.add(() => items.forEach(reveal));
                };
                findItems();

                return () => cancelAnimationFrame(frame);
            });
        },
        { scope: ref },
    );
}
