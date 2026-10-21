-- Ironhouse Fitness database schema
-- Safe to run many times (IF NOT EXISTS)

-- Members who sign up on the site
CREATE TABLE IF NOT EXISTS users (
  id            SERIAL PRIMARY KEY,
  name          TEXT NOT NULL,
  email         TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Weekly timetable sessions
CREATE TABLE IF NOT EXISTS classes (
  id   TEXT PRIMARY KEY,          -- e.g. 'Mon-06:00'
  day  TEXT NOT NULL,             -- 'Mon'..'Sun'
  time TEXT NOT NULL,             -- '06:00'
  name TEXT NOT NULL,             -- 'Strength'
  type TEXT NOT NULL              -- 'Strength' | 'Conditioning' | 'Mobility'
);

-- Coach profiles
CREATE TABLE IF NOT EXISTS trainers (
  id       TEXT PRIMARY KEY,
  initials TEXT NOT NULL,
  name     TEXT NOT NULL,
  role     TEXT NOT NULL,
  type     TEXT NOT NULL,
  bio      TEXT NOT NULL
);

-- Membership pricing packages
CREATE TABLE IF NOT EXISTS membership_tiers (
  id         TEXT PRIMARY KEY,
  name       TEXT NOT NULL,
  price      TEXT NOT NULL,
  featured   BOOLEAN NOT NULL DEFAULT FALSE,
  perks      JSONB NOT NULL DEFAULT '[]',
  sort_order INT NOT NULL DEFAULT 0
);

-- Junction table: which user is interested in which class
CREATE TABLE IF NOT EXISTS user_interests (
  user_id    INT  NOT NULL REFERENCES users(id)   ON DELETE CASCADE,
  class_id   TEXT NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, class_id)
);
