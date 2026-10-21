const trainingImage = "/images/training.jpg";

export default function Hero() {
  return (
    <section id="top" className="hero-glow border-b border-iron">
      <div className="mx-auto grid max-w-[1120px] items-center gap-10 px-4 py-16 sm:px-8 md:grid-cols-[1.1fr_1fr] md:py-24">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-accent">
            Strength · Conditioning · Mobility
          </p>
          <h1 className="mb-4 max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            Train hard. Get stronger.
          </h1>
          <p className="mb-8 max-w-xl text-base text-muted sm:text-lg">
            Small-group coaching, thoughtful programming, and a welcoming room for every level.
            Start with a free trial class.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href="#membership" className="rounded-full bg-blaze px-6 py-3 text-center font-semibold text-ink no-underline hover:bg-blaze-dark">
              Explore memberships
            </a>
            <a href="#schedule" className="rounded-full border border-iron px-6 py-3 text-center font-semibold text-chalk no-underline hover:border-blaze">
              View the schedule
            </a>
          </div>
        </div>
        <img
          src={trainingImage}
          alt="A member preparing for a strength-training session"
          width="1200"
          height="900"
          fetchPriority="high"
          className="min-w-0 rounded-card border border-iron object-cover shadow-lg"
        />
      </div>
    </section>
  );
}
