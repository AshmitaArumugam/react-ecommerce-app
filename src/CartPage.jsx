import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";

function CartPage() {
  const navigate = useNavigate();

  // ✅ Load cart from localStorage
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  // ❌ Remove item
  const removeItem = (index) => {
    const updated = cartItems.filter((_, i) => i !== index);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // 💰 Grand total (NO quantity)
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price,
    0
  );

  return (
    <div className="cart-container">
      <h2>My Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty 🛒</p>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <div className="cart-card" key={index}>
              <h4>{item.name}</h4>
              <p>₹{item.price}</p>

              <p>Total: ₹{item.price}</p>

              <button
                className="remove-btn"
                onClick={() => removeItem(index)}
              >
                Remove
              </button>
            </div>
          ))}

          <h3>Grand Total: ₹{totalPrice}</h3>

          {/* ✅ PLACE ORDER */}
          <button
            className="order-btn"
            onClick={() =>
              navigate("/order", {
                state: { cartItems }
              })
            }
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
}

export default CartPage;
