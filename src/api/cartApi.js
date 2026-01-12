const CART_URL =
  "https://1zsm8uqpvk.execute-api.us-east-2.amazonaws.com/cart";

/* ========== GET CART ========== */
export const getCart = async (token) => {
  const res = await fetch(CART_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch cart");
  return res.json();
};

/* ========== ADD TO CART ========== */
export const addToCartApi = async (productId, token) => {
  const res = await fetch(CART_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ productId }),
  });

  if (!res.ok) throw new Error("Failed to add to cart");
  return res.json();
};

/* ========== REMOVE FROM CART ========== */
export const removeFromCart = async (productId, token) => {
  const res = await fetch(CART_URL, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ productId }),
  });

  if (!res.ok) throw new Error("Failed to remove from cart");
  return res.json();
};
