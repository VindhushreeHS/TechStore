import "./App.css";
import products from "./data";
import { useRef, useEffect, useState } from "react";
import User from "./components/User";
import NavLogo from "./components/NAN-BAR/NavLogo";
import NavLinks from "./components/NAN-BAR/NavLinks";
import Hero from "./components/HERO-SECTION/Hero";
import BestSeller from "./components/SECTIONS/BestSeller";
import Footer from "./components/Footer/Footer";

function App() {
  const allBrands = [...new Set(products.map((p) => p.brand))];

  const topRef = useRef(null);

  function scrollOnTop() {
    topRef.current.scrollIntoView();
  }

  // Cart - array of products in cart
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItem = localStorage.getItem("myCart");

    try {
      return savedCartItem !== null ? JSON.parse(savedCartItem) : [];
    } catch (error) {
      console.log("Problem !!!", error);
    }
  });

  // Wishlist - array of products keys that are wishlisted
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("myWishlist");

    try {
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch (error) {
      console.log("Problem !!!", error);
    }
  });

  // Search - what user types in the search tab
  const [searchItem, setSearchItem] = useState("");

  // Brand filter- which brand is selected, "All" means show all the brands
  const [selectedBrand, setSelectedBrand] = useState("All");

  // Sort criteria state (Initialized to a string instead of an empty array)
  const [sortBy, setSortBy] = useState("default");

  const [isDark, setIsDark] = useState("dark");

  useEffect(() => {
    localStorage.setItem("myCart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("myWishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  function addToCart(product) {
    const existingItem = cartItems.find((item) => item.key === product.key);

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.key === product.key
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      // If the product is not there, add it with a quantity of 1
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  }

  // Finding the sum of an array using reduce method
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Finding the total price added to the cart
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  function toggleWishlist(productID) {
    if (wishlist.includes(productID)) {
      // If it already exists, filter it out to remove it
      setWishlist(wishlist.filter((id) => id !== productID));
    } else {
      // BUG FIX: Wrapped inside standard array brackets [...]
      setWishlist([...wishlist, productID]);
    }
  }

  // Step 1: Filter based on the search input and selected brand
  // TIP: Changed matching criteria to product.name so searching for "iMac" or "Pro" works perfectly!
  let filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchItem.toLowerCase());
    const matchesBrand =
      selectedBrand === "All" || product.brand === selectedBrand;
    return matchesSearch && matchesBrand;
  });

  // Step 2: Sort based on the filtered products array
  if (sortBy === "price-low") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => b.rating - a.rating,
    ); // Show highest rated first
  } else if (sortBy === "name") {
    filteredProducts = [...filteredProducts].sort((a, b) =>
      a.name.localeCompare(b.name),
    );
  }

  const toggleTheme = () => {
    setIsDark((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="app" ref={topRef}>
      {/* Navigation Bar */}
      <nav className="navbar">
        <NavLogo TechStore="TechStore" />

        <div className="nav-container">
          <NavLinks />

          <div className="nav-actions">
            <button onClick={toggleTheme} className="nav-btn">
              {isDark === "dark" ? "☀️ Light Mode" : " 🌑 Dark Mode"}
            </button>

            <button className="nav-btn cart-btn">
              ❤️{" "}
              {wishlist.length > 0 && (
                <span className="cart-count">{wishlist.length}</span>
              )}
            </button>

            <button className="nav-btn cart-btn">
              🛒{" "}
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </button>

            <button className="nav-btn">Sign In</button>
            <button className="nav-btn primary">Shop Now</button>

            <User userName="Vindhu" />
          </div>
        </div>
      </nav>

      <Hero />

      <BestSeller
        allBrands={allBrands}
        searchItem={searchItem}
        selectedBrand={selectedBrand}
        sortBy={sortBy}
        onSearchChange={(e) => setSearchItem(e.target.value)}
        onBrandChange={(e) => setSelectedBrand(e.target.value)}
        onSortChange={(e) => setSortBy(e.target.value)}
        filteredProducts={filteredProducts}
        wishlist={wishlist}
        onAddToCart={addToCart}
        onToggleWishlist={toggleWishlist}
      />

      <Footer onScrollOnTop={scrollOnTop} />
    </div>
  );
}
export default App;
