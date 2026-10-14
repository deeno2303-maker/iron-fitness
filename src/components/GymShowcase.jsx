import gymImg from "../assets/hero-gym.jpg";

// Full-width strip with a photo of the gym floor.
export default function GymShowcase() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-[1120px] px-4 py-10 sm:px-8">
        <div className="relative overflow-hidden rounded-[var(--radius-card)] border border-line">
          <img
            src={gymImg}
            alt="The Ironhouse floor at night — racks, benches and dumbbells under blue light"
            width={1920}
            height={1080}
            loading="lazy"
            className="h-56 w-full object-cover sm:h-80 md:h-96"
          />
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-bg/90 via-transparent to-transparent p-6 sm:p-8">
            <p className="max-w-md text-lg font-bold sm:text-xl">
              Racks, benches and dumbbells — open gym 7 days a week.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
