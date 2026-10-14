import { navLinks } from "../data/studio";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur">
      <a href="#main" className="absolute -left-[9999px] top-0 bg-primary px-4 py-2 text-on-primary focus:left-0">
        Skip to main content
      </a>
      <nav className="mx-auto flex max-w-[1120px] items-center justify-between gap-3 px-4 py-3 sm:px-8" aria-label="Main navigation">
        <a href="#top" className="shrink-0 text-lg font-extrabold tracking-widest text-text no-underline">
          IRON<span className="text-primary">HOUSE</span>
        </a>
        <ul className="m-0 flex min-w-0 list-none items-center gap-3 p-0 text-sm sm:gap-6">
          {navLinks.map((link) => (
            <li key={link.href} className="hidden md:block">
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
