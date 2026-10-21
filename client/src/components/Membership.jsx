import { useEffect, useState } from "react";
import { fetchTiers } from "../api";
import { tiers as fallback } from "../data/studio";

export default function Membership() {
  const [tiers, setTiers] = useState([]);

  useEffect(() => {
    fetchTiers().then(setTiers).catch(() => setTiers(fallback));
  }, []);

  return (
    <section id="membership" aria-labelledby="membership-heading" className="py-14 md:py-24">
      <div className="mx-auto max-w-[1120px] px-4 sm:px-8">
        <p className="section-kicker"><span className="h-px w-8 bg-blaze" />Make training a habit</p>
        <h2 id="membership-heading" className="section-title mb-2">Membership options</h2>
        <p className="mb-10 max-w-2xl text-lg text-muted">Straightforward options to find the level of training that works for you.</p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {tiers.map((tier) => (
            <article
              key={tier.id}
              className={`card-hover relative flex min-w-0 flex-col rounded-card border bg-steel p-6 ${
                tier.featured ? "border-blaze md:-translate-y-2" : "border-iron"
              }`}
            >
              {tier.featured && (
                <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-0.5 text-xs font-bold uppercase text-ink">
                  Most popular
                </span>
              )}
              <h3 className="mb-2 font-display text-2xl font-bold uppercase">{tier.name}</h3>
              <p className="mb-4 text-4xl font-extrabold">
                {tier.price}
                <span className="text-base font-normal text-muted"> /month</span>
              </p>
              <ul className="mb-6 flex-1 space-y-2 pl-5 text-muted">
                {tier.perks.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`rounded-full px-6 py-3 text-center font-bold no-underline transition-colors ${
                  tier.featured
                    ? "bg-blaze text-ink hover:bg-blaze-dark"
                    : "border border-iron text-chalk hover:border-blaze"
                }`}
              >
                Choose {tier.name}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
