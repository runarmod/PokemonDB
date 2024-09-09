import React, { useState } from "react";
import "../styles/List.css";

interface ListProps {
    items: string[];
}

const List: React.FC<ListProps> = ({ items }) => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleItemClick = (index: number) => {
        setSelectedIndex(index);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <div
                className={`hamburger ${isMenuOpen ? "active" : ""}`}
                onClick={toggleMenu}
            >
                <div></div>
                <div></div>
                <div></div>
            </div>

            <ul className={`list ${isMenuOpen ? "active" : ""}`}>
                {items.map((item, index) => (
                    <li
                        key={index}
                        className={selectedIndex == index ? "selected" : ""}
                        onClick={() => handleItemClick(index)}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </>
    );
};

export default List;
