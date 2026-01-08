import React from "react";
import "./WishlistPage.css";

function WishlistPage({ wishlist, setWishlist }) {

  const removeItem = (index) => {
    const updated = wishlist.filter((_, i) => i !== index);
    setWishlist(updated);
  };

  return (
    <div className="wishlist-container">
      <h2>My Wishlist</h2>

      {wishlist.length === 0 ? (
        <p>No products in wishlist</p>
      ) : (
        wishlist.map((item, index) => (
          <div className="wishlist-card" key={index}>
            <div>
              <h4>{item.name}</h4>
              <p>₹{item.price}</p>
            </div>
            <button onClick={() => removeItem(index)}>
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default WishlistPage;
