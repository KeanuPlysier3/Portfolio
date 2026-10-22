import { useRef } from "react";
import { Button, Dialog, DialogTrigger, Link, ListBox, ListBoxItem, Modal, ModalOverlay } from "react-aria-components";
import planA350 from "../../assets/responsive/planA-350.webp";
import planA500 from "../../assets/responsive/planA-500.webp";
import planA700 from "../../assets/responsive/planA-700.webp";
import heatcheck350 from "../../assets/responsive/heatcheck-350.webp";
import heatcheck500 from "../../assets/responsive/heatcheck-500.webp";
import heatcheck700 from "../../assets/responsive/heatcheck-700.webp";
import dirk350 from "../../assets/responsive/dirk-350.webp";
import dirk500 from "../../assets/responsive/dirk-500.webp";
import dirk700 from "../../assets/responsive/dirk-700.webp";
import useReveal from "../hooks/useReveal";

const PROJECTS = [
    {
        label: "project 01 - DEV (end of second year)",
        title: "Plan A",
        image: planA700,
        srcSet: `${planA350} 350w, ${planA500} 500w, ${planA700} 700w`,
        alt: "Plan A, the group-trip planner, shown on three phones",
        description:
            "Interactive group-trip planner for the City of Antwerp. As lead developer I built the Node.js server that validates everything between the app and the MySQL database.",
        tags: ["Node.js", "Express", "MySQL", "REST APIs"],
        href: "https://keanupl.be/planA",
    },
    {
        label: "project 02 - DEV (start of third year)",
        title: "HeatCheck",
        image: heatcheck700,
        srcSet: `${heatcheck350} 350w, ${heatcheck500} 500w, ${heatcheck700} 700w`,
        alt: "HeatCheck, the basketball shooting game, shown on a laptop",
        description:
            "A basketball shooting game in the browser, built with three.js on WebGPU physics, sound and a lot of tuning to make every shot feel right.",
        tags: ["Three.js", "webGPU", "javaScript"],
        href: "https://keanuplysier3.github.io/heatCheck/",
    },
    {
        label: "project 03 - DEV (start of second year)",
        title: "MoMu Dirk",
        image: dirk700,
        srcSet: `${dirk350} 350w, ${dirk500} 500w, ${dirk700} 700w`,
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
                    <DialogTrigger>
                        <Button className="project__zoom" aria-label={`Enlarge ${project.title} image`}>
                            <img className="section__image" src={project.image} srcSet={project.srcSet} sizes="(min-width: 1100px) 28vw, (min-width: 768px) 40vw, 90vw" alt={project.alt} loading="lazy" />
                        </Button>
                        <ModalOverlay className="lightbox" isDismissable>
                            <Modal className="lightbox__modal">
                                <Dialog className="lightbox__dialog" aria-label={project.title}>
                                    {({ close }) => (
                                        <>
                                            <img className="lightbox__image" src={project.image} alt={project.alt} />
                                            <Button className="lightbox__close" onPress={close} aria-label="Close">✕</Button>
                                        </>
                                    )}
                                </Dialog>
                            </Modal>
                        </ModalOverlay>
                    </DialogTrigger>
                    <div className="project__info">
                        <p className="project__label">{project.label}</p>
                        <h3 className="project__title">{project.title}</h3>
                        <p className="section__body">
                            {project.highlight && <span className="project__highlight">{project.highlight} </span>}
                            {project.description}
                        </p>
                        <ListBox
                            className="tags"
                            aria-label={`${project.title}`}
                            layout="grid"
                            orientation="horizontal"
                        >
                            {project.tags.map((tag) => (
                                <ListBoxItem
                                    className="tag"
                                    key={tag}
                                    id={tag}
                                    textValue={tag}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {tag}
                                </ListBoxItem>
                            ))}
                        </ListBox>

                        <Link className="project__link" href={project.href} target="_blank" rel="noreferrer">View project →</Link>
                    </div>
                </article>
            ))}
        </section>
    );
}
