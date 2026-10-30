import BookToggle from "./BookToggle";

const typeColor = {
  Strength: {
    border: "border-l-strength",
    badge: "bg-strength/10 text-strength",
    dot: "bg-strength",
  },
  Conditioning: {
    border: "border-l-conditioning",
    badge: "bg-conditioning/10 text-conditioning",
    dot: "bg-conditioning",
  },
  Mobility: {
    border: "border-l-mobility",
    badge: "bg-mobility/10 text-mobility",
    dot: "bg-mobility",
  },
};

export default function ClassCard({ item, interested, onToggle, busy }) {
  const colors = typeColor[item.type];

  return (
    <article className={`flex min-w-0 flex-col gap-3 rounded-card border border-l-4 border-iron bg-steel p-4 transition-colors duration-200 hover:bg-steel/80 ${colors?.border || ""}`}>
      <div className="flex items-baseline justify-between gap-2">
        <p className={`m-0 inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-widest ${colors?.badge || "bg-iron text-muted"}`}>
          <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${colors?.dot || "bg-muted"}`} />
          {item.type}
        </p>
        <p className="m-0 shrink-0 text-sm text-muted">{item.day} · {item.time}</p>
      </div>
      <h3 className="m-0 truncate text-lg font-bold text-chalk">{item.name}</h3>
      <BookToggle active={interested} onToggle={onToggle} disabled={busy} />
    </article>
  );
}
