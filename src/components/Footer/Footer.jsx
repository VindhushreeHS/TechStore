import React from "react";

export default function Footer({ onScrollOnTop }) {
  return (
    <footer className="footer">
      <p>&copy; 2024 TechStore. All rights reserved.</p>
      <button
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          width: "50px",
        }}
        onClick={onScrollOnTop}
      >
        Back
      </button>
    </footer>
  );
}
