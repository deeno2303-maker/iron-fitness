// All calls to the Express API live here.
// In production VITE_API_URL = Railway URL. Locally it's empty and Vite proxies /api.
const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
export const TOKEN_KEY = "ironhouse_token";

async function request(path, options = {}) {
  const token = localStorage.getItem(TOKEN_KEY);
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
  return data;
}

export const fetchClasses = (type) =>
  request(`/api/classes${type && type !== "All" ? `?type=${encodeURIComponent(type)}` : ""}`);
export const fetchTrainers = () => request("/api/trainers");
export const fetchTiers = () => request("/api/tiers");

export const signup = (name, email, password) =>
  request("/api/auth/signup", { method: "POST", body: JSON.stringify({ name, email, password }) });
export const login = (email, password) =>
  request("/api/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
export const fetchMe = () => request("/api/auth/me");

export const fetchInterests = () => request("/api/interests");
export const toggleInterest = (classId) =>
  request("/api/interests/toggle", { method: "POST", body: JSON.stringify({ classId }) });

export const submitTrialRequest = (formData) =>
  request("/api/trial-requests", { method: "POST", body: JSON.stringify(formData) });
