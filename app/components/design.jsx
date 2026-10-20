import { useRef } from "react";
import SunIcon from "./SunIcon";
import useReveal from "../hooks/useReveal";

const PROJECTS = [
    {
        label: "UX research - 2025",
        title: "XD3",
        description:
            "Researched the screentime of children and the way it influences their develompent. Project ",
        href: "https://www.behance.net/gallery/240434353/A-Gardeners-Guide-EX3-Team-6-Eng",
    },
    {
        label: "UX research - 2026",
        title: "PLAN A",
        description:
            "Research made for the city of Antwerp, to see how they could attract young urban travellers to the city.",
        href: "https://www.behance.net/gallery/251471625/Plan-A",
    },
    {
        label: "Visual Design - 2025",
        title: "VD4",
        description:
            "A food delivery app for a fictional company, with over the top interactions.",
        href: "https://www.figma.com/design/elCwKjN60KkA6rljUx6C5T/KeanuPlysier-VD4?node-id=59779-94871&t=Hch19rb1C6mNgztj-1",
    },
    {
        label: "Visual Design - 2024",
        title: "VD2",
        description:
            "An interactive form, to plan a podcast workshop.",
        href: "https://www.figma.com/proto/dqQCWEBrqJHFXd2Pc1CxGt/workshop-booking?node-id=2411-2526&starting-point-node-id=2411%3A2526&t=JkYO8sIP38HxTZQY-1",
    },
];

export default function Design() {
    const ref = useRef(null);
    useReveal(ref, ".design__item");

    return (
        <section ref={ref} className="section container" id="design">
            <div className="section__top">
                <h2 className="section__title"><span className="section__number">03</span>UX & visual design</h2>
            </div>
            <p className="section__subtitle">Smaller, but part of how I work</p>

            <ul className="design__grid">
                {PROJECTS.map((project) => (
                    <li className="design__item" key={project.title}>
                        <a className="design__card" href={project.href}>
                            <SunIcon className="design__sun" />
                            <div className="design__meta">
                                <p className="design__label">{project.label}</p>
                                <h3 className="design__title">{project.title}</h3>
                            </div>
                            <span className="design__arrow" aria-hidden="true">→</span>
                        </a>
                        <p className="design__text">{project.description}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
}
