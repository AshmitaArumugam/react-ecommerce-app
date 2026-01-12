import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProductPage.css";
import { addToWishlist } from "./api/wishlistApi";

function ProductPage({ cart, setCart, wishlist, setWishlist }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // 🔹 Products MUST match backend product table
  const products = [
    { productId: "P1001", name: "iPhone 15", price: 79999 },
    { productId: "P1002", name: "Samsung Galaxy S23", price: 69999 },
    { productId: "P1003", name: "OnePlus 12", price: 49999 },
    { productId: "P1004", name: "Google Pixel 8", price: 39999 },
    { productId: "P1005", name: "Xiaomi 14", price: 29999 },
    { productId: "P1006", name: "Realme GT 5", price: 19999 },
    { productId: "P1007", name: "Samsung A54", price: 15999 },
    { productId: "P1008", name: "Vivo V27", price: 12999 },
    { productId: "P1009", name: "Oppo Reno 12", price: 8999 },
    { productId: "P1010", name: "Motorola G73", price: 5999 },
  ];

  /* ================= ADD TO CART ================= */
  const addToCart = (product) => {
    const exists = cart.find(
      (item) => item.productId === product.productId
    );

    const updatedCart = exists
      ? cart.map((item) =>
          item.productId === product.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...cart, { ...product, quantity: 1 }];

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };


    
  /* ================= ADD TO WISHLIST ================= */
  const addWishlist = async (product) => {
    const exists = wishlist.find(
      (item) => item.productId === product.productId
    );
    if (exists) return;

    try {
      // ✅ Backend expects ONLY productId
      await addToWishlist(product.productId, token);

      // Optional UI update (backend is source of truth)
      setWishlist((prev) => [...prev, product]);

    } catch (err) {
      console.error("Add to wishlist failed", err);
    }
  };

  /* ================= BUY NOW ================= */
  const buyNow = (product) => {
    navigate("/order", { state: { product } });
  };

  return (
    <div className="container">
      <div className="header">
        <h2>Online Shopping Website</h2>

        <div className="top-buttons">
          <button onClick={() => navigate("/cart")}>
            🛒 Cart ({cart.length})
          </button>

          <button onClick={() => navigate("/wishlist")}>
            ❤️ Wishlist ({wishlist.length})
          </button>
        </div>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <div className="card" key={product.productId}>
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>

            {/* 🔹 3 ACTIONS */}
            <div className="icons">
              <button onClick={() => addToCart(product)}>🛒</button>
              <button onClick={() => addWishlist(product)}>❤️</button>
            </div>

            <button
              className="buy-btn"
              onClick={() => buyNow(product)}
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductPage;
