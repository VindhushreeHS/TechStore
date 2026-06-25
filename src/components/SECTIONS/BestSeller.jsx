import React from "react";
import ProductCard from "./ProductCard";

export default function BestSeller({
  allBrands,
  searchItem,
  selectedBrand,
  sortBy,
  onSearchChange,
  onBrandChange,
  onSortChange,
  filteredProducts,
  wishlist,
  onAddToCart,
  onToggleWishlist,
}) {
  return (
    <section className="products-section" id="product">
      <div className="section-header">
        <h2 className="section-title">Best Sellers</h2>
        <p className="section-subtitle">
          Our most popular products loved by customers
        </p>
        <br />
      </div>

      <div className="filter-controls">
        <div className="filter-group">
          <input
            type="text"
            placeholder="Search for a product..."
            value={searchItem}
            onChange={onSearchChange}
            className="search-input"
          />
        </div>

        <div className="filter-group">
          <select
            value={selectedBrand}
            onChange={onBrandChange}
            className="filter-select"
          >
            <option value="All">All Brands</option>
            {allBrands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <select
            value={sortBy}
            onChange={onSortChange}
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
            onAddToCart={() => onAddToCart(data)}
            onToggleWishlist={() => onToggleWishlist(data.key)}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div
          style={{
            textAlign: "center",
            color: "var(--text-dim)",
            margin: "40px 0",
          }}
        >
          <h3>No items found matching your search.</h3>
        </div>
      )}
    </section>
  );
}
