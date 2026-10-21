// Runs schema.sql then inserts Week 2 data. Safe to re-run.
const fs = require("fs");
const path = require("path");
const pool = require("./db");
const { classes, trainers, tiers } = require("./data");

async function seed() {
  const client = await pool.connect();
  try {
    console.log("Creating tables...");
    const schema = fs.readFileSync(path.join(__dirname, "schema.sql"), "utf8");
    await client.query(schema);

    await client.query("BEGIN");

    console.log(`Seeding ${classes.length} classes...`);
    for (const c of classes) {
      await client.query(
        `INSERT INTO classes (id, day, time, name, type) VALUES ($1,$2,$3,$4,$5)
         ON CONFLICT (id) DO UPDATE SET day=EXCLUDED.day, time=EXCLUDED.time,
           name=EXCLUDED.name, type=EXCLUDED.type`,
        [c.id, c.day, c.time, c.name, c.type]
      );
    }

    console.log(`Seeding ${trainers.length} trainers...`);
    for (const t of trainers) {
      await client.query(
        `INSERT INTO trainers (id, initials, name, role, type, bio) VALUES ($1,$2,$3,$4,$5,$6)
         ON CONFLICT (id) DO UPDATE SET initials=EXCLUDED.initials, name=EXCLUDED.name,
           role=EXCLUDED.role, type=EXCLUDED.type, bio=EXCLUDED.bio`,
        [t.id, t.initials, t.name, t.role, t.type, t.bio]
      );
    }

    console.log(`Seeding ${tiers.length} membership tiers...`);
    for (const t of tiers) {
      await client.query(
        `INSERT INTO membership_tiers (id, name, price, featured, perks, sort_order)
         VALUES ($1,$2,$3,$4,$5,$6)
         ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, price=EXCLUDED.price,
           featured=EXCLUDED.featured, perks=EXCLUDED.perks, sort_order=EXCLUDED.sort_order`,
        [t.id, t.name, t.price, t.featured, JSON.stringify(t.perks), t.sort_order]
      );
    }

    await client.query("COMMIT");
    console.log("Seed complete!");
  } catch (err) {
    await client.query("ROLLBACK").catch(() => {});
    console.error("Seed failed:", err.message);
    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
