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
      <div className="w-full max-w-md rounded-lg border border-iron bg-steel p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {["login", "signup"].map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setError(""); }}
                className={`rounded px-3 py-1 text-sm uppercase ${tab === t ? "bg-blaze text-ink" : "text-muted"}`}
              >
                {t === "login" ? "Sign in" : "Sign up"}
              </button>
            ))}
          </div>
          <button onClick={closeModal} aria-label="Close" className="text-2xl text-muted hover:text-chalk">×</button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-3">
          {tab === "signup" && (
            <input name="name" required value={form.name} onChange={update} placeholder="Full name"
              className="w-full rounded border border-iron bg-ink px-3 py-2" />
          )}
          <input name="email" type="email" required value={form.email} onChange={update} placeholder="Email"
            className="w-full rounded border border-iron bg-ink px-3 py-2" />
          <input name="password" type="password" required minLength={6} value={form.password} onChange={update}
            placeholder="Password (min 6 characters)" className="w-full rounded border border-iron bg-ink px-3 py-2" />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button disabled={submitting} className="btn w-full bg-blaze text-ink hover:bg-blaze-dark disabled:opacity-60">
            {submitting ? "Please wait…" : tab === "login" ? "Sign in" : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
}
