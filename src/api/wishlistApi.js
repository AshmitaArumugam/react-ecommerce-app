const BASE_URL =
  "https://gfs1lyg99k.execute-api.us-east-2.amazonaws.com/wishlist";

/* ========== GET WISHLIST ========== */
export const getWishlist = async (token) => {
  if (!token) throw new Error("No token");

  const res = await fetch(BASE_URL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    throw new Error("Unauthorized");
  }

  return res.json();
};

/* ========== ADD TO WISHLIST ========== */
export const addToWishlist = async (productId, token) => {
  if (!token) throw new Error("No token");

  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ productId }),
  });

  if (res.status === 401) {
    throw new Error("Unauthorized");
  }

  return res.json();
};

/* ========== REMOVE FROM WISHLIST ========== */
export const removeFromWishlist = async (productId, token) => {
  if (!token) throw new Error("No token");

  const res = await fetch(BASE_URL, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ productId }),
  });

  if (res.status === 401) {
    throw new Error("Unauthorized");
  }

  return res.json();
};
