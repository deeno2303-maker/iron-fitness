export default function Footer() {
  return (
    <footer className="border-t border-iron">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-3 px-4 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="m-0">© {new Date().getFullYear()} Ironhouse Fitness Studio</p>
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
    </footer>
  );
}
