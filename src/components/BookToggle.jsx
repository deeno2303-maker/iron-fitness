// Controlled component: parent owns `value`, we just report changes via onChange.
export default function BookToggle({ value, onChange }) {
  return (
    <button
      type="button"
      aria-pressed={value}
      onClick={() => onChange(!value)}
      className={
        "w-full rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors " +
        (value
          ? "border-primary bg-primary text-on-primary"
          : "border-line bg-transparent text-text hover:border-primary")
      }
    >
      {value ? "✓ Booked" : "Book spot"}
    </button>
  );
}
