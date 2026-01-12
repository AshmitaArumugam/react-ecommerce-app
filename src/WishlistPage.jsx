import React, { useEffect } from "react";
import "./WishlistPage.css";
import { getWishlist, removeFromWishlist } from "./api/wishlistApi";

function WishlistPage({ wishlist, setWishlist }) {
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        // ✅ Backend already returns full product data
        const data = await getWishlist(token);

        // Expected:
        // data.items = [{ id, name, price }]
        setWishlist(data.items || []);
      } catch (err) {
        console.error("Fetch wishlist failed:", err);
      }
    };

    fetchWishlist();
  }, [token, setWishlist]);

  const removeItem = async (productId) => {
    try {
      await removeFromWishlist(productId, token);

      setWishlist((prev) =>
        prev.filter((item) => item.id !== productId)
      );
    } catch (err) {
      console.error("Remove wishlist failed:", err);
    }
  };

  return (
    <div className="wishlist-container">
      <h2>My Wishlist</h2>

      {wishlist.length === 0 && <p>No items in wishlist</p>}

      {wishlist.map((item) => (
        <div className="wishlist-card" key={item.id}>
          <div>
            <h4>{item.name}</h4>
            <p>₹{item.price}</p>
          </div>

          <button onClick={() => removeItem(item.id)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default WishlistPage;
