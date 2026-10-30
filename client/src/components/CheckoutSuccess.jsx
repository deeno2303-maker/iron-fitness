import { useEffect, useState } from "react";
import { fetchOrderBySession } from "../api";
import { useAuth } from "../context/AuthContext";

const sessionId = new URLSearchParams(window.location.search).get("session_id");

export default function CheckoutSuccess() {
  const { user, loading, openModal } = useAuth();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (loading || !user || !sessionId) return undefined;

    let cancelled = false;
    async function checkOrder() {
      for (let attempt = 0; attempt < 8; attempt += 1) {
        try {
          const result = await fetchOrderBySession(sessionId);
          if (cancelled) return;
          setOrder(result.order);
          if (result.order.status === "paid") {
            setChecking(false);
            return;
          }
        } catch (err) {
          if (cancelled) return;
          setError(err.message);
          setChecking(false);
          return;
        }

        await new Promise((resolve) => setTimeout(resolve, 1500));
        if (cancelled) return;
      }
      if (!cancelled) setChecking(false);
    }

    checkOrder();
    return () => {
      cancelled = true;
    };
  }, [loading, user]);

  const homeUrl = import.meta.env.BASE_URL;

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <section className="w-full max-w-xl rounded-card border border-iron bg-steel p-8 text-center">
        <p className="section-kicker justify-center">Ironhouse Fitness</p>
        <h1 className="section-title mb-4">
          {order?.status === "paid" ? "Payment confirmed" : "Checkout complete"}
        </h1>
        {loading ? (
          <p className="text-muted">Restoring your sign-in…</p>
        ) : !user ? (
          <>
            <p className="text-muted">Sign in with the account used to start checkout to look up your order.</p>
            <button type="button" onClick={openModal} className="btn mt-4 bg-blaze text-ink hover:bg-blaze-dark">
              Sign in
            </button>
          </>
        ) : !sessionId ? (
          <p role="alert" className="text-red-400">The checkout session reference is missing. Please contact Ironhouse for help.</p>
        ) : error ? (
          <p role="alert" className="text-red-400">We could not check your order: {error}</p>
        ) : order?.status === "paid" ? (
          <>
            <p className="text-muted">Your {order.productName} is active. A receipt will be sent by Stripe.</p>
            <p className="mt-4 font-bold text-chalk">
              Order #{order.id} · {new Intl.NumberFormat("en-ZA", {
                style: "currency",
                currency: order.currency.toUpperCase(),
              }).format(order.totalAmount / 100)} per month
            </p>
          </>
        ) : (
          <p role="status" aria-live="polite" className="text-muted">
            {checking
              ? "Payment received by Checkout. Waiting for the payment confirmation webhook…"
              : "Your order is still awaiting payment confirmation. Refresh this page in a moment; it will only show as paid after Stripe confirms it."}
          </p>
        )}
        <a href={homeUrl} className="mt-8 inline-block text-blaze underline">
          Return to Ironhouse
        </a>
        <p className="mt-6 text-xs text-muted">Order status is confirmed by Stripe’s signed webhook.</p>
      </section>
    </main>
  );
}
