export default function Footer() {
  return (
    <footer className="border-t border-iron">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-5 px-4 py-6 text-sm text-muted sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-1 font-bold text-chalk">Visit Ironhouse</p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=34+Essex+Terrace%2C+Westville"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted underline decoration-blaze/60 underline-offset-4 hover:text-chalk"
            >
              34 Essex Terrace, Westville
              <span className="sr-only"> (opens in Google Maps)</span>
            </a>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=34+Essex+Terrace%2C+Westville"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 inline-block rounded-full border border-iron px-3 py-1 text-xs font-bold text-chalk no-underline hover:border-blaze"
            >
              Get directions
              <span className="sr-only"> (opens in Google Maps)</span>
            </a>
            <p className="mb-0 mt-2">
              <a
                href="mailto:slowmoe.7860@gmail.com"
                className="text-muted underline decoration-blaze/60 underline-offset-4 hover:text-chalk"
              >
                slowmoe.7860@gmail.com
              </a>
            </p>
            <p className="mb-0 mt-1">
              <span className="text-muted">Moinuddeen: </span>
              <a
                href="tel:+27680199935"
                className="text-muted underline decoration-blaze/60 underline-offset-4 hover:text-chalk"
              >
                068 0199935
              </a>
            </p>
          </div>
          <nav aria-label="Footer navigation">
            <ul className="m-0 flex list-none gap-5 p-0">
              {[
                ["Schedule", "#schedule"],
                ["Trainers", "#trainers"],
                ["Membership", "#membership"],
              ].map(([label, href]) => (
                <li key={href}>
                  <a href={href} className="text-muted no-underline hover:text-chalk">{label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <p className="m-0 border-t border-iron pt-4">
          © {new Date().getFullYear()} Ironhouse Fitness Studio
        </p>
      </div>
    </footer>
  );
}
