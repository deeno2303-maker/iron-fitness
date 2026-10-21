const gymImage = "/images/hero-gym.jpg";

export default function GymShowcase() {
  return (
    <section className="border-b border-iron">
      <div className="mx-auto max-w-[1120px] px-4 py-10 sm:px-8">
        <div className="relative overflow-hidden rounded-card border border-iron">
          <img
            src={gymImage}
            alt="The Ironhouse gym floor with strength-training equipment"
            width="1920"
            height="1080"
            loading="lazy"
            className="h-56 w-full object-cover sm:h-80 md:h-96"
          />
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/90 via-transparent to-transparent p-6 sm:p-8">
            <p className="max-w-md text-lg font-bold sm:text-xl">
              A welcoming space to build strength, move well, and keep showing up.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
