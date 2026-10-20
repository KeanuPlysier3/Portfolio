export default function Footer() {
    return (
        <footer className="footer">
            <p>© {new Date().getFullYear()} Keanu Plysier</p>
            <p>Built with React (+Spectrum)</p>
            <a href="#top">Back to top ↑</a>
        </footer>
    );
}
