"use client";
export function validateApiKey(req, res, next) {
  const apiKey = req.headers["x-api-key"];
  if (!apiKey) return res.status(401).json({ error: "API key required" });

  const isValid = checkApiKeyInDatabase(apiKey);
  if (!isValid) return res.status(403).json({ error: "Invalid API key" });

  next();
}

export function checkApiKeyInDatabase(apiKey) {
  // Replace with your database lookup
  const validKeys = ["ABC123", "XYZ789"];
  return validKeys.includes(apiKey);
}
