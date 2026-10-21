import { useEffect, useState } from "react";
import { fetchTrainers } from "../api";
import { trainers as fallback } from "../data/studio";

const avatarColor = {
  Strength: "bg-strength",
  Conditioning: "bg-conditioning",
  Mobility: "bg-mobility",
};

export default function Trainers() {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    fetchTrainers().then(setTrainers).catch(() => setTrainers(fallback));
  }, []);

  return (
    <section id="trainers" aria-labelledby="trainers-heading" className="border-y border-iron bg-steel py-14 md:py-24">
      <div className="mx-auto max-w-[1120px] px-4 sm:px-8">
        <h2 id="trainers-heading" className="section-title mb-2">Meet the coaches</h2>
        <p className="mb-8 text-muted">Experienced coaches, personal guidance, and a supportive community.</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trainers.map((t) => (
            <article key={t.id} className="min-w-0 rounded-card border border-iron bg-ink p-6">
              <div aria-hidden="true" className={`mb-4 grid h-14 w-14 place-items-center rounded-full font-extrabold text-ink ${avatarColor[t.type] || "bg-blaze"}`}>
                {t.initials}
              </div>
              <h3 className="mb-1 text-xl font-bold">{t.name}</h3>
              <p className="mb-3 text-sm font-semibold text-blaze">{t.role}</p>
              <p className="m-0 text-muted">{t.bio}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
