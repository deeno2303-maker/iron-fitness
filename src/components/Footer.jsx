import { navLinks } from "../data/studio";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-3 px-4 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="m-0">© 2026 Ironhouse Fitness Studio</p>
        <ul className="m-0 flex list-none gap-5 p-0">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-muted no-underline hover:text-text">{link.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
