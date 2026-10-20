import SunIcon from "./SunIcon";

const TECH = [
    "React",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Express",
    "GSAP",
    "Three.js",
    "React Spectrum",
    "React Native",
    "Astro",
    "MySQL",
    "REST APIs",
    "WebSockets",
    "WebSerial",
    "PHP",
    "TensorFlow",
    "ML5.js",
    "Git",
];

// One run of the list. The track renders it twice and slides left by exactly one run (-50%),
// so the loop restarts without a visible jump.
function TickerGroup({ hidden = false }) {
    return (
        <ul className="ticker__group" aria-hidden={hidden || undefined}>
            {TECH.map((item) => (
                <li className="ticker__item" key={item}>
                    <span className="ticker__label">{item}</span>
                    <SunIcon className="ticker__sun" />
                </li>
            ))}
        </ul>
    );
}

export default function Ticker() {
    return (
        <section className="ticker" aria-label="Tech stack">
            <div className="ticker__track">
                <TickerGroup />
                <TickerGroup hidden />
            </div>
        </section>
    );
}
