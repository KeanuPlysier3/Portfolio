import { useRef } from "react";
import { Button, Link } from "react-aria-components";
import { ToastQueue } from "@react-spectrum/s2";
import SunIcon from "./SunIcon";
import useReveal from "../hooks/useReveal";
import useTitleReveal from "../hooks/useTitleReveal";

const EMAIL = "keanu.plysier@gmail.com";


const LINKS = [
    { label: "Behance", href: "https://www.behance.net/keanuplysier1?tracking_source=search_projects%7Ckeanu+Plysier" },
    { label: "Figma", href: "https://help.figma.com/hc/en-us/profiles/44389774340759-Keanu-plysier?filter_by=activities" },
];

export default function Contact() {
    const ref = useRef(null);
    useReveal(ref);
    useTitleReveal(ref, ".contact__title");

    async function copyEmail() {
        try {
            await navigator.clipboard.writeText(EMAIL);
            ToastQueue.positive("Email copied", { timeout: 5000 });
        } catch {
            // clipboard blocked (insecure page or denied permission): say so, the address is still selectable
            ToastQueue.negative("Couldn't copy. Select the address instead.", { timeout: 5000 });
        }
    }

    return (
        <section ref={ref} className="contact" id="contact">
            <p className="contact__eyebrow">05 — Contact</p>
            <hr className="contact__rule" />

            <div className="contact__hero">
                <h2 className="contact__title">Say hi.</h2>
                <SunIcon className="contact__sun" />
            </div>

            <div className="contact__email-row">
                <a className="contact__email" href={`mailto:${EMAIL}`}>{EMAIL}</a>
                <Button className="contact__copy" onPress={copyEmail}>Copy</Button>
            </div>

            

            <div className="contact__links">
                <Link
                    className="contact__button"
                    href="https://github.com/KeanuPlysier3"
                    target="_blank"
                    rel="noreferrer"
                >
                    GitHub ↗
                    <SunIcon className="contact__button-sun" />
                </Link>
                {LINKS.map((link) => (
                    <Link
                        className="contact__link"
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {link.label} ↗
                    </Link>
                ))}
            </div>
        </section>
    );
}
