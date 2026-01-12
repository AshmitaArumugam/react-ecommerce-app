import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";
import { getCart, removeFromCart } from "./api/cartApi";

function CartPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [cartItems, setCartItems] = useState([]);

  /* ========== FETCH CART ========== */
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCart(token);
        setCartItems(data.items || []);
      } catch (err) {
        console.error("Fetch cart failed", err);
      }
    };

    fetchCart();
  }, [token]);

  /* ========== REMOVE ITEM ========== */
  const removeItem = async (productId) => {
    try {
      await removeFromCart(productId, token);
      setCartItems((prev) =>
        prev.filter((item) => item.id !== productId)
      );
      // 🔔 Notification handled by backend
    } catch (err) {
      console.error("Remove cart failed", err);
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price,
    0
  );

  return (
    <div className="cart-container">
      <h2>My Cart</h2>

      {cartItems.length === 0 && <p>Your cart is empty</p>}

      {cartItems.map((item) => (
        <div className="cart-card" key={item.id}>
          <h4>{item.name}</h4>
          <p>₹{item.price}</p>

          <button onClick={() => removeItem(item.id)}>
            Remove
          </button>
        </div>
      ))}

      <h3>Grand Total: ₹{total}</h3>

      <button
        className="order-btn"
        onClick={() => navigate("/order", { state: { cartItems } })}
      >
        Place Order
      </button>
    </div>
  );
}

export default CartPage;
