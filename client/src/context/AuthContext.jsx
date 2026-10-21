// Global sign-in state. Restores the session on page refresh via /api/auth/me
import { createContext, useContext, useEffect, useState } from "react";
import * as api from "../api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(api.TOKEN_KEY);
    if (!token) {
      setLoading(false);
      return;
    }
    api
      .fetchMe()
      .then((data) => setUser(data.user))
      .catch(() => localStorage.removeItem(api.TOKEN_KEY)) // invalid/expired token
      .finally(() => setLoading(false));
  }, []);

  function saveSession({ token, user }) {
    localStorage.setItem(api.TOKEN_KEY, token);
    setUser(user);
    setModalOpen(false);
  }

  async function login(email, password) {
    saveSession(await api.login(email, password));
  }

  async function signup(name, email, password) {
    saveSession(await api.signup(name, email, password));
  }

  function logout() {
    localStorage.removeItem(api.TOKEN_KEY);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user, loading, login, signup, logout,
        modalOpen, openModal: () => setModalOpen(true), closeModal: () => setModalOpen(false),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
