# Architecture

## Overview

Johiny's Portfolio is a modern web portfolio built with **Astro 5.x**, **React 18**, and **Tailwind CSS**. It features a macOS-inspired design with draggable project cards, spotlight search, and smooth animations.

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **Astro 5.x** | Static site generator, routing, component framework |
| **React 18** | Interactive UI components (ProfileCard, Dock, etc.) |
| **Tailwind CSS** | Utility-first styling |
| **Animate.css** | CSS animations |
| **Typewriter Effect** | Typewriter text animation |

## Project Structure

```
/
├── src/
│   ├── components/          # Astro and React components
│   │   ├── Astro Components (.astro)
│   │   │   ├── AboutSection.astro
│   │   │   ├── BigTitle.astro
│   │   │   ├── Card.astro
│   │   │   ├── Dock.astro
│   │   │   ├── DraggableProjectCard.astro
│   │   │   ├── Footer.astro
│   │   │   ├── Header.astro
│   │   │   ├── Line.astro
│   │   │   ├── MacNavBar.astro
│   │   │   ├── Memorie.astro
│   │   │   ├── ProjectCard.astro
│   │   │   ├── ProjectLayout.astro
│   │   │   ├── ProjectsGrid.astro
│   │   │   ├── SortButton.astro
│   │   │   ├── SpotlightSearch.astro
│   │   │   ├── TextBackgroundEffect.astro
│   │   │   ├── TimeLine.astro
│   │   │   ├── ToBeginButton.astro
│   │   │   ├── TranslateButton.astro
│   │   │   └── WrappedProjectsContainer.astro
│   │   ├── React Components (.jsx)
│   │   │   ├── ChatControl.jsx
│   │   │   ├── NextOneButton.jsx
│   │   │   └── ProfileCard.jsx
│   │   ├── TypeScript (.ts)
│   │   │   └── dragScroll.ts
│   │   └── Styles (.css)
│   │       ├── MacNavBar.css
│   │       ├── NextOneButton.css
│   │       └── ProfileCardStyles.css
│   ├── layouts/
│   │   └── WebContainer.astro
│   ├── pages/
│   │   └── index.astro
│   ├── media/               # Images and assets
│   └── env.d.ts
├── public/
├── astro.config.mjs
├── tailwind.config.cjs
├── package.json
└── tsconfig.json
```

## Architecture Patterns

### Hybrid Rendering

The project uses Astro's **Island Architecture** to mix static and interactive content:

- **Static (Astro):** Layouts, navigation, project grids, timeline
- **Interactive (React):** ProfileCard with drag functionality, chat controls, dynamic UI elements

```astro
<!-- Static Astro component -->
<MacNavBar />

<!-- Interactive React component with client-side hydration -->
<ProfileCard client:only="react" />
```

### Component Communication

1. **Parent → Child:** Props passed from `index.astro` to `ProjectLayout`, `WrappedProjectsContainer`
2. **React State:** `ProfileCard` manages drag position, typewriter speed, mounted state
3. **Custom Elements:** `DraggableProjectCard` uses web components for drag-and-drop behavior

### Data Flow

```
index.astro (data source)
    ↓
ProjectLayout → WrappedProjectsContainer → DraggableProjectCard
    ↓
ProfileCard (React component with local state)
```

## Key Features

### macOS-Style UI

- **Dock:** Bottom navigation bar with app icons (LinkedIn, GitHub, X, Email)
- **Window Controls:** Close/minimize/maximize buttons on project cards
- **Glassmorphism:** Frosted glass effects on cards and overlays

### Interactive Elements

- **Draggable Cards:** Project cards can be dragged and reorganized
- **Spotlight Search:** Quick search overlay (Cmd/Ctrl+K)
- **Typewriter Effect:** Animated text introduction
- **Responsive Design:** Mobile-first with stacked layout on small screens

### Design System

- **Colors:** Animated gradient background (pink, coral, lavender, sky blue)
- **Typography:** Clean sans-serif with gradient text effects
- **Animations:** Smooth transitions using Animate.css

## Configuration Files

### astro.config.mjs

```javascript
integrrations: [tailwind(), react(), compress()]
```

### tailwind.config.cjs

Custom color palette and animation utilities.

## Deployment

The project is configured for static hosting on:
- **Vercel** (recommended)
- **Netlify**
- **Render**
- **GitHub Pages**

See [DEPLOY.md](./DEPLOY.md) for detailed instructions.
