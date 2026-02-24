# Navneet Sharma 2.0 Portfolio Blueprint
# Navneet Sharma 2.0 Portfolio Blueprint
## 🏗 Architecture Overview

This portfolio is built on a **High-Velocity Kinetic Architecture** designed to impress in 2026. It moves away from static HTML to a living, breathing application using the following core stack:

*   **React 19**: For component-based UI logic.
*   **Framer Motion**: For complex physics-based animations (springs, velocity tracking, 3D tilts).
*   **Tailwind CSS**: For utility-first styling and "Tactile Maximalism" design tokens.
*   **Vite**: For lightning-fast hot reloading and optimized builds.


### Core Components


1.  **Bento Grid Layout**: The `grid-cols-4` layout in `App.tsx` creates the modular "card" feel. Each card is wrapped in a `TiltCard` component.
2.  **TiltCard**: A 3D wrapper that tracks mouse position using `useMotionValue` to apply real-time rotation transforms without triggering React re-renders (Performance Critical).
3.  **NeuralCanvas**: A background particle system drawn on an HTML5 Canvas. It is memoized (`React.memo`) to prevent re-drawing on every state change.
4.  **VelocityTracker**: A component that visualizes mouse velocity, simulating a "living system" that reacts to user input energy.

---

## 🛠 Customization Manual

### 1. Updating Content
All text content is decoupled from the UI logic and stored in `constants.tsx`.

***Profile Info**: Edit the `PROFILE` constant.
***Projects**: Edit `PROJECTS`. Ensure you keep the 3 high-impact projects structure to maintain the layout balance.
**Tip*: Use `type: 'WEB'` for projects like "Thrift" to trigger specific web metric visualizations in `App.tsx`.
***Experience**: Edit `WORK_LOG`.
***Skills**: Edit `SKILL_CATEGORIES`. The tech ticker in the app automatically flattens these arrays.

### 2. Changing the Aesthetic (The "Vibe")
The app supports 3 vibes (`minimal`, `maximal`, `neural`) controlled by the state in `App.tsx`.
To change the default colors:
* Go to `index.css` and modify `--accent` (currently Emerald Green `#10b981`).
* Tailwind classes like `bg-emerald-500` are hardcoded in `App.tsx` for specific "Matrix/Hacker" aesthetics. Use Find & Replace to swap `emerald` with `blue`, `violet`, or `rose` for a different theme.

### 3. Adding New Projects
If you add a 4th project, you must adjust the Grid Layout in `App.tsx`. Currently, it is optimized for 3 highlight projects + the Velocity Tracker card.
***Recommendation**: Keep it to 3 "Flagships" to avoid cognitive overload. "Less is more" in 2026.

---

## 🚀 Future Roadmap (2026 Vision)

To keep this portfolio ahead of the curve, consider these upgrades:

### Phase 1: Real-Time Intelligence
***RAG Integration**: Connect the "Neural Search" (Command+K) to a real vector database (like Pinecone) containing your resume chunks. Let recruiters ask "Does Navneet know Redux?" and get a generated answer.
***Live Status**: Connect the `systemId` in the footer to a real API endpoint showing your GitHub commit status or Discord presence.

### Phase 2: WebGL Immersion
***Shader Backgrounds**: Replace the 2D Canvas `NeuralCanvas` with a Three.js / React-Three-Fiber fluid simulation for "liquid data" effects.
***3D Model Viewer**: For the "VidSnap AI" card, render a 3D model of a camera or drone instead of a static icon.

### Phase 3: Headless CMS
***Dynamic Updates**: Move `constants.tsx` data to Sanity.io or Contentful. This allows you to update your portfolio from your phone without pushing code.

---

## ⚡ Performance Notes

***Frame Budget**: The app targets 60fps. Heavy logic is kept out of the render loop.
***Glitch Animations**: CSS-based glitch effects (`index.css`) are cheaper than JS animations. Use them for "reveals".
***Motion Values**: We use `useMotionValue` instead of `useState` for mouse interaction. This bypasses the React Virtual DOM diffing for purely visual updates, ensuring zero lag even on lower-end devices.
