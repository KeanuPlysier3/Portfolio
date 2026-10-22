import { useRef } from "react";
import SunIcon from "./SunIcon";
import useReveal from "../hooks/useReveal";
import { Link, ListBox, ListBoxItem } from "react-aria-components";

import xd3350 from "../../assets/responsive/xd3-350.webp";
import xd3500 from "../../assets/responsive/xd3-500.webp";
import xd3700 from "../../assets/responsive/xd3-700.webp";
import int4350 from "../../assets/responsive/int4-350.webp";
import int4500 from "../../assets/responsive/int4-500.webp";
import int4700 from "../../assets/responsive/int4-700.webp";
import milesAndmeals350 from "../../assets/responsive/miles&meals-350.webp";
import milesAndmeals500 from "../../assets/responsive/miles&meals-500.webp";
import milesAndmeals700 from "../../assets/responsive/miles&meals-700.webp";
import workshop350 from "../../assets/responsive/workshop-350.webp";
import workshop500 from "../../assets/responsive/workshop-500.webp";
import workshop700 from "../../assets/responsive/workshop-700.webp";


const PROJECTS = [
    {
        label: "UX research - 2025",
        title: "XD3",
        image: xd3700,
        srcSet: `${xd3350} 350w, ${xd3500} 500w, ${xd3700} 700w`,
        alt: "XD3, the screentime research project, shown on a laptop",
        description:
            "Researched the screentime of children and the way it influences their develompent. Project ",
        href: "https://www.behance.net/gallery/240434353/A-Gardeners-Guide-EX3-Team-6-Eng",
    },
    {
        label: "UX research - 2026",
        title: "PLAN A",
        image: int4700,
        srcSet: `${int4350} 350w, ${int4500} 500w, ${int4700} 700w`,
        alt: "Plan A, the group-trip planner, shown on phones",
        description:
            "Research made for the city of Antwerp, to see how they could attract young urban travellers to the city.",
        href: "https://www.behance.net/gallery/251471625/Plan-A",
    },
    {
        label: "Visual Design - 2025",
        title: "VD4",
        image: milesAndmeals700,
        srcSet: `${milesAndmeals350} 350w, ${milesAndmeals500} 500w, ${milesAndmeals700} 700w`,
        alt: "VD4, the food delivery app, shown on a phone",
        description:
            "A food delivery app for a fictional company, with over the top interactions.",
        href: "https://www.figma.com/design/elCwKjN60KkA6rljUx6C5T/KeanuPlysier-VD4?node-id=59779-94871&t=Hch19rb1C6mNgztj-1",
    },
    {
        label: "Visual Design - 2024",
        title: "VD2",
        image: workshop700,
        srcSet: `${workshop350} 350w, ${workshop500} 500w, ${workshop700} 700w`,
        alt: "VD2, the podcast workshop planning tool, shown on a laptop",
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


            <ListBox
                className="design__grid"
                aria-label="design projects"
                layout="grid"
                orientation="horizontal"
            >
                {PROJECTS.map((project) => (
                    <ListBoxItem
                        className="design__item"
                        key={project.title}
                        id={project.title}
                        textValue={project.title}
                        target="_blank"
                        rel="noreferrer"
                    >

                        <Link className="design__card" href={project.href} target="_blank" rel="noreferrer">

                            <SunIcon className="design__sun" />
                            <img className="design__image" src={project.image} srcSet={project.srcSet} sizes="(min-width: 1100px) 28vw, (min-width: 768px) 40vw, 90vw" alt={project.alt} loading="lazy" />
                            <div className="design__meta">
                                <p className="design__label">{project.label}</p>
                                <h3 className="design__title">{project.title}</h3>
                            </div>
                            <span className="design__arrow" aria-hidden="true">→</span>
                        </Link>
                            <p className="design__text">{project.description}</p>
                    </ListBoxItem>
                ))}
            </ListBox>
        </section>
    );
}
