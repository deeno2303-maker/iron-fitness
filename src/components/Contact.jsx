export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="border-t border-line bg-surface py-14 md:py-24">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-8">
        <h2 id="contact-heading" className="mb-2 text-3xl font-extrabold md:text-4xl">Come try a class</h2>
        <p className="text-muted">First week is free.</p>
        <p className="mb-8 text-muted">
          Located:{" "}
          <a className="text-primary" href="https://maps.google.com/?q=34+Essex+Terrace,+Westville,+Durban" target="_blank" rel="noopener noreferrer">
            34 Essex Terrace, Westville, Durban
          </a>
        </p>
        <a
          href="mailto:slowmoe.7860@gmail.com?subject=Free%20Week%20Trial%20Booking"
          className="inline-block rounded-full bg-primary px-6 py-3 font-semibold text-on-primary no-underline hover:bg-primary-dark"
        >
          Book your free week
        </a>
      </div>
    </section>
  );
}
