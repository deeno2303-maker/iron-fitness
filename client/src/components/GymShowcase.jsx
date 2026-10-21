const gymImage = `${import.meta.env.BASE_URL}images/hero-gym.jpg`;

export default function GymShowcase() {
  return (
    <section aria-label="Inside the gym" className="border-b border-iron bg-steel/50">
      <div className="mx-auto max-w-[1200px] px-4 py-10 sm:px-8 md:py-14">
        <div className="relative overflow-hidden rounded-card border border-iron shadow-xl shadow-black/20">
          <img
            src={gymImage}
            alt="The Ironhouse gym floor with strength-training equipment"
            width="1920"
            height="1080"
            loading="lazy"
            className="h-56 w-full object-cover sm:h-80 md:h-[28rem]"
          />
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/90 via-ink/10 to-transparent p-5 sm:p-8">
            <div>
              <p className="section-kicker mb-2">Your training floor</p>
              <p className="m-0 max-w-lg font-display text-2xl font-bold uppercase leading-tight sm:text-3xl">
                Room to train with focus. Coaching to keep you moving forward.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
