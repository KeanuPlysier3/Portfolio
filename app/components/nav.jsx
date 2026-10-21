import { useEffect, useState } from "react";
import { ToggleButton } from "react-aria-components";
import { Tooltip, TooltipTrigger } from '@react-spectrum/s2/Tooltip';
import SunIcon from "./SunIcon";

// Same rule brand.css uses: an explicit data-theme wins, otherwise follow the OS
function getInitialDark() {
    if (typeof window === "undefined") return false;
    const explicit = document.documentElement.dataset.theme;
    if (explicit) return explicit === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export default function Nav() {
    const [isDark, setIsDark] = useState(getInitialDark);

    useEffect(() => {
        document.documentElement.dataset.theme = isDark ? "dark" : "light";
    }, [isDark]);

    return (
        <>
            <nav className="nav">
                <div className="nav__logo">keanu plysier</div>
                <ul className="nav__list">
                    <li className="nav__item"><a href="#about" className="nav__link">About</a></li>
                    <li className="nav__item"><a href="#projects" className="nav__link">Projects</a></li>
                    <li className="nav__item"><a href="#contact" className="nav__link">Contact</a></li>
                </ul>
                <TooltipTrigger delay={0}>
                    <ToggleButton className="theme-toggle" aria-label="Dark mode" isSelected={isDark} onChange={setIsDark}>
                        <SunIcon className="theme-toggle__sun" />
                    </ToggleButton>
                    <Tooltip>Toggle theme</Tooltip>
                </TooltipTrigger>
            </nav>
            <div className="nav__subtext-container">
                <p className="nav__subtext">01</p>
                <p className="nav__subtext">Portfolio 2027 - developer with UX and design experience</p>
            </div>
        </>
    );
}
