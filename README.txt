IRONHOUSE — how to add the gym pictures
=======================================

What's in this zip:
  src/assets/hero-gym.jpg      -> wide photo of the gym floor (used in the showcase strip)
  src/assets/training.jpg      -> deadlift photo (used in the hero, next to the headline)
  src/components/Hero.jsx      -> your hero, rewritten to show the deadlift photo
  src/components/GymShowcase.jsx -> a NEW full-width photo strip below the hero

Steps in VS Code:
1. Unzip and copy the "src" folder over your iron-fitness project's src folder
   (merge it — this adds src/assets/ and replaces src/components/Hero.jsx).
2. Open src/App.jsx and make two small changes:
   a. Add this import near the other imports at the top:
        import GymShowcase from "./components/GymShowcase";
   b. Add the component right after <Hero />:
        <GymShowcase />
3. Save. Vite auto-refreshes and you'll see both photos.
4. Make a commit, e.g. "Add gym photos to hero and showcase strip".

If Tailwind colors don't show on the overlay (bg-bg/90), make sure your
index.css still starts with @import "tailwindcss"; and has the @theme tokens
from the earlier zip.
