import { useRef } from "react";
import heatcheck from "../../assets/heatcheck.png";
import planA from "../../assets/planA.png";
import dirk from "../../assets/dirk.png";
import useReveal from "../hooks/useReveal";

const PROJECTS = [
    {
        label: "project 01 - DEV (end of second year)",
        title: "Plan A",
        image: planA,
        alt: "Plan A, the group-trip planner, shown on three phones",
        description:
            "Interactive group-trip planner for the City of Antwerp. As lead developer I built the Node.js server that validates everything between the app and the MySQL database.",
        tags: ["Node.js", "Express", "MySQL", "REST APIs"],
        href: "https://keanupl.be/planA",
    },
    {
        label: "project 02 - DEV (start of third year)",
        title: "HeatCheck",
        image: heatcheck,
        alt: "HeatCheck, the basketball shooting game, shown on a laptop",
        description:
            "A basketball shooting game in the browser, built with three.js on WebGPU physics, sound and a lot of tuning to make every shot feel right.",
        tags: ["Three.js", "webGPU", "javaScript"],
        href: "https://keanuplysier3.github.io/heatCheck/",
    },
    {
        label: "project 03 - DEV (start of second year)",
        title: "MoMu Dirk",
        image: dirk,
        alt: "The MoMu Dirk website shown on a laptop and a phone",
        highlight:
            "First time working with responsive design and GSAP. A good point of reference to see how far I have come.",
        description:
            "The project is an interactive web experience for the Fashion Museum Antwerp that tells the story behind a designer’s collection, with micro-interactions and scroll animation.",
        tags: ["GSAP", "Responsive"],
        href: "https://keanuplysier3.github.io/dirk",
    },
];

export default function Work() {
    const ref = useRef(null);
    useReveal(ref, ".project");

    return (
        <section ref={ref} className="section container" id="projects">
            <div className="section__top">
                <h2 className="section__title"><span className="section__number">02</span>Selected work</h2>
            </div>
            <p className="section__subtitle">Few highlights from my work</p>

            {PROJECTS.map((project, index) => (
                <article
                    className={`section__content project${index % 2 === 1 ? " project--reverse" : ""}`}
                    key={project.title}
                >
                    <img className="section__image" src={project.image} alt={project.alt} />
                    <div className="project__info">
                        <p className="project__label">{project.label}</p>
                        <h3 className="project__title">{project.title}</h3>
                        <p className="section__body">
                            {project.highlight && <span className="project__highlight">{project.highlight} </span>}
                            {project.description}
                        </p>

                        <ul className="tags">
                            {project.tags.map((tag) => (
                                <li key={tag}>{tag}</li>
                            ))}
                        </ul>

                        <a className="project__link" href={project.href}>View project →</a>
                    </div>
                </article>
            ))}
        </section>
    );
}
