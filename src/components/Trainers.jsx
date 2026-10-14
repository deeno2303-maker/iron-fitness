import { trainers } from "../data/studio";

const avatarColor = {
  Strength: "bg-strength",
  Conditioning: "bg-conditioning",
  Mobility: "bg-mobility",
};

function TrainerCard({ trainer }) {
  return (
    <article className="min-w-0 rounded-card border border-line bg-bg p-6">
      <div aria-hidden="true" className={"mb-4 grid h-14 w-14 place-items-center rounded-full font-extrabold text-on-primary " + avatarColor[trainer.type]}>
        {trainer.initials}
      </div>
      <h3 className="mb-1 text-xl font-bold">{trainer.name}</h3>
      <p className="mb-3 text-sm font-semibold text-primary">{trainer.role}</p>
      <p className="m-0 text-muted">{trainer.bio}</p>
    </article>
  );
}

export default function Trainers() {
  return (
    <section id="trainers" aria-labelledby="trainers-heading" className="border-y border-line bg-surface py-14 md:py-24">
      <div className="mx-auto max-w-[1120px] px-4 sm:px-8">
        <h2 id="trainers-heading" className="mb-2 text-3xl font-extrabold md:text-4xl">Meet the trainers</h2>
        <p className="mb-8 text-muted">Four coaches, one standard: Technique First.</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trainers.map((t) => <TrainerCard key={t.id} trainer={t} />)}
        </div>
      </div>
    </section>
  );
}
