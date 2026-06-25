import React from "react";

const NavLogo = ({ TechStore }) => {
  return (
    <a href="/" className="logo">
      <span className="logo-icon">◆</span>
      {TechStore}
    </a>
  );
};

export default NavLogo;
