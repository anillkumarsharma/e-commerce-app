import React, { useState } from "react";
import { useCart } from "../../Context/Cart_Context"; // Use Cart Context
import "./CartPage.css"; // Optional CSS for styling

const CartPage = () => {
  const { cart, removeFromCart } = useCart(); // Access cart items and remove function
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State for success message
  const [message, setMessage] = useState(""); // Dynamic success message text

  // Calculate total quantity of products in the cart
  const totalProducts = cart.reduce((total, item) => total + item.quantity, 0);

  const handleRemoveFromCart = (itemId, itemTitle) => {
    removeFromCart(itemId); // Remove the item
    setMessage(`"Item removed successfully from the cart!`); // Set dynamic message
    setShowSuccessMessage(true); // Show success message
    setTimeout(() => setShowSuccessMessage(false), 2000); // Hide after 2 seconds
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-summary">
            <p>
              <strong>Total Products:</strong> {totalProducts}
            </p>
          </div>
          <ul className="cart-list">
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <img
                  src={item.image}
                  alt={item.title}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h2>{item.title}</h2>
                  <p>Price: ${item.price.toFixed(2)}</p>
                  <p>Quantity: {item.quantity}</p>
                  <button
                    className="remove-cart-button"
                    onClick={() => handleRemoveFromCart(item.id, item.title)} // Call handler
                  >
                    Remove from Cart
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      {showSuccessMessage && ( // Show success message
        <div className="success-message">{message}</div>
      )}
    </div>
  );
};

export default CartPage;
