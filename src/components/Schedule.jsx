import { useState } from "react";
import { classes, classTypes } from "../data/studio";
import ClassCard from "./ClassCard";

export default function Schedule() {
  const [filter, setFilter] = useState("All");
  const [booked, setBooked] = useState({}); // { [classId]: true/false }

  const visible = filter === "All" ? classes : classes.filter((c) => c.type === filter);
  const bookedCount = Object.values(booked).filter(Boolean).length;

  function setBookedFor(id, value) {
    setBooked((prev) => ({ ...prev, [id]: value }));
  }

  return (
    <section id="schedule" aria-labelledby="schedule-heading" className="py-14 md:py-24">
      <div className="mx-auto max-w-[1120px] px-4 sm:px-8">
        <h2 id="schedule-heading" className="mb-2 text-3xl font-extrabold md:text-4xl">Class schedule</h2>
        <p className="mb-6 text-muted">All classes are 60 minutes. Book up to 7 days ahead.</p>

        <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="Filter classes by type">
          {classTypes.map((type) => (
            <button
              key={type}
              type="button"
              aria-pressed={filter === type}
              onClick={() => setFilter(type)}
              className={
                "rounded-full border px-4 py-1.5 text-sm font-semibold " +
                (filter === type ? "border-primary bg-primary text-on-primary" : "border-line text-muted hover:text-text")
              }
            >
              {type}
            </button>
          ))}
        </div>

        <p className="mb-6 text-sm text-muted">
          {visible.length} classes · You've booked <span className="font-bold text-primary">{bookedCount}</span>
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((item) => (
            <ClassCard
              key={item.id}
              item={item}
              booked={!!booked[item.id]}
              onToggle={(value) => setBookedFor(item.id, value)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
