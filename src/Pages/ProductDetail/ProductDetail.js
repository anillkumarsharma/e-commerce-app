import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../../Context/Cart_Context"; // Import Cart Context
import "./ProductDetailPage.css";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart(); // Use addToCart from context
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State for success message

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  const handleAddToCart = (product) => {
    addToCart(product); // Add product to cart
    setShowSuccessMessage(true); // Show success message
    setTimeout(() => setShowSuccessMessage(false), 2000); // Hide after 2 seconds
  };

  if (!product) return <div className="loading">Loading...</div>;

  return (
    <div className="product-detail-page">
      <div className="product-detail-card">
        <img
          src={product.image}
          alt={product.title}
          className="product-detail-image"
        />
        <div className="product-detail-info">
          <h1 className="product-detail-title">{product.title}</h1>
          <p className="product-detail-description">{product.description}</p>
          <p className="product-detail-price">Price: ${product.price.toFixed(2)}</p>
          <div className="d-flex">
            <Link to="/" className="back-to-products">
              Back to Products
            </Link>
            <button
              className="back-to-products"
              style={{ marginLeft: "50px" }}
              onClick={() => handleAddToCart(product)} // Call handler
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {showSuccessMessage && ( // Show success message
        <div className="success-message">
          Item added successfully to the cart!
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
