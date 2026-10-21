import { useRef } from "react";
import me350 from "../../assets/responsive/me-350.webp";
import me500 from "../../assets/responsive/me-500.webp";

import useReveal from "../hooks/useReveal";
import { ListBox, ListBoxItem } from "react-aria-components";

export default function About() {
    const ref = useRef(null);
    useReveal(ref);

    const tags = ["eager to learn", "driven", "full-stack"];

    return (
        <>

            <section ref={ref} className="section container" id="about">
                <div className="section__top">
                    <h2 className="section__title"> <span className="section__number">01</span>About me</h2>
                </div>

                <div className="section__content">
                    <img className="section__image" src={me500} srcSet={`${me350} 350w, ${me500} 500w`} sizes="(min-width: 1100px) 25vw, (min-width: 768px) 38vw, 90vw" alt="A picture of me" loading="lazy" />
                    <div className="section__text">
                        <p className="section__body">Final-year Digital Design & Development student at Howest (major Development, minor UX). I’ve been programming for about seven years, the last four mostly for the web. I learn fast from documentation and use AI responsibly.</p>
                        <div className="about__details">
                            <article className="about__detail">
                                <h3 className="about__label">Education</h3>
                                <ul className="about__list">
                                    <li>howest Kortrijk Devine <br />
                                        2024 - now (major Development, minor UX)</li>

                                    <li>Sint-jozefscollege Torhout <br />
                                        2022 - 2024 (Informatica Beheer)</li>
                                </ul>
                            </article>

                            <article className="about__detail">
                                <h3 className="about__label">Languages</h3>
                                <ul className="about__list">
                                    <li>English (Fluent)</li>
                                    <li>Dutch (Native)</li>
                                </ul>
                            </article>
                        </div>

                        <ListBox className="tags" aria-label="More code projects" orientation="horizontal" layout="horizontal">
                            {tags.map((tag) => (
                                <ListBoxItem
                                    className="tag"
                                    key={tag}
                                    id={tag}
                                    target="_blank"
                                    rel="noreferrer"
                                    textValue={tag}
                                >
                                    
                                {tag}
                                </ListBoxItem>
                            ))}
                        </ListBox>

                    </div>

                </div>
            </section>
        </>
    );
}

