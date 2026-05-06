import ProductCard from "./components/ProductCard";
import "./App.css";
import products from "./data";
import { useState } from "react";

function App() {

  const allBrands = [...new Set(products.map(p => p.brand))];
  
  // Cart - array of products in cart
  const [cartItems, setCartItems] = useState([]);

  // Wishlist - array of products keys that are wishlisted
  const [wishlist, setWishlist] = useState([]);

  // Search - what user types in the search tab
  const [searchItem, setSearchItem] = useState("");

  // Brand filter- which brand is selected, "All" means show all the brands
  const [selectedBrand, setSelectedBrand] = useState("All");

  // Sort criteria state (Initialized to a string instead of an empty array)
  const [sortBy, setSortBy] = useState("default");

  const [isDark, setIsDark] = useState(true);

  function addToCart(product) {
    const existingItem = cartItems.find(item => item.key === product.key);

    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.key === product.key ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      // If the product is not there, add it with a quantity of 1
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  }

  // Finding the sum of an array using reduce method
  const cartCount = cartItems.reduce((total, item) => (
    total + item.quantity
  ), 0);

  // Finding the total price added to the cart
  const cartTotal = cartItems.reduce((total, item) => (
    total + (item.price * item.quantity)
  ), 0);


  function toggleWishlist(productID) {
    if (wishlist.includes(productID)) {
      // If it already exists, filter it out to remove it
      setWishlist(wishlist.filter(id => id !== productID));
    } else {
      // BUG FIX: Wrapped inside standard array brackets [...]
      setWishlist([...wishlist, productID]);
    }
  }

  // Step 1: Filter based on the search input and selected brand
  // TIP: Changed matching criteria to product.name so searching for "iMac" or "Pro" works perfectly!
  let filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchItem.toLowerCase());
    const matchesBrand = selectedBrand === "All" || product.brand === selectedBrand;
    return matchesSearch && matchesBrand;
  });

  // Step 2: Sort based on the filtered products array
  if (sortBy === "price-low") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  }
  else if (sortBy === "price-high") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }
  else if (sortBy === "rating") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating); // Show highest rated first
  }
  else if (sortBy === "name") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name));
  }


  const toggleTheme = ()=>{
    setIsDark((prev) => (prev === "dark" ? "light" : "dark"));
  };


  return (
    <div className="app">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-container">
          <a href="/" className="logo">
            <span className="logo-icon">◆</span>
            TechStore
          </a>

          <ul className="nav-links">
            <li><a href="#" className="nav-link">Products</a></li>
            <li><a href="#" className="nav-link">Deals</a></li>
            <li><a href="#" className="nav-link">Support</a></li>
            <li><a href="#" className="nav-link">About</a></li>
          </ul>

          
          <div className="nav-actions">

            <button onClick={toggleTheme} className="nav-btn">
              {isDark === "dark" ? "☀️ Light Mode" : " 🌑 Dark Mode"}
            </button>
            
            <button className="nav-btn cart-btn">
              ❤️ {wishlist.length > 0 && <span className="cart-count">{wishlist.length}</span>}
            </button>

            <button className="nav-btn cart-btn">
              🛒 {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </button>
          
            <button className="nav-btn">Sign In</button>
            <button className="nav-btn primary">Shop Now</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-tag">New Arrivals 2026</p>
          <h1 className="hero-title">The Future of Tech <br />
            <span className="hero-highlight">Is Here.</span>
          </h1>
          <p className="hero-description">
            Discover the latest in premium technology. From powerful computers to 
            cutting-edge smartphones, find everything you need in one place.
          </p>
          
          <div className="hero-cta">
            <button className="btn-primary">Explore Products</button>
            <button className="btn-secondary">Learn More</button>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
            <div className="stat">
              <span className="stat-number">200+</span>
              <span className="stat-label">Premium Products</span>
            </div>
            <div className="stat">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Customer Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section" id="product">
        <div className="section-header">
          <h2 className="section-title">Best Sellers</h2>
          <p className="section-subtitle">
            Our most popular products loved by customers
          </p><br />
        </div>
        

        <div className="filter-controls">
          <div className="filter-group">
            <input
              type="text"
              placeholder="Search for a product..."
              value={searchItem}
              onChange={(e) => { setSearchItem(e.target.value) }}
              className="search-input"
            />
          </div>
          <div className="filter-group">
            <select
              value={selectedBrand}
              onChange={(e) => { setSelectedBrand(e.target.value) }}
              className="filter-select"
            >
              {/* BUG FIX: Changed matching option value from "ALL" to "All" */}
              <option value="All">All Brands</option>
              {allBrands.map((brand) => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <select
              value={sortBy}
              onChange={(e) => { setSortBy(e.target.value) }}
              className="filter-select"
            >
              <option value="default">Sort By</option>
              <option value="price-low">Price low to high</option>
              <option value="price-high">Price high to low</option>
              <option value="rating">Rating</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>
        
        {/* BUG FIX: Changed from products.map to filteredProducts.map */}
        <div className="product-grid">
          {filteredProducts.map((data) => (
            <ProductCard
              key={data.key}
              id={data.key}
              image={data.image}
              name={data.name}
              price={data.price}
              originalPrice={data.originalPrice}
              discount={data.discount}
              rating={data.rating}
              isBestSeller={data.isBestSeller}
              isWishlisted={wishlist.includes(data.key)}
              onAddToCart={() => addToCart(data)}
              onToggleWishlist={() => toggleWishlist(data.key)}
            />
          ))}
        </div>

        {/* Empty State message if no products match filters */}
        {filteredProducts.length === 0 && (
          <div style={{ textAlign: 'center', color: 'var(--text-dim)', margin: '40px 0' }}>
            <h3>No items found matching your search.</h3>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;