import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
    { label: "Overview", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    useEffect(() => {
        if (menuOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
    }, [menuOpen]);

    return (
        <header>
            {/* Desktop Navbar */}
            <nav className="hidden md:flex flex-row justify-between items-center h-32">
                <a href="/" className="text-3xl" >Arno Claude</a>
                <ul className="flex flex-row space-x-8 text-xl">
                    {navItems.map((item) => (
                        <li key={item.label} className="hover:text-gray-500 cursor-pointer">
                            <a href={item.href}>{item.label}</a>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Mobile Navbar */}
            <nav className="flex md:hidden flex-row justify-between items-center px-4 h-16">
                <a href="/" className="text-xl">Arno Claude</a>
                <button
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                    aria-expanded={menuOpen}
                    className="hover:text-gray-500"
                >
                    {menuOpen ? <X/> : <Menu/>}
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            {menuOpen && (
                <ul className="md:hidden flex flex-col space-y-8 items-center py-4">
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
