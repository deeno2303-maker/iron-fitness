import BookToggle from "./BookToggle";

const typeColor = {
  Strength: "border-l-strength text-strength",
  Conditioning: "border-l-conditioning text-conditioning",
  Mobility: "border-l-mobility text-mobility",
};

export default function ClassCard({ item, interested, onToggle }) {
  return (
    <article className={"flex min-w-0 flex-col gap-3 rounded-card border border-l-4 border-line bg-surface p-4 " + typeColor[item.type]}>
      <div className="flex items-baseline justify-between gap-2">
        <p className="m-0 text-xs font-bold uppercase tracking-widest">{item.type}</p>
        <p className="m-0 shrink-0 text-sm text-muted">{item.day} · {item.time}</p>
      </div>
      <h3 className="m-0 truncate text-lg font-bold text-text">{item.name}</h3>
      <BookToggle
        value={interested}
        onChange={onToggle}
        label={`${item.name}, ${item.day} at ${item.time}`}
      />
    </article>
  );
}
