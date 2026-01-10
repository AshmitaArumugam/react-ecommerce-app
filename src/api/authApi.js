const BASE_URL = "https://ngwe3wd9hi.execute-api.us-east-2.amazonaws.com/dev";

/* ===================== SIGNUP ===================== */
export const signup = async (name, email, password) => {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email: email.toLowerCase(),
      password,
    }),
  });

  return res.json();
};

/* ===================== LOGIN ===================== */
export const login = async (email, password) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.toLowerCase(),
      password,
    }),
  });

  return res.json();
};

/* ===================== FORGOT PASSWORD (SEND OTP) ===================== */
export const sendOtp = async (email) => {
  const res = await fetch(`${BASE_URL}/forget-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.toLowerCase(),
    }),
  });

  return res.json();
};

/* ===================== VERIFY OTP ===================== */
export const verifyOtp = async (email, otp) => {
  const res = await fetch(`${BASE_URL}/verify-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.toLowerCase(),
      otp,
    }),
  });

  return res.json();
};

/* ===================== RESET PASSWORD ===================== */
export const updatePassword = async (token, newPassword) => {
  const res = await fetch(`${BASE_URL}/reset-pass`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      newPassword,
    }),
  });

  return res.json();
};
