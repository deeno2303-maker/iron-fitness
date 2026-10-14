import { tiers } from "../data/studio";

function PriceCard({ tier }) {
  return (
    <article className={"relative flex min-w-0 flex-col rounded-card border bg-surface p-6 " + (tier.featured ? "border-primary md:-translate-y-2" : "border-line")}>
      {tier.featured && (
        <p className="absolute -top-3 left-6 m-0 rounded-full bg-accent px-3 py-0.5 text-xs font-bold uppercase text-on-primary">
          Most popular
        </p>
      )}
      <h3 className="mb-2 text-xl font-bold">{tier.name}</h3>
      <p className="mb-4 text-4xl font-extrabold">
        {tier.price}<span className="text-base font-normal text-muted">/mo</span>
      </p>
      <ul className="mb-6 flex-1 space-y-2 pl-5 text-muted">
        {tier.perks.map((perk) => <li key={perk}>{perk}</li>)}
      </ul>
      <a
        href="#contact"
        className={"rounded-full px-6 py-3 text-center font-semibold no-underline " + (tier.featured ? "bg-primary text-on-primary hover:bg-primary-dark" : "border border-line text-text hover:border-primary")}
      >
        Choose {tier.name.toLowerCase()}
      </a>
    </article>
  );
}

export default function Membership() {
  return (
    <section id="membership" aria-labelledby="membership-heading" className="py-14 md:py-24">
      <div className="mx-auto max-w-[1120px] px-4 sm:px-8">
        <h2 id="membership-heading" className="mb-2 text-3xl font-extrabold md:text-4xl">Membership tiers</h2>
        <p className="mb-10 text-muted">No contracts. Cancel anytime given it is 1 month in advance.</p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {tiers.map((t) => <PriceCard key={t.id} tier={t} />)}
        </div>
      </div>
    </section>
  );
}
