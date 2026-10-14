import trainingImg from "../assets/training.jpg";

export default function Hero() {
  return (
    <section id="top" className="hero-glow border-b border-line">
      <div className="mx-auto grid max-w-[1120px] items-center gap-10 px-4 py-16 sm:px-8 md:grid-cols-[1.1fr_1fr] md:py-24">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-accent">
            Est. 2026 · Durban
          </p>
          <h1 className="mb-4 max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            Train hard. Recover harder.
          </h1>
          <p className="mb-8 max-w-xl text-base text-muted sm:text-lg">
            Strength, conditioning and mobility classes led by coaches who actually teach you how to
            gain results. Small groups, big results, zero ego.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="#membership"
              className="rounded-full bg-primary px-6 py-3 text-center font-semibold text-on-primary no-underline hover:bg-primary-dark"
            >
              View memberships
            </a>
            <a
              href="#schedule"
              className="rounded-full border border-line px-6 py-3 text-center font-semibold text-text no-underline hover:border-primary"
            >
              Weekly classes
            </a>
          </div>
        </div>
        <img
          src={trainingImg}
          alt="A lifter setting up for a deadlift on the Ironhouse floor"
          width={1200}
          height={900}
          className="min-w-0 rounded-[var(--radius-card)] border border-line object-cover shadow-lg"
        />
      </div>
    </section>
  );
}
