import { useRef } from "react";
import me from "../../assets/me.png";
import useReveal from "../hooks/useReveal";

export default function About() {
    const ref = useRef(null);
    useReveal(ref);

    return (
        <>

            <section ref={ref} className="section container" id="about">
                <div className="section__top">
                    <h2 className="section__title"> <span className="section__number">01</span>About me</h2>
                </div>

                <div className="section__content">
                    <img className="section__image" src={me} alt="A picture of me" />
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

                        <ul className="tags">
                            <li>eager to learn</li>
                            <li>driven</li>
                            <li>full-stack</li>
                        </ul>


                    </div>

                </div>
            </section>
        </>
    );
}

