// All site content lives here as arrays of objects.

const scheduleRows = [
  { time: "06:00", slots: [["Strength", "Strength"], ["Conditioning", "Conditioning"], ["Strength", "Strength"], ["Conditioning", "Conditioning"], ["Strength", "Strength"], ["Mobility", "Mobility"]] },
  { time: "12:15", slots: [["Express HIIT", "Conditioning"], ["Strength", "Strength"], ["Express HIIT", "Conditioning"], ["Strength", "Strength"], ["Express HIIT", "Conditioning"], null] },
  { time: "17:30", slots: [["Strength", "Strength"], ["Mobility", "Mobility"], ["Strength", "Strength"], ["Mobility", "Mobility"], ["Conditioning", "Conditioning"], ["Open gym", "Strength"]] },
  { time: "19:00", slots: [["Mobility", "Mobility"], ["Conditioning", "Conditioning"], ["Mobility", "Mobility"], ["Conditioning", "Conditioning"], null, null] },
];

export const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const classTypes = ["All", "Strength", "Conditioning", "Mobility"];

// Flattened list: { id, day, time, name, type }
export const classes = scheduleRows.flatMap((row) =>
  row.slots
    .map((slot, i) =>
      slot ? { id: `${days[i]}-${row.time}`, day: days[i], time: row.time, name: slot[0], type: slot[1] } : null,
    )
    .filter(Boolean),
);

export const trainers = [
  { id: "logan", initials: "LN", name: "Logan Nair", role: "Head coach · Strength", type: "Strength", bio: "12 years under the bar. Logan runs the strength program and insists on perfect hinges before heavy deadlifts." },
  { id: "mubeen", initials: "MW", name: "Mubeen Wahab", role: "Conditioning", type: "Conditioning", bio: "Former 800m national squad. Mubeen's HIIT blocks are short, brutal, and weirdly fun." },
  { id: "nabiha", initials: "NW", name: "Nabiha Wahab", role: "Mobility · Rehab", type: "Mobility", bio: "Physio-turned-coach. Nabiha keeps the whole studio moving well and coming back from injuries stronger." },
  { id: "muzzammil", initials: "ME", name: "Muzzammil Essop", role: "Strength · Beginners", type: "Strength", bio: "Muzzammil onboards every new member. Patient, precise, and allergic to bad squat depth." },
];

export const tiers = [
  { id: "off-peak", name: "Off-peak", price: "R650", featured: false, perks: ["Classes before 16:00", "Open gym Saturdays", "1 guest pass per month"] },
  { id: "all-access", name: "All access", price: "R890", featured: true, perks: ["Unlimited classes, any time", "Open gym 7 days a week", "Monthly movement screen", "2 guest passes per month"] },
  { id: "coached", name: "Coached+", price: "R1 450", featured: false, perks: ["Everything in All access", "1-on-1 session every month", "Personalised program"] },
];

export const navLinks = [
  { href: "#schedule", label: "Schedule" },
  { href: "#trainers", label: "Trainers" },
  { href: "#membership", label: "Membership" },
];
