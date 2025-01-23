import Link from 'next/link';
import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const links = [
        { label: "Github", href: "https://github.com/AhmadBahr" },
        { label: "LinkedIn", href: "https://www.linkedin.com/in/ahmadbahr/" },
        { label: "Tiktok", href: "https://www.tiktok.com/@atto_toks" },
        { label: "Instagram", href: "https://www.instagram.com/attotame/" },
    ];

    return (
        <div className="footer">
            <p>Ahmad Bahr &copy; Copyright {currentYear}</p>
            <div className="footer__links">
                {links.map(({ label, href }) => (
                    <Link
                        key={label.toLowerCase().replace(" ", "-")}
                        href={href}
                        className="footer__link"
                        target={href.startsWith("http") ? "_blank" : "_self"} 
                        scroll={false}
                    >
                        {label}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Footer;
