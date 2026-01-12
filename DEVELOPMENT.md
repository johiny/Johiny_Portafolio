# Development Guide

## Prerequisites

- **Node.js** >= 18.0.0
- **npm** or **yarn**
- **Git**

## Installation

1. Clone the repository:

```bash
git clone https://github.com/johiny/Johiny_Portafolio.git
cd Johiny_Portafolio
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create environment file (optional):

```bash
cp .env.example .env
# Edit .env with your configuration
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm start` | Alias for `npm run dev` |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run astro` | Run Astro CLI commands |

## Development Server

### Start Dev Server

```bash
npm run dev
```

The server will start at `http://localhost:4321`

### Hot Reload

Changes to `.astro`, `.jsx`, `.tsx`, `.ts`, `.css` files will automatically reload the browser.

## Building for Production

### Build Command

```bash
npm run build
```

This creates a production-ready build in the `dist/` directory:

```
dist/
├── _astro/
├── index.html
└── (optimized assets)
```

### Preview Production Build

```bash
npm run preview
```

This serves the built `dist/` folder at `http://localhost:4321` for testing.

## Project Configuration

### Astro Config (`astro.config.mjs`)

The project uses these integrations:

```javascript
- @astrojs/tailwind    // Tailwind CSS
- @astrojs/react       // React support
- astro-compress       // Asset compression
```

### Tailwind Config (`tailwind.config.cjs`)

Custom color palette and design tokens.

### TypeScript (`tsconfig.json`)

Configured for Astro and React type checking.

## Editor Setup

### VS Code Recommended Extensions

- **Astro** (`astro.astro`)
- **Tailwind CSS IntelliSense** (`tailwindcss.intellisense`)
- **Prettier** (`esbenp.prettier-vscode`)
- **ESLint** (`dbaeumer.vscode-eslint`)

### Settings (.vscode/settings.json)

```json
{
  "editor.formatOnSave": true,
  "files.associations": {
    "*.astro": "html"
  }
}
```

## Code Style

- **Prettier** is used for formatting
- **ESLint** for linting (if configured)
- Follow existing component patterns in `src/components/`

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 4321
lsof -ti:4321 | xargs kill -9
# or
npx kill-port 4321
```

### Clear Cache

```bash
# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Astro cache
rm -rf .astro
```

### Module Not Found Errors

```bash
# Reinstall dependencies
npm install
```

## Performance Tips

1. Use `client:only="react"` only for components that need it
2. Keep `client:load` components minimal
3. Use static Astro components where possible
4. Optimize images in `src/media/`

## Useful Links

- [Astro Documentation](https://docs.astro.build)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Animate.css](https://animate.style)
