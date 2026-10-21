const trainingImage = `${import.meta.env.BASE_URL}images/training.jpg`;

export default function Hero() {
  return (
    <section id="top" className="hero-glow relative overflow-hidden border-b border-iron">
      <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-4 py-14 sm:px-8 sm:py-20 md:grid-cols-[1fr_0.95fr] md:gap-14 md:py-24">
        <div className="relative z-10">
          <p className="section-kicker">
            <span className="h-px w-8 bg-blaze" />
            Ironhouse training club
          </p>
          <h1 className="mb-5 max-w-3xl font-display text-5xl font-bold uppercase leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
            Train hard.<br />
            Get <span className="text-blaze">stronger.</span>
          </h1>
          <p className="mb-8 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
            Strength, conditioning, and mobility—coached in small groups, built around good movement,
            and open to every level.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href="#schedule" className="btn bg-blaze text-ink no-underline hover:bg-blaze-dark">
              Find your session <span aria-hidden="true" className="ml-2 text-lg">→</span>
            </a>
            <a href="#membership" className="btn border border-iron text-chalk no-underline hover:border-blaze">
              Explore memberships
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs font-bold uppercase tracking-widest text-muted">
            {["Strength", "Conditioning", "Mobility"].map((discipline) => (
              <span key={discipline} className="flex items-center gap-2">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
                {discipline}
              </span>
            ))}
          </div>
        </div>
        <figure className="relative m-0 min-w-0">
          <div aria-hidden="true" className="absolute -inset-3 rounded-[24px] border border-blaze/15 sm:-inset-4" />
          <img
            src={trainingImage}
            alt="A member preparing for a strength-training session"
            width="1200"
            height="900"
            fetchPriority="high"
            className="relative aspect-[4/3] w-full rounded-card border border-iron object-cover shadow-2xl shadow-black/40"
          />
          <figcaption className="absolute bottom-4 left-4 rounded-full border border-white/15 bg-ink/75 px-4 py-2 text-xs font-bold uppercase tracking-widest text-chalk backdrop-blur sm:bottom-6 sm:left-6">
            Coached training · Small groups
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
