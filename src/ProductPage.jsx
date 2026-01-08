import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProductPage.css";

function ProductPage({ cart, setCart, wishlist, setWishlist }) {
  const navigate = useNavigate();

  const products = [
    { id: 1, name: "Product 1", price: 999 },
    { id: 2, name: "Product 2", price: 1499 },
    { id: 3, name: "Product 3", price: 1999 },
    { id: 4, name: "Product 4", price: 899 },
    { id: 5, name: "Product 5", price: 1299 },
    { id: 6, name: "Product 6", price: 1599 },
  ];

  // ✅ ADD TO CART (STATE + LOCAL STORAGE)
  const addToCart = (product) => {
    let updatedCart;

    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    setCart(updatedCart);

    // ✅ SAVE TO LOCAL STORAGE (THIS WAS MISSING)
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    alert("Product added to cart ✅");
  };

  // ✅ ADD TO WISHLIST
  const addToWishlist = (product) => {
    const exists = wishlist.find((item) => item.id === product.id);

    if (exists) {
      alert("Product already in wishlist ❤️");
      return;
    }

    setWishlist([...wishlist, product]);
    alert("Product added to wishlist ❤️");
  };

  // ✅ BUY NOW → ORDER PAGE (SINGLE PRODUCT)
  const buyNow = (product) => {
    navigate("/order", {
      state: {
        product: { ...product, quantity: 1 },
      },
    });
  };

  return (
    <div className="container">
      {/* HEADER */}
      <div className="header">
        <h2>Online Shopping Website</h2>

        <div className="top-buttons">
          <button className="nav-btn" onClick={() => navigate("/cart")}>
            🛒 Cart ({cart.length})
          </button>

          <button className="nav-btn" onClick={() => navigate("/wishlist")}>
            ❤️ Wishlist ({wishlist.length})
          </button>
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="product-grid">
        {products.map((product) => (
          <div className="card" key={product.id}>
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>

            <div className="icons">
              <button
                className="icon-btn"
                onClick={() => addToCart(product)}
              >
                🛒
              </button>

              <button
                className="icon-btn"
                onClick={() => addToWishlist(product)}
              >
                ❤️
              </button>
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
