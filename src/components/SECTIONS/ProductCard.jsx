import "./ProductCard.css";

export default function ProductCard({ 
  id,
  image, 
  name, 
  price, 
  originalPrice, 
  discount, 
  rating, 
  isBestSeller,
  isWishlisted,
  onAddToCart,
  onToggleWishlist 
}) {
  return (
    <div className="product-card">
      {/* Checks if discount exists. Safely appends % sign only if it's a number */}
      {discount && (
        <span className="discount-badge">
          {typeof discount === 'number' ? `${discount}% OFF` : discount}
        </span>
      )}
      
      {/* Wishlist Toggle Action Button */}
      <button 
        className={`wishlisted ${isWishlisted ? "active" : ""}`}
        onClick={onToggleWishlist}
        title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
      >
        {isWishlisted ? "❤️" : "🤍"}
      </button>
      
      <div className="image-container">
        <img src={image} alt={name} className="product-image" />
      </div>

      <div className="card-content">
        <h3 className="product-name">{name}</h3>
        
        <div className="rating">
          <span className="stars">
            {"★".repeat(Math.floor(rating || 0))}
            {"☆".repeat(5 - Math.floor(rating || 0))}
          </span>
          <span className="rating-value">{rating}</span>
          {isBestSeller && <span className="bestseller-tag">BEST SELLER</span>}
        </div>

        <div className="price-row">
          <span className="current-price">₹{price.toLocaleString('en-IN')}</span>
          {originalPrice && (
            <span className="original-price">₹{originalPrice.toLocaleString('en-IN')}</span>
          )}
        </div>

        <button className="add-to-cart-btn" onClick={onAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}