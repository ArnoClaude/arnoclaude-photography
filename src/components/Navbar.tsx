import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    // We'll store the computed `top` position in state
    const [navTop, setNavTop] = useState("0");

    // We use a ref so updating `lastScrollTop.current` doesn’t trigger a re-render
    const lastScrollTop = useRef(0);

    // Toggle mobile menu
    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    useEffect(() => {
        function handleScroll() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop > lastScrollTop.current) {
                // Scrolling down => hide navbar
                setNavTop("-80px");
            } else {
                // Scrolling up => show navbar
                setNavTop("0");
            }
            lastScrollTop.current = scrollTop;
        }

        // Attach the scroll event listener
        window.addEventListener("scroll", handleScroll);

        // Cleanup on component unmount
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        /*
          This wrapper "sticky" div will move up/down
          according to navTop state.
          We add a Tailwind transition for a smooth slide effect.
        */
        <div
            id="navbar"
            className="sticky left-0 right-0 bg-white transition-all duration-300 z-50"
            style={{ top: navTop }}
        >
            {/* Desktop Navbar */}
            <nav className="hidden md:flex flex-row justify-between items-center py-16">
                <p className="font-serif">Arno Claude (Desktop)</p>
                <ul className="flex flex-row space-x-8">
                    <li className="hover:text-gray-500 cursor-pointer">Overview</li>
                    <li>Projects</li>
                    <li>About</li>
                </ul>
            </nav>

            {/* Mobile Navbar */}
            <nav className="flex md:hidden flex-row justify-between items-center p-4">
                <p className="font-serif">Arno Claude (Mobile)</p>
                <button
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                    aria-expanded={menuOpen}
                    className="hover:text-gray-500"
                >
                    {menuOpen ? <X /> : <Menu />}
                </button>
            </nav>

            {/* Mobile Menu Overlay (optional) */}
            {menuOpen && (
                <ul className="md:hidden flex flex-col space-y-8 items-center py-4">
                    <li className="hover:text-gray-500 cursor-pointer">Overview</li>
                    <li>Projects</li>
                    <li>About</li>
                </ul>
            )}
        </div>
    );
}
