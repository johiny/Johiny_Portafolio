# Components Documentation

## Overview

The portfolio uses a mix of **Astro components** (static) and **React components** (interactive). This document catalogs the key components and their APIs.

---

## Astro Components

### MacNavBar

**File:** `src/components/MacNavBar.astro`

**Purpose:** macOS-style top navigation bar with window controls.

**Usage:**
```astro
<MacNavBar />
```

**Props:** None

**Styling:**
- Fixed at top of viewport
- Contains Apple-style window control buttons (close, minimize, maximize)
- Responsive height via CSS custom property `--macbar-height`

---

### Dock

**File:** `src/components/Dock.astro`

**Purpose:** Bottom navigation bar with social links and app shortcuts.

**Usage:**
```astro
<Dock>
  <a href="https://linkedin.com/in/..." class="dock-item">...</a>
  <a href="https://github.com/johiny" class="dock-item">...</a>
</Dock>
```

**Slots:** Default slot for dock items

**Styling:**
- Fixed at bottom
- Hover magnification effect
- Includes divider between social links and app shortcuts

**Example Items:**
- LinkedIn (with official logo SVG)
- GitHub (octocat logo)
- X/Twitter (X logo)
- Email (gmail gradient)
- Source code link (purple gradient)

---

### SpotlightSearch

**File:** `src/components/SpotlightSearch.astro`

**Purpose:** Quick search overlay triggered by keyboard shortcut (Cmd/Ctrl+K).

**Usage:**
```astro
<SpotlightSearch />
```

**Props:** None

**Features:**
- Keyboard shortcut (Cmd+K or Ctrl+K)
- Search through projects
- Smooth open/close animation

---

### ProjectLayout

**File:** `src/components/ProjectLayout.astro`

**Purpose:** Layout wrapper for project display with sorting functionality.

**Usage:**
```astro
---
import ProjectLayout from './ProjectLayout.astro';
const projects = [{ id: 1, title: 'Project', url: 'https://...', description: '...' }];
---
<ProjectLayout {projects} />
```

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| projects | `Array<{id, title, url, description}>` | Yes | Array of project data |

**Sub-components:**
- `SortButton.astro` - Sort projects by date (oldest/newest)
- `ProjectsGrid.astro` - Grid layout for project cards
- `WrappedProjectsContainer.astro` - Container with draggable cards

---

### WrappedProjectsContainer

**File:** `src/components/WrappedProjectsContainer.astro`

**Purpose:** Container that renders draggable project cards with automatic icon assignment and gradient theming.

**Usage:**
```astro
---
import WrappedProjectsContainer from './WrappedProjectsContainer.astro';
const projects = [{ id: 1, title: 'Project', url: 'https://...', description: '...' }];
---
<WrappedProjectsContainer {projects} />
```

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| projects | `Array<{id, title, url, description}>` | Yes | Array of project data |

**Features:**
- Deterministic "bento-style" sizing
- Auto-assigns icons from predefined set
- Auto-assigns gradient color themes (cycles through 4 color schemes)
- Duplicate cards for visual effect (cards appear twice)

---

### DraggableProjectCard

**File:** `src/components/DraggableProjectCard.astro`

**Purpose:** Web component wrapper for individual draggable project cards.

**Usage:**
```astro
---
import DraggableProjectCard from './DraggableProjectCard.astro';
const project = { title: 'Project', url: 'https://...', description: '...' };
---
<DraggableProjectCard 
  project={project} 
  index={0}
  iconSvg="<svg>...</svg>"
  gradientTitleClass="gradient-text-title-1"
  gradientDescClass="gradient-text-desc-1"
/>
```

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| project | `{title, url, description}` | Yes | Project data |
| index | `number` | Yes | Position in project list |
| isDuplicate | `boolean` | No | Whether this is a visual duplicate |
| class | `string` | No | Additional CSS classes |
| iconSvg | `string` | Yes | SVG icon HTML |
| gradientTitleClass | `string` | Yes | Tailwind class for title gradient |
| gradientDescClass | `string` | Yes | Tailwind class for description gradient |

**Features:**
- Web component (`<draggable-project-card>`)
- Glassmorphism design
- Window control buttons (decorative)
- Drag-and-drop via JavaScript

---

### TimeLine

**File:** `src/components/TimeLine.astro`

**Purpose:** Animated timeline showcasing career/experience trajectory.

**Usage:**
```astro
<TimeLine />
```

**Props:** None

**Features:**
- Smooth entrance animations
- Animated content using Animate.css
- Responsive layout

---

### Footer

**File:** `src/components/Footer.astro`

**Purpose:** Site footer with copyright and additional links.

**Usage:**
```astro
<Footer />
```

**Props:** None

---

### Header

**File:** `src/components/Header.astro`

**Purpose:** Page header section.

**Usage:**
```astro
<Header />
```

**Props:** None

---

### Card

**File:** `src/components/Card.astro`

**Purpose:** Generic card component for various content.

**Usage:**
```astro
<Card>
  <p>Content</p>
</Card>
```

**Props:** None

**Slots:** Default slot for content

---

### Other Astro Components

| Component | File | Purpose |
|-----------|------|---------|
| AboutSection | `AboutSection.astro` | About me section |
| BigTitle | `BigTitle.astro` | Large animated title |
| Line | `Line.astro` | Decorative line/separator |
| Memorie | `Memorie.astro` | Memory/showcase component |
| SortButton | `SortButton.astro` | Sorting controls |
| TextBackgroundEffect | `TextBackgroundEffect.astro` | Text with background effects |
| ToBeginButton | `ToBeginButton.astro` | Scroll to top button |
| TranslateButton | `TranslateButton.astro` | Language toggle |
| BigTitle | `BigTitle.astro` | Large title display |
| Line | `Line.astro` | Visual divider |

---

## React Components

### ProfileCard

**File:** `src/components/ProfileCard.jsx`

**Purpose:** Interactive profile card with drag functionality and typewriter intro.

**Usage:**
```jsx
<ProfileCard client:only="react" />
```

**Props:** None

**Features:**
- **Typewriter Effect:** Animated introduction text
- **Drag & Drop:** Card can be dragged around the viewport
- **Chat Controls:** Speed adjustment buttons (forward, backward, fast forward)
- **Glassmorphism:** Frosted glass styling
- **Responsive:** Adapts to screen size

**State:**
| State | Type | Purpose |
|-------|------|---------|
| profileImg | `string` | Profile image source |
| typeSpeed | `number` | Typewriter speed (ms) |
| mounted | `boolean` | Controls slide-in animation |
| position | `{x, y}` | Current drag position |
| isDragging | `boolean` | Dragging state |

**Dependencies:**
- `typewriter-effect` - Typewriter animation
- `@fortawesome/react-fontawesome` - Icons
- `ChatControl` - Speed control buttons

---

### ChatControl

**File:** `src/components/ChatControl.jsx`

**Purpose:** Control buttons for adjusting typewriter speed.

**Usage:**
```jsx
import ChatControl from './ChatControl.jsx';
// Used inside ProfileCard
```

**Props:** None (uses context/callbacks from parent)

**Features:**
- Three control buttons (backward, forward, fast forward)
- Gradient styling
- Interactive hover effects

---

### NextOneButton

**File:** `src/components/NextOneButton.jsx`

**Purpose:** Interactive navigation button.

**Usage:**
```jsx
<NextOneButton />
```

**Props:** None

**Features:**
- Click animation
- Navigation functionality

---

## TypeScript Modules

### dragScroll

**File:** `src/components/dragScroll.ts`

**Purpose:** Utility for implementing drag-to-scroll functionality.

**Usage:**
```typescript
import { setupDragScroll } from './dragScroll';
setupDragScroll(element);
```

**Functions:**
| Function | Purpose |
|----------|---------|
| `setupDragScroll(element)` | Enable drag-to-scroll on element |
| `handleMouseDown`, `handleMouseMove`, `handleMouseUp` | Event handlers |

---

## Styling

### CSS Files

| File | Component | Purpose |
|------|-----------|---------|
| `MacNavBar.css` | MacNavBar | Navigation styling |
| `NextOneButton.css` | NextOneButton | Button animations |
| `ProfileCardStyles.css` | ProfileCard | Card styling and glassmorphism |

### Global Styles

**WebContainer.astro** includes:
- Animated gradient background
- Custom scrollbar styling
- Responsive breakpoints

---

## Component Hierarchy

```
WebContainer (layout)
├── MacNavBar
├── SpotlightSearch
├── Dock
│   └── Social/App links
├── layers-container
│   ├── profile-grid
│   │   └── ProfileCard (React)
│   └── projects-grid
│       └── ProjectLayout
│           ├── SortButton
│           └── WrappedProjectsContainer
│               └── DraggableProjectCard (×12)
└── TimeLine (optional sections)
```

---

## Adding New Components

1. Create file in `src/components/`
2. For static: use `.astro` extension
3. For interactive: use `.jsx` extension with React hooks
4. Import and use in `pages/index.astro` or other components
5. Add styles in component file or separate `.css` file
