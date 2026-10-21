// Week 2 hardcoded data — moved here so seed.js can put it into Postgres
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const slotPlan = {
  "06:00": { name: "Strength", type: "Strength" },
  "12:15": { name: "Express HIIT", type: "Conditioning" },
  "17:30": { name: "Conditioning", type: "Conditioning" },
  "19:00": { name: "Mobility & Stretch", type: "Mobility" },
};

const classes = [];
days.forEach((day) => {
  Object.entries(slotPlan).forEach(([time, info]) => {
    // Saturday afternoon/evening is open gym
    const isOpenGym = day === "Sat" && (time === "17:30" || time === "19:00");
    classes.push({
      id: `${day}-${time}`,
      day,
      time,
      name: isOpenGym ? "Open gym" : info.name,
      type: isOpenGym ? "Mobility" : info.type,
    });
  });
});

const trainers = [
  { id: "logan", initials: "LN", name: "Logan Naidoo", role: "Head coach · Strength", type: "Strength",
    bio: "Fifteen years under the bar. Logan builds programmes around the big lifts and clean technique." },
  { id: "mubeen", initials: "MW", name: "Mubeen Wahab", role: "Coach · Conditioning", type: "Conditioning",
    bio: "Engine builder. Short, hard sessions that leave you better than you came in." },
  { id: "aisha", initials: "AK", name: "Aisha Khan", role: "Coach · Mobility", type: "Mobility",
    bio: "Moves first, loads second. Aisha keeps joints healthy so you can train for decades." },
];

const tiers = [
  { id: "off-peak", name: "Off-peak", price: "R590", featured: false, sort_order: 1,
    perks: ["Classes before 16:00", "Open gym weekdays", "Locker access"] },
  { id: "all-access", name: "All-access", price: "R890", featured: true, sort_order: 2,
    perks: ["Unlimited classes", "Open gym 7 days", "Free intro assessment", "Bring a friend monthly"] },
  { id: "coached", name: "Coached", price: "R1490", featured: false, sort_order: 3,
    perks: ["Everything in All-access", "Personal programme", "Monthly 1:1 check-in"] },
];

module.exports = { classes, trainers, tiers };
