import React from "react";
import User from "../User";

export default function NavActions({
  onToggleTheme,
  isDark,
  wishlist,
  cartCount,
}) {
  return (
    <div className="nav-actions">
      <button onClick={onToggleTheme} className="nav-btn">
        {isDark === "dark" ? "☀️ Light Mode" : " 🌑 Dark Mode"}
      </button>

      <button className="nav-btn cart-btn">
        ❤️{" "}
        {wishlist.length > 0 && (
          <span className="cart-count">{wishlist.length}</span>
        )}
      </button>

      <button className="nav-btn cart-btn">
        🛒 {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
      </button>

      <button className="nav-btn">Sign In</button>
      <button className="nav-btn primary">Shop Now</button>

      <User userName="Vindhu" />
    </div>
  );
}
