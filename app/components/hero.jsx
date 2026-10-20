import { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import SunIcon from "./SunIcon";
import Nav from "./nav";

gsap.registerPlugin(SplitText, useGSAP);

export default function Hero() {
    const root = useRef(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                const split = SplitText.create(".hero__title", { type: "chars" });

                const tl = gsap.timeline({
                    defaults: { ease: "power4.out" },
                    onComplete: () => split.revert(),
                });

                tl.from(".nav, .nav__subtext-container", { opacity: 0, y: -16, duration: 0.7, stagger: 0.1 })
                    .from(split.chars, { opacity: 0, yPercent: 60, duration: 1, stagger: 0.04 }, 0.15)
                    .from(".hero__sun", { opacity: 0, duration: 1.2, ease: "power2.out" }, 0.6)
                    .from(".hero__subtext-container", { opacity: 0, y: 24, duration: 0.8 }, 0.9);

                return () => split.revert();
            });
        },
        { scope: root },
    );

    return (
        <div className="hero__section container" ref={root}>
            <Nav />
            <div className="hero__content">
                <div className="hero__title-wrap">
                    <SunIcon className="hero__sun" />
                    <h1 className="hero__title">keanu <br /><span className="hero__title-highlight">plysier</span></h1>
                </div>
            </div>

            <div className="hero__subtext-container">

                <div className="hero__subtext-container-bottom">
                    <p className="hero__subtext">//Looking for internship opportunities from 15.02 until 21.05.2027</p>
                    <p className="hero__subtext"><a href="#about">scroll</a></p>
                </div>

            </div>
        </div>
    );
}
