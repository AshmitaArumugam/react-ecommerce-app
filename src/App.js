import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import ProductPage from "./ProductPage";
import CartPage from "./CartPage";
import WishlistPage from "./WishlistPage";
import OrderPage from "./OrderPage";

// Auth pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOtp from "./pages/VerifyOtp";
import ResetPassword from "./pages/ResetPassword";


// Protected Route
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  return (
    <Routes>
      {/* ========== AUTH ROUTES (PUBLIC) ========== */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* ========== SHOP ROUTES (PROTECTED) ========== */}
      <Route
        path="/products"
        element={
          <ProtectedRoute>
            <ProductPage
              cart={cart}
              setCart={setCart}
              wishlist={wishlist}
              setWishlist={setWishlist}
            />
          </ProtectedRoute>
        }
      />

      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <CartPage cart={cart} />
          </ProtectedRoute>
        }
      />

      <Route
        path="/wishlist"
        element={
          <ProtectedRoute>
            <WishlistPage wishlist={wishlist} />
          </ProtectedRoute>
        }
      />

      <Route
        path="/order"
        element={
          <ProtectedRoute>
            <OrderPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
