import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const links = [
  ["Schedule", "#schedule"],
  ["Coaches", "#trainers"],
  ["Membership", "#membership"],
  ["Contact", "#contact"],
];

export default function Header() {
  const { user, loading, logout, openModal } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-iron bg-ink/90 backdrop-blur">
      <a
        href="#main"
        className="absolute left-0 top-0 z-[60] -translate-y-full bg-blaze px-4 py-2 text-ink focus:translate-y-0"
      >
        Skip to main content
      </a>
      <nav
        className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-x-3 gap-y-2 px-4 py-3 sm:px-8 md:flex-nowrap"
        aria-label="Main navigation"
      >
        <a href="#top" className="shrink-0 text-lg font-extrabold tracking-widest text-chalk no-underline">
          IRON<span className="text-blaze">HOUSE</span>
        </a>
        <ul className={`${menuOpen ? "flex" : "hidden"} order-3 m-0 w-full list-none items-center justify-between gap-2 p-0 text-xs sm:text-sm md:order-none md:flex md:w-auto md:gap-4 lg:gap-6`}>
          {links.map(([label, href]) => (
            <li key={href}>
              <a
                href={href}
                onClick={() => setMenuOpen(false)}
                className="text-muted no-underline hover:text-chalk"
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            {user ? (
              <a
                href="#membership"
                onClick={() => setMenuOpen(false)}
                className="rounded-full bg-blaze px-4 py-2 font-semibold text-ink no-underline hover:bg-blaze-dark"
              >
                Memberships
              </a>
            ) : (
              <button
                type="button"
                onClick={() => { setMenuOpen(false); openModal(); }}
                className="rounded-full bg-blaze px-4 py-2 font-semibold text-ink hover:bg-blaze-dark"
              >
                Sign in / Join
              </button>
            )}
          </li>
        </ul>
        <div className="flex items-center gap-3">
          {loading ? (
            <span className="text-sm text-muted">…</span>
          ) : user ? (
            <>
              <span className="hidden text-sm sm:inline">Hi, {user.name.split(" ")[0]}</span>
              <button onClick={logout} className="btn border border-iron hover:border-blaze">
                Sign out
              </button>
            </>
          ) : null}
          <button
            className="text-2xl md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? "×" : "☰"}
          </button>
        </div>
      </nav>
    </header>
  );
}
