import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Contact() {
  const { user } = useAuth();
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section id="contact" aria-labelledby="contact-heading" className="border-t border-iron bg-steel py-14 md:py-24">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-8">
        <h2 id="contact-heading" className="section-title mb-2">Come try a class</h2>
        <p className="text-muted">Your first class is on us.</p>
        <p className="mb-8 text-muted">
          Visit us at 12 Foundry Lane, Woodstock, Cape Town, or send us a trial request.
        </p>
        {sent ? (
          <div role="status" className="rounded-card border border-ok/40 bg-ok/10 p-6">
            <h3 className="text-xl font-bold">You’re on the list</h3>
            <p className="mb-0 text-muted">Thanks for your interest. We’ll be in touch to confirm your trial.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-3 rounded-card border border-iron bg-ink p-6 text-left">
            <label className="block text-sm font-semibold" htmlFor="trial-name">Full name</label>
            <input id="trial-name" required defaultValue={user?.name || ""} placeholder="Your name"
              className="w-full rounded-lg border border-iron bg-steel px-3 py-2 text-chalk" />
            <label className="block text-sm font-semibold" htmlFor="trial-email">Email address</label>
            <input id="trial-email" required type="email" defaultValue={user?.email || ""} placeholder="you@example.com"
              className="w-full rounded-lg border border-iron bg-steel px-3 py-2 text-chalk" />
            <button className="btn w-full bg-blaze text-ink hover:bg-blaze-dark">Request a free trial</button>
          </form>
        )}
      </div>
    </section>
  );
}
