import { useRef } from "react";
import { ListBox, ListBoxItem } from "react-aria-components";
import SunIcon from "./SunIcon";
import useReveal from "../hooks/useReveal";

const PROJECTS = [
  { number: '04', title: 'React Native + Apple Health', type: 'Mobile app',     year: 2026, href: 'https://github.com/KeanuPlysier3/PlateMate' },
  { number: '05', title: 'WebRTC + voice recognition',  type: 'Real-time · ML', year: 2026, href: 'https://github.com/KeanuPlysier3/CC4' },
  { number: '06', title: 'Strapi CMS + Astro',          type: 'Full-stack',     year: 2025, href: 'https://github.com/KeanuPlysier3/strapstro' },
  { number: '07', title: 'Astro content collections',   type: 'Static site',    year: 2025, href: 'https://github.com/KeanuPlysier3/web-assignment1' },
  { number: '08', title: 'Arduino × Web Serial API',    type: 'Hardware',       year: 2026, href: 'https://github.com/KeanuPlysier3/CC4-part2' },
];

export default function MoreCode() {
    const ref = useRef(null);
    useReveal(ref, ".code__row");

    return (
        <section ref={ref} className="section container" id="code">
            <div className="section__top">
                <h2 className="section__title"><span className="section__number">04</span>More code</h2>
            </div>
            <p className="section__subtitle">Smaller projects and experiments (local builds)</p>

         
            <ListBox className="code__list" aria-label="More code projects">
                {PROJECTS.map((project) => (
                    <ListBoxItem
                        className="code__row"
                        key={project.number}
                        id={project.number}
                        href={project.href}
                        target="_blank"
                        rel="noreferrer"
                        textValue={project.title}
                    >
                        <SunIcon className="code__sun" />
                        <span className="code__number">{project.number}</span>
                        <span className="code__title">{project.title}</span>
                        <span className="code__meta">{project.type} — {project.year}</span>
                        <span className="code__arrow" aria-hidden="true">↗</span>
                    </ListBoxItem>
                ))}
            </ListBox>
        </section>
    );
}
