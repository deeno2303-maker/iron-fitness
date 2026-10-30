export default function CheckoutCancelled() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <section className="w-full max-w-xl rounded-card border border-iron bg-steel p-8 text-center">
        <p className="section-kicker justify-center">Ironhouse Fitness</p>
        <h1 className="section-title mb-4">Checkout cancelled</h1>
        <p className="text-muted">No payment was confirmed. You can return to membership options and try again whenever you’re ready.</p>
        <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a href={`${import.meta.env.BASE_URL}#membership`} className="btn bg-blaze text-ink no-underline hover:bg-blaze-dark">
            Back to memberships
          </a>
          <a href={import.meta.env.BASE_URL} className="text-blaze underline underline-offset-4">
            Return to home
          </a>
        </div>
      </section>
    </main>
  );
}
