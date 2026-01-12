import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

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
import ResetPassword from "./pages/ResetPassword";

// Protected Route
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  const authRoutes = [
    "/",
    "/signup",
    "/forgot-password",
    "/verify-otp",
    "/reset-password",
  ];

  /* ================= FETCH UNREAD COUNT ================= */
  useEffect(() => {
    const fetchUnreadCount = async () => {
      const token = localStorage.getItem("token");

      // 🔐 No token → no API call
      if (!token) {
        setUnreadCount(0);
        return;
      }

      try {
        const res = await fetch(
          "https://v0icht67ec.execute-api.us-east-2.amazonaws.com/notification",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.status === 401) {
          console.warn("Token expired. Logging out.");
          localStorage.removeItem("token");
          setUnreadCount(0);
          return;
        }

        const data = await res.json();
        setUnreadCount(data.unreadCount || 0);
      } catch (err) {
        console.error("Notification fetch failed", err);
      }
    };

    fetchUnreadCount();
  }, [location.pathname]);

  return (
    <>
      {/* ================= NOTIFICATION BELL ================= */}
      {localStorage.getItem("token") &&
        !authRoutes.includes(location.pathname) && (
          <div
            className="notification-bar"
            onClick={() => navigate("/notifications")}
          >
            <span className="bell">🔔</span>
            {unreadCount > 0 && (
              <span className="count">{unreadCount}</span>
            )}
          </div>
        )}

      {/* ================= ROUTES ================= */}
      <Routes>
        {/* ---------- Public Routes ---------- */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* ---------- Protected Routes ---------- */}
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
              <CartPage />
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
              />
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

        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <NotificationPage setUnreadCount={setUnreadCount} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
