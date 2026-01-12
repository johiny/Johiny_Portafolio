# Deployment Guide

## Overview

Johiny's Portfolio is a static site built with Astro. It can be deployed to any static hosting platform. This guide covers the most common deployment options.

## Pre-Deployment Checklist

1. Update version in `package.json` (optional)
2. Test production build locally: `npm run preview`
3. Verify all links work correctly
4. Check responsive design on mobile
5. Run accessibility checks

## Build Command

Always build before deploying:

```bash
npm run build
```

Output will be in the `dist/` directory.

---

## Vercel (Recommended)

### Automatic Deployment

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "Add New Project"
4. Import your GitHub repository
5. Vercel auto-detects Astro settings:
   - Framework Preset: **Astro**
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Click "Deploy"

### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Vercel Configuration (vercel.json)

Create `vercel.json` in root:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "astro"
}
```

---

## Netlify

### Automatic Deployment

1. Push your code to GitHub
2. Go to [Netlify Dashboard](https://app.netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Select your GitHub repository
5. Netlify auto-detects settings:
   - Build Command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

### Netlify Configuration (netlify.toml)

Create `netlify.toml` in root:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"
```

### Manual Deployment (Drag & Drop)

1. Run `npm run build`
2. Go to [Netlify Drop](https://app.netlify.com/drop)
3. Drag the `dist/` folder onto the page

---

## Render

### 1. Create Web Service

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name:** johiny-portafolio
   - **Build Command:** `npm run build`
   - **Start Command:** (leave empty for static)
   - **Publish directory:** `dist`
5. Click "Create Web Service"

### 2. Deploy

Render will automatically build and deploy on each push to main.

---

## GitHub Pages

### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under "Build and deployment":
   - Source: **Deploy from a branch**
   - Branch: **main** (or your default branch)
   - Folder: **/ (root)**

### 2. Build Script

Add to `package.json`:

```json
{
  "scripts": {
    "build": "astro build",
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

### 3. Deploy

```bash
# Install gh-pages
npm i -gh-pages

# Deploy
npm run deploy
```

---

## Cloudflare Pages

### 1. Connect Repository

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Workers & Pages** → **Create a project**
3. Select "Connect to Git" and choose your repository

### 2. Configure Build

- **Framework preset:** Astro
- **Build command:** `npm run build`
- **Build output directory:** `dist`

### 3. Deploy

Click "Deploy" and Cloudflare will build and publish your site.

---

## Docker (Optional)

### Dockerfile

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Build and Run

```bash
docker build -t johiny-portafolio .
docker run -p 8080:80 johiny-portafolio
```

---

## Environment Variables

The project uses a `.env` file for environment-specific configuration.

Example `.env`:

```env
# Optional: Analytics
PUBLIC_GA_ID=G-XXXXXXXXXX

# Optional: Form endpoints
CONTACT_FORM_URL=https://formspree.io/f/your-id
```

**Note:** Most environment variables are optional for this static portfolio.

---

## Custom Domain

### Vercel

```bash
vercel domains add johiny.dev
```

### Netlify

1. Go to **Domain Management**
2. Click "Add custom domain"
3. Enter your domain (e.g., `johiny.dev`)
4. Configure DNS records as shown

### Cloudflare

Use Cloudflare as your DNS provider and add a CNAME record pointing to your deployment URL.

---

## Post-Deployment Checklist

- [ ] Site loads correctly
- [ ] All links work (projects, social media)
- [ ] Images load properly
- [ ] Mobile responsive
- [ ] Lighthouse performance score
- [ ] SSL certificate active
- [ ] Custom domain resolves correctly

---

## Performance Optimization

The project already includes:

- `astro-compress` integration (enabled in config)
- Static HTML generation
- Optimized assets

**Additional tips:**

1. Use WebP images in `src/media/`
2. Compress images before adding
3. Lazy load below-fold images
4. Monitor with Google PageSpeed Insights

---

## Rollback

If you need to rollback to a previous version:

### Vercel
1. Go to **Deployments**
2. Find the working deployment
3. Click "..." → **Promote to Production**

### Netlify
1. Go to **Deploys**
2. Find the working deploy
3. Click "Actions" → **Publish deploy**

### GitHub Pages
1. Revert to a previous commit
2. Push and rebuild

---

## Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf node_modules .astro
npm install
npm run build
```

### 404 on Routes

Ensure your hosting provider is configured to serve `index.html` for all routes (Astro uses SPA-like routing).

### Assets Not Loading

Check that the `public/` directory contents are being served correctly. Astro copies `public/` to the root of `dist/`.

### Slow Load Times

1. Optimize images
2. Check third-party scripts
3. Enable gzip/brotli compression on host

---

## Useful Links

- [Astro Deployment Docs](https://docs.astro.build/en/guides/deploy/)
- [Vercel Astro Guide](https://vercel.com/docs/frameworks/astro)
- [Netlify Astro Guide](https://docs.netlify.com/integrations/astro/)
