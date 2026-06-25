import React from "react";

const navItems = ["Products", "Deals", "Support", "About"];

export default function NavLinks() {
  return (
    <ul className="nav-links">
      {navItems.map((item) => (
        <li key={item}>
          <a href="#" className="nav-link">
            {item}
          </a>
        </li>
      ))}
    </ul>
  );
}
