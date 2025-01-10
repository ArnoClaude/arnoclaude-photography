import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
    { label: "Overview", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showNavbar, setShowNavbar] = useState(true);

    // Keep track of the previous scroll position
    const prevScrollPos = useRef(0);

    // Toggle the mobile menu
    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    // Disable body scrolling when the mobile menu is open
    useEffect(() => {
        if (menuOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
    }, [menuOpen]);

    // Determine whether to show/hide the navbar on scroll
    useEffect(() => {
        function handleScroll() {
            const currentScrollPos = window.scrollY;

            if (currentScrollPos > prevScrollPos.current) {
                // Scrolling down – hide the navbar
                setShowNavbar(false);
            } else {
                // Scrolling up – show the navbar
                setShowNavbar(true);
            }

            // Update previous scroll position
            prevScrollPos.current = currentScrollPos;
        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 left-0 w-full bg-cream transition-transform duration-300 px-4 md:px-32 ${showNavbar ? "translate-y-0" : "-translate-y-full"}`}>
            {/* Desktop Navbar */}
            <nav className="hidden md:flex flex-row justify-between items-center h-32">
                <a href="/" className="text-3xl">
                    Arno Claude
                </a>
                <ul className="flex flex-row space-x-8 text-xl">
                    {navItems.map((item) => (
                        <li key={item.label} className="hover:text-gray-500 cursor-pointer">
                            <a href={item.href}>{item.label}</a>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Mobile Navbar */}
            <nav className="flex md:hidden flex-row justify-between items-center h-16">
                <a href="/" className="text-xl">
                    Arno Claude
                </a>
                <button
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                    aria-expanded={menuOpen}
                    className="hover:text-gray-500"
                >
                    {menuOpen ? <X /> : <Menu />}
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            {menuOpen && (
                <ul className="md:hidden flex flex-col space-y-8 items-center py-8">
                    {navItems.map((item) => (
                        <li key={item.label} className="hover:text-gray-500 cursor-pointer">
                            <a href={item.href}>{item.label}</a>
                        </li>
                    ))}
                </ul>
            )}
        </header>
    );
}
