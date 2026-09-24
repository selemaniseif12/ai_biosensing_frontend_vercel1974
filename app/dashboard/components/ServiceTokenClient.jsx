// app/dashboard/ServiceTokenClient.jsx
// Shared token utilities for ML and Virus services

export function getStoredToken(serviceName) {
  try {
    return localStorage.getItem(`token_${serviceName}`);
  } catch (err) {
    console.error("Error reading stored token:", err);
    return null;
  }
}

export async function validateToken(serviceName) {
  try {
    const token = getStoredToken(serviceName);
    if (!token) return false;

    const response = await fetch(
      `http://127.0.0.1:8000/services/validate-token/${serviceName}?token=${token}`
    );

    if (!response.ok) return false;

    const data = await response.json();
    return data.valid === true;
  } catch (err) {
    console.error("Error validating token:", err);
    return false;
  }
}

export async function issueToken(serviceName, userId) {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/services/issue-token/${serviceName}?user_id=${userId}`,
      { method: "POST" }
    );

    if (!response.ok) {
      console.error("Failed to issue token:", response.status);
      return null;
    }

    const data = await response.json();
    const token = data.token;

    try {
      localStorage.setItem(`token_${serviceName}`, token);
    } catch (err) {
      console.error("Error storing token:", err);
    }

    return token;
  } catch (err) {
    console.error("Error issuing token:", err);
    return null;
  }
}
