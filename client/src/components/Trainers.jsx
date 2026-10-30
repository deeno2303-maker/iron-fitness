import { useEffect, useState } from "react";
import { fetchTrainers } from "../api";
import { trainers as fallback } from "../data/studio";

const avatarColor = {
  Strength: "bg-strength",
  Conditioning: "bg-conditioning",
  Mobility: "bg-mobility",
};

const specialtyColor = {
  Strength: "text-strength",
  Conditioning: "text-conditioning",
  Mobility: "text-mobility",
};

const specialtyBorder = {
  Strength: "border-strength hover:shadow-md hover:shadow-strength/10",
  Conditioning: "border-conditioning hover:shadow-md hover:shadow-conditioning/10",
  Mobility: "border-mobility hover:shadow-md hover:shadow-mobility/10",
};

const trainerPortraits = {
  logan: `${import.meta.env.BASE_URL}images/logan-naidoo.jpeg`,
  mubeen: `${import.meta.env.BASE_URL}images/mubeen-wahab.jpeg`,
  aisha: `${import.meta.env.BASE_URL}images/aisha-khan.jpeg`,
};

export default function Trainers() {
  const [trainers, setTrainers] = useState([]);
  const [expandedTrainer, setExpandedTrainer] = useState(null);

  useEffect(() => {
    fetchTrainers().then(setTrainers).catch(() => setTrainers(fallback));
  }, []);

  return (
    <section id="trainers" aria-labelledby="trainers-heading" className="border-y border-iron bg-steel py-14 md:py-24">
      <div className="mx-auto max-w-[1120px] px-4 sm:px-8">
        <p className="section-kicker"><span className="h-px w-8 bg-blaze" />Good coaching changes everything</p>
        <h2 id="trainers-heading" className="section-title mb-2">Meet the coaches</h2>
        <p className="mb-8 max-w-2xl text-lg text-muted">Get practical guidance, personal attention, and support at every stage of your training.</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trainers.map((t) => {
            const expanded = expandedTrainer === t.id;
            const profileId = `trainer-profile-${t.id}`;

            return (
              <article
                key={t.id}
                className={`min-w-0 overflow-hidden rounded-card border bg-ink transition-colors duration-200 ${
                  specialtyBorder[t.type] || "border-iron hover:border-blaze/50"
                }`}
              >
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={profileId}
                  onClick={() => setExpandedTrainer(expanded ? null : t.id)}
                  className="group block w-full text-left focus-visible:outline-offset-[-4px]"
                >
                  <span className="relative block overflow-hidden bg-steel">
                    <img
                      src={trainerPortraits[t.id]}
                      alt={`${t.name}, ${t.role}`}
                      width="768"
                      height="1365"
                      loading="lazy"
                      className={`w-full object-cover object-top transition-[height] duration-300 ${
                        expanded ? "h-[26rem]" : "h-64"
                      }`}
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent" />
                    <span className="absolute bottom-4 left-5 right-5">
                      <span className="block font-display text-2xl font-bold uppercase text-chalk">
                        {t.name}
                      </span>
                      <span className={`mt-1 block text-sm font-semibold ${specialtyColor[t.type] || "text-blaze"}`}>
                        {t.role}
                      </span>
                    </span>
                  </span>
                  <span className="flex items-center justify-between gap-3 px-5 py-4 text-sm font-bold text-muted group-hover:text-chalk">
                    <span>{expanded ? "Close biography" : "View biography"}</span>
                    <span aria-hidden="true" className="text-lg text-blaze">
                      {expanded ? "−" : "+"}
                    </span>
                  </span>
                </button>
                <div id={profileId} hidden={!expanded} className="border-t border-iron px-5 py-5">
                  <p className="section-kicker mb-2">Coach profile</p>
                  <p className="m-0 leading-relaxed text-muted">{t.bio}</p>
                  <p className={`mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${specialtyColor[t.type] || "text-chalk"}`}>
                    <span aria-hidden="true" className={`h-2 w-2 rounded-full ${avatarColor[t.type] || "bg-blaze"}`} />
                    {t.type}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
