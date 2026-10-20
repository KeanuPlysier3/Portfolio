import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Fades elements in and lifts them a little as they scroll into view. The fade follows the
// scrollbar, so scrolling back up undoes it.
//
//   useReveal(ref)              -> the whole element behind `ref` fades in as one block
//   useReveal(ref, ".project")  -> every match inside `ref` fades in on its own, as you reach it
//
// Skipped entirely for visitors who asked for reduced motion, so their content is just there.
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
                            start: "top 70%",
                            // the fade runs from here...
                            end: "top 35%",
                            // ...and follows the scrollbar (1 = a second of smoothing)
                            scrub: 1,
                        },
                    });

                if (!itemSelector) {
                    reveal(ref.current);
                    return;
                }

                // Some lists (React Aria's ListBox) put their rows in the page a moment after this effect
                // runs, so look again on the next frames until they exist (gives up after about a third of a second)
                let frame;
                let attempts = 0;
                const findItems = () => {
                    const items = gsap.utils.toArray(itemSelector, ref.current);
                    if (!items.length && attempts++ < 20) {
                        frame = requestAnimationFrame(findItems);
                        return;
                    }
                    // context.add keeps animations created late tied to this media query, so they are cleaned up with it
                    context.add(() => items.forEach(reveal));
                };
                findItems();

                return () => cancelAnimationFrame(frame);
            });
        },
        { scope: ref },
    );
}
