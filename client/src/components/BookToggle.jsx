// Controlled toggle: parent owns the "interested" state
export default function BookToggle({ active, onToggle, disabled }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      aria-pressed={active}
      className={`w-full rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors disabled:opacity-50 ${
        active ? "border-blaze bg-blaze text-ink" : "border-iron bg-transparent text-chalk hover:border-blaze"
      }`}
    >
      {active ? "✓ Interested" : "I'm interested"}
    </button>
  );
}
