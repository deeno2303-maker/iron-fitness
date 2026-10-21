import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function AuthModal() {
  const { modalOpen, closeModal, login, signup } = useAuth();
  const [tab, setTab] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!modalOpen) return null;

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      if (tab === "login") await login(form.email, form.password);
      else await signup(form.name, form.email, form.password);
      setForm({ name: "", email: "", password: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 px-4" onClick={closeModal}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        className="w-full max-w-md rounded-lg border border-iron bg-steel p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {["login", "signup"].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => { setTab(t); setError(""); }}
                className={`rounded px-3 py-1 text-sm uppercase ${tab === t ? "bg-blaze text-ink" : "text-muted"}`}
              >
                {t === "login" ? "Sign in" : "Sign up"}
              </button>
            ))}
          </div>
          <button type="button" onClick={closeModal} aria-label="Close sign-in dialog" className="text-2xl text-muted hover:text-chalk">×</button>
        </div>
        <h2 id="auth-modal-title" className="sr-only">{tab === "login" ? "Sign in to Ironhouse" : "Create an Ironhouse account"}</h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-3">
          {tab === "signup" && (
            <div>
              <label htmlFor="auth-name" className="mb-1 block text-sm font-semibold">Full name</label>
              <input id="auth-name" name="name" autoComplete="name" required value={form.name} onChange={update}
                className="w-full rounded border border-iron bg-ink px-3 py-2 text-chalk focus-visible:outline focus-visible:outline-2 focus-visible:outline-blaze focus-visible:outline-offset-2" />
            </div>
          )}
          <div>
            <label htmlFor="auth-email" className="mb-1 block text-sm font-semibold">Email address</label>
            <input id="auth-email" name="email" type="email" autoComplete="email" required value={form.email} onChange={update}
              className="w-full rounded border border-iron bg-ink px-3 py-2 text-chalk focus-visible:outline focus-visible:outline-2 focus-visible:outline-blaze focus-visible:outline-offset-2" />
          </div>
          <div>
            <label htmlFor="auth-password" className="mb-1 block text-sm font-semibold">Password</label>
            <input id="auth-password" name="password" type="password" autoComplete={tab === "login" ? "current-password" : "new-password"}
              required minLength={6} value={form.password} onChange={update}
              aria-describedby={tab === "signup" ? "auth-password-help" : undefined}
              className="w-full rounded border border-iron bg-ink px-3 py-2 text-chalk focus-visible:outline focus-visible:outline-2 focus-visible:outline-blaze focus-visible:outline-offset-2" />
            {tab === "signup" && <p id="auth-password-help" className="mt-1 text-xs text-muted">Use at least 6 characters.</p>}
          </div>
          {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
          <button disabled={submitting} className="btn w-full bg-blaze text-ink hover:bg-blaze-dark disabled:opacity-60">
            {submitting ? "Please wait…" : tab === "login" ? "Sign in" : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
}
