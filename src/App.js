import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import ProductPage from "./ProductPage";
import CartPage from "./CartPage";
import WishlistPage from "./WishlistPage";
import OrderPage from "./OrderPage";

function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProductPage
            cart={cart}
            setCart={setCart}
            wishlist={wishlist}
            setWishlist={setWishlist}
          />
        }
      />
      <Route
        path="/cart"
        element={<CartPage cart={cart} />}
      />
      <Route
        path="/wishlist"
        element={<WishlistPage wishlist={wishlist} />}
      />
      <Route
        path="/order"
        element={<OrderPage />}
      />
    </Routes>
  );
}

export default App;
