const highlights = [
  {
    label: "Coached small groups",
    detail: "Get guidance while training alongside others.",
    color: "bg-blaze",
    border: "border-blaze/50 hover:border-blaze",
  },
  {
    label: "Three ways to train",
    detail: "Strength, conditioning, and mobility sessions.",
    color: "bg-accent",
    border: "border-conditioning/50 hover:border-conditioning",
  },
  {
    label: "Open to every level",
    detail: "Find a session that fits where you are.",
    color: "bg-mobility",
    border: "border-mobility/50 hover:border-mobility",
  },
];

export default function WhatToExpect() {
  return (
    <section aria-labelledby="what-to-expect-heading" className="border-b border-iron bg-steel/50">
      <div className="mx-auto max-w-[1200px] px-4 py-10 sm:px-8 md:py-12">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="section-kicker mb-2">Your first step</p>
            <h2 id="what-to-expect-heading" className="m-0 font-display text-2xl font-bold uppercase sm:text-3xl">
              What to expect
            </h2>
          </div>
          <span aria-hidden="true" className="hidden h-px flex-1 bg-iron sm:block" />
        </div>
        <ul className="m-0 grid list-none gap-3 p-0 md:grid-cols-3">
          {highlights.map((highlight, index) => (
            <li
              key={highlight.label}
              className={`flex items-start gap-4 rounded-card border bg-ink/70 p-5 transition-colors duration-200 ${highlight.border}`}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-iron bg-steel font-display text-sm font-bold text-chalk">
                <span aria-hidden="true" className={`mr-1.5 h-2 w-2 rounded-full ${highlight.color}`} />
                0{index + 1}
              </span>
              <div>
                <h3 className="mb-1 font-bold text-chalk">{highlight.label}</h3>
                <p className="m-0 text-sm leading-relaxed text-muted">{highlight.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
