// Controlled component: parent owns `value`, we just report changes via onChange.
export default function BookToggle({ value, onChange, label }) {
  return (
    <button
      type="button"
      aria-pressed={value}
      aria-label={`${value ? "Remove interest in" : "Mark interest in"} ${label}`}
      onClick={() => onChange(!value)}
      className={
        "w-full rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors " +
        (value
          ? "border-primary bg-primary text-on-primary"
          : "border-line bg-transparent text-text hover:border-primary")
      }
    >
      {value ? "✓ Interested" : "I'm interested"}
    </button>
  );
}
