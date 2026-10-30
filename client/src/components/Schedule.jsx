import { useEffect, useState } from "react";
import ClassCard from "./ClassCard";
import { fetchClasses, fetchInterests, toggleInterest } from "../api";
import { useAuth } from "../context/AuthContext";
import { CLASS_TYPES, classes as fallbackClasses } from "../data/studio";

export default function Schedule() {
  const { user, openModal } = useAuth();
  const [filter, setFilter] = useState("All");
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [interests, setInterests] = useState([]);
  const [busyId, setBusyId] = useState(null);
  const [error, setError] = useState("");

  // Load classes from the API (re-runs when filter changes)
  useEffect(() => {
    setLoading(true);
    fetchClasses(filter)
      .then((rows) => {
        setClasses(rows);
      })
      .catch(() => {
        setClasses(filter === "All" ? fallbackClasses : fallbackClasses.filter((c) => c.type === filter));
      })
      .finally(() => setLoading(false));
  }, [filter]);

  // Load this member's saved classes whenever sign-in state changes
  useEffect(() => {
    if (!user) {
      setInterests([]);
      return;
    }
    fetchInterests().then(setInterests).catch(() => setInterests([]));
  }, [user]);

  async function handleToggle(classId) {
    if (!user) return openModal();
    setBusyId(classId);
    setError("");
    try {
      const { interested } = await toggleInterest(classId);
      setInterests((prev) => (interested ? [...prev, classId] : prev.filter((id) => id !== classId)));
    } catch (err) {
      setError(err.message);
    } finally {
      setBusyId(null);
    }
  }

  return (
    <section id="schedule" aria-labelledby="schedule-heading" className="py-14 md:py-24">
      <div className="mx-auto max-w-[1120px] px-4 sm:px-8">
        <p className="section-kicker"><span className="h-px w-8 bg-blaze" />Train on your terms</p>
        <h2 id="schedule-heading" className="section-title mb-2">Find your session</h2>
        <p className="mb-6 max-w-2xl text-lg text-muted">
          Browse the weekly timetable and filter by the kind of training you want to do.
        </p>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter classes by type">
            {CLASS_TYPES.map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={filter === t}
                onClick={() => setFilter(t)}
                className={`rounded-full border px-4 py-1.5 text-sm font-semibold ${
                  filter === t
                    ? "border-blaze bg-blaze text-ink"
                    : "border-iron text-muted hover:text-chalk"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {!user && (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-card border border-blaze/40 bg-blaze/10 p-4">
            <p className="m-0">Sign in to save the classes you’re interested in for your next visit.</p>
            <button onClick={openModal} className="btn bg-blaze text-ink hover:bg-blaze-dark">
              Sign in
            </button>
          </div>
        )}
        {user && (
          <p className="mb-6 text-sm text-muted" aria-live="polite">
            You have <span className="font-bold text-blaze">{interests.length}</span> saved class
            {interests.length === 1 ? "" : "es"}.
          </p>
        )}
        {error && <p role="alert" className="mb-4 text-sm text-red-400">{error}</p>}

        <div aria-live="polite" aria-busy={loading}>
          {loading ? (
            <p className="mt-10 text-muted">Loading classes…</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {classes.map((item) => (
                <ClassCard
                  key={item.id}
                  item={item}
                  interested={interests.includes(item.id)}
                  busy={busyId === item.id}
                  onToggle={() => handleToggle(item.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
