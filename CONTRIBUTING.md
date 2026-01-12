# Contributing Guide

## Overview

Thank you for your interest in contributing to Johiny's Portfolio! This guide will help you understand how to add projects, make changes, and submit contributions.

## Ways to Contribute

1. **Add a new project** to the portfolio
2. **Fix bugs** or improve existing functionality
3. **Enhance UI/UX** with new animations or effects
4. **Improve documentation** (you're reading it!)
5. **Suggest features** via GitHub Issues

---

## Getting Started

### 1. Fork the Repository

1. Go to [Johiny_Portafolio](https://github.com/johiny/Johiny_Portafolio)
2. Click **Fork** (top right)
3. Clone your fork locally:

```bash
git clone https://github.com/YOUR-USERNAME/Johiny_Portafolio.git
cd Johiny_Portafolio
```

### 2. Set Up Development Environment

```bash
npm install
npm run dev
```

Visit `http://localhost:4321` to see your local copy.

### 3. Create a Branch

```bash
git checkout -b my-contribution
```

---

## Adding a New Project

### Step 1: Gather Project Information

You will need:
- Project title
- Project URL (live demo)
- Description (1-2 sentences)
- Screenshot/image (optional)

### Step 2: Add Project to index.astro

Edit `src/pages/index.astro` and add your project to the `projects` array:

```javascript
const projects = [
  // ... existing projects ...
  {
    id: NEW_ID,
    title: 'Project Name',
    url: 'https://project-url.com/',
    description: "A brief description of the project.",
    widthClass: '',        // Optional: 'sm:col-span-2' for wider cards
    heightClass: ''        // Optional: 'sm:row-span-2' for taller cards
  }
];
```

**ID Assignment:**
- Check existing IDs and use the next available number
- Example: If last ID is 12, use 13

**Size Classes:**
- `sm:col-span-2` - Card spans 2 columns on desktop
- `sm:row-span-2` - Card spans 2 rows on desktop
- Leave empty for standard 1×1 card

### Step 3: Add Project Image (Optional)

1. Add your screenshot to `src/media/`
2. Use a consistent naming: `project_name.jpg` or `project_name.png`
3. Update `ProjectCard.astro` or relevant component to use the image

### Step 4: Test Your Changes

```bash
npm run dev
```

Verify:
- Project appears in the grid
- Link opens correctly
- Description displays properly
- No console errors

---

## Adding a New Component

### Step 1: Choose Component Type

| Type | Use When | File Extension |
|------|----------|----------------|
| Static | No user interaction needed | `.astro` |
| Interactive | User interaction, state needed | `.jsx` (React) |

### Step 2: Create the Component

**Astro Component** (`src/components/MyComponent.astro`):

```astro
---
// Server-side JavaScript (frontmatter)
const message = "Hello!";
---

<div class="my-component">
  <p>{message}</p>
</div>

<style>
  .my-component {
    /* styles */
  }
</style>
```

**React Component** (`src/components/MyComponent.jsx`):

```jsx
import { useState } from 'react';

export default function MyComponent() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

### Step 3: Import and Use

In `index.astro` or other component:

```astro
---
import MyComponent from '../components/MyComponent.astro';
// or for React:
import MyComponent from '../components/MyComponent.jsx';
---

<!-- Astro component (static) -->
<MyComponent />

<!-- React component (with hydration) -->
<MyComponent client:load />
```

**Hydration Options:**
- `client:load` - Hydrate immediately on page load
- `client:only="react"` - Only render on client (no SSR)
- `client:visible` - Hydrate when component enters viewport
- `client:idle` - Hydrate when browser is idle

---

## Code Style Guidelines

### Formatting

- Use **Prettier** for code formatting
- Run before committing: `npm run format` (if configured)

### Naming Conventions

| Item | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `ProfileCard.jsx` |
| Files | kebab-case | `my-component.astro` |
| Variables | camelCase | `isDragging` |
| Constants | UPPER_SNAKE_CASE | `DEFAULT_SPEED` |
| CSS Classes | kebab-case | `glass-card` |

### Component Structure (Astro)

```astro
---
// 1. Imports
import SomeComponent from './SomeComponent.astro';

// 2. Props interface (if TypeScript)
// interface Props { ... }

// 3. Props destructuring
const { title } = Astro.props;
---

<!-- 4. Template -->
<div class="component">
  <h2>{title}</h2>
  <slot /> <!-- For content projection -->
</div>

<!-- 5. Scoped styles -->
<style>
  .component {
    /* styles */
  }
</style>
```

### Component Structure (React)

```jsx
import { useState, useEffect } from 'react';

export default function Component({ prop1 }) {
  // 1. State
  const [state, setState] = useState(initialValue);
  
  // 2. Effects
  useEffect(() => {
    // side effects
  }, [dependencies]);
  
  // 3. Event handlers
  const handleClick = () => { ... };
  
  // 4. Render
  return (
    <div onClick={handleClick}>
      {prop1}
    </div>
  );
}
```

---

## Pull Request Process

### 1. Commit Your Changes

```bash
git add .
git commit -m "Add: New project - Project Name"
```

**Commit Message Format:**
- `Add:` - New feature or project
- `Fix:` - Bug fix
- `Update:` - Existing feature improvement
- `Docs:` - Documentation changes
- `Refactor:` - Code restructuring

### 2. Push to Your Fork

```bash
git push origin my-contribution
```

### 3. Create Pull Request

1. Go to your fork on GitHub
2. Click **Compare & pull request**
3. Fill in the PR template
4. Click **Create pull request**

### 4. Address Feedback

- Reviewers may request changes
- Make additional commits to your branch
- PR will update automatically

### 5. Merge

Once approved, a maintainer will merge your PR.

---

## Reporting Issues

### Before Creating an Issue

1. Check if the issue already exists
2. Update to the latest version
3. Test with a clean install: `rm -rf node_modules && npm install`

### Issue Template

```markdown
## Description
Brief description of the issue

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Screenshots
If applicable, add screenshots

## Environment
- OS: [e.g., macOS 14]
- Browser: [e.g., Chrome 120]
- Node version: [e.g., v18.17.0]
```

---

## Style Guide

### CSS/Tailwind

- Use Tailwind utility classes when possible
- Custom CSS only when Tailwind can't achieve the effect
- Follow existing color palette:
  - Pink: `ff9a9e`
  - Coral: `fad0c4`
  - Lavender: `a1c4fd`
  - Sky: `c2e9fb`

### Accessibility

- Add `aria-label` to icon-only buttons
- Ensure color contrast meets WCAG AA
- Use semantic HTML elements
- Support keyboard navigation

### Performance

- Lazy load React components with `client:visible`
- Optimize images before adding
- Avoid large dependencies when possible

---

## Common Tasks

### Update Project Description

Edit `src/pages/index.astro` → modify the `description` field.

### Change Project Order

Reorder the `projects` array in `src/pages/index.astro`.

### Update Profile Image

Replace `src/media/johan_laravel.jpg` with a new image of the same name.

### Add Social Link to Dock

Edit `src/pages/index.astro` → add new `<a>` in the `<Dock>` component.

### Change Color Scheme

Edit `tailwind.config.cjs` and `src/layouts/WebContainer.astro`.

---

## Questions?

- Open a [GitHub Discussion](https://github.com/johiny/Johiny_Portafolio/discussions)
- Email: johinymazzo@gmail.com
- X/Twitter: @johinyDev

---

## Thank You!

Your contributions help make this portfolio better for everyone.
