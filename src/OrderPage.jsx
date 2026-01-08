import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./OrderPage.css";

function OrderPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // 🟢 FROM BUY NOW
  const singleProduct = location.state?.product;

  // 🟢 FROM CART
  const cartItems = location.state?.cartItems;

  // Decide order items
  const initialItems = singleProduct
    ? [{ ...singleProduct, quantity: 1 }]
    : (cartItems || []).map(item => ({ ...item, quantity: 1 }));

  // 🔥 Quantity state
  const [orderItems, setOrderItems] = useState(initialItems);

  // ➕ Increase quantity
  const increaseQty = (index) => {
    const updated = [...orderItems];
    updated[index].quantity += 1;
    setOrderItems(updated);
  };

  // ➖ Decrease quantity
  const decreaseQty = (index) => {
    const updated = [...orderItems];
    if (updated[index].quantity > 1) {
      updated[index].quantity -= 1;
      setOrderItems(updated);
    }
  };

  // 💰 Grand total
  const grandTotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="order-container">
      <h2>Order Summary</h2>

      {orderItems.length === 0 ? (
        <p>No items to order ❌</p>
      ) : (
        <>
          {orderItems.map((item, index) => (
            <div className="order-card" key={index}>
              <h4>{item.name}</h4>
              <p>Price: ₹{item.price}</p>

              {/* ✅ Quantity buttons */}
              <div className="qty-box">
                <button onClick={() => decreaseQty(index)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQty(index)}>+</button>
              </div>

              <p>Total: ₹{item.price * item.quantity}</p>
            </div>
          ))}

          <h3>Grand Total: ₹{grandTotal}</h3>

          <button
            className="confirm-btn"
            onClick={() => {
              alert("Order placed successfully 🎉");
              navigate("/");
            }}
          >
            Confirm Order
          </button>
        </>
      )}
    </div>
  );
}

export default OrderPage;
