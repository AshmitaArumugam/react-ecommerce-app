import React, { useState } from "react";
<<<<<<< HEAD
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
=======
import { Routes, Route } from "react-router-dom";
>>>>>>> 83981f880544d02b0e868a7ccee07a9911ef80e0

import ProductPage from "./ProductPage";
import CartPage from "./CartPage";
import WishlistPage from "./WishlistPage";
import OrderPage from "./OrderPage";
import NotificationPage from "./NotificationPage";
import "./Notification.css";

// Auth pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOtp from "./pages/VerifyOtp";

// Protected Route
import ProtectedRoute from "./ProtectedRoute";


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
  const [notifications, setNotifications] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  // Auth pages where bell should NOT appear
  const authRoutes = [
    "/",
    "/signup",
    "/forgot-password",
    "/verify-otp",
  ];

  return (
<<<<<<< HEAD
    <>
      {/* 🔔 GLOBAL NOTIFICATION ICON (ONLY AFTER LOGIN & NOT ON AUTH PAGES) */}
      {localStorage.getItem("token") &&
        !authRoutes.includes(location.pathname) && (
          <div
            className="notification-bar"
            onClick={() => navigate("/notifications")}
          >
            <span className="bell">🔔</span>
            <span className="count">{notifications.length}</span>
          </div>
        )}

      <Routes>
        {/* ========== AUTH ROUTES (PUBLIC) ========== */}
        <Route
          path="/"
          element={<Login setNotifications={setNotifications} />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />

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
                setNotifications={setNotifications}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage setNotifications={setNotifications} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <WishlistPage
                wishlist={wishlist}
                setWishlist={setWishlist}
                setNotifications={setNotifications}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/order"
          element={
            <ProtectedRoute>
              <OrderPage setNotifications={setNotifications} />
            </ProtectedRoute>
          }
        />

        {/* 🔔 NOTIFICATION PAGE */}
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <NotificationPage notifications={notifications} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
=======
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
>>>>>>> 83981f880544d02b0e868a7ccee07a9911ef80e0
  );
}

export default App;
