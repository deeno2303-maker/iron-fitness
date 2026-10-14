import { navLinks } from "../data/studio";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur">
      <a
        href="#main"
        className="absolute left-0 top-0 z-[60] -translate-y-full bg-primary px-4 py-2 text-on-primary focus:translate-y-0"
      >
        Skip to main content
      </a>
      <nav
        className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-x-3 gap-y-2 px-4 py-3 sm:px-8 md:flex-nowrap"
        aria-label="Main navigation"
      >
        <a href="#top" className="shrink-0 text-lg font-extrabold tracking-widest text-text no-underline">
          IRON<span className="text-primary">HOUSE</span>
        </a>
        <ul className="order-3 m-0 flex w-full min-w-0 list-none items-center justify-between gap-2 p-0 text-xs sm:text-sm md:order-none md:w-auto md:gap-4 lg:gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-muted no-underline hover:text-text">{link.label}</a>
            </li>
          ))}
          <li>
            <a href="#contact" className="rounded-full bg-primary px-4 py-2 font-semibold text-on-primary no-underline hover:bg-primary-dark">
              Join now
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
