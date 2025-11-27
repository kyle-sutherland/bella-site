# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server with debugging enabled
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

The dev server runs on `http://localhost:3000` by default.

## Architecture Overview

### Strapi CMS Integration

This is a Next.js 15 frontend that fetches content from a Strapi CMS backend. The CMS integration is central to the application:

- **API Communication**: All CMS data fetching goes through `app/utils/fetch-api.tsx` which uses `qs` for query string building
- **Helper Functions**: `app/utils/api-helpers.ts` provides `getStrapiURL()`, `getStrapiMedia()`, and `formatDate()` utilities
- **Authentication**: Uses `NEXT_PUBLIC_STRAPI_API_TOKEN` for authenticated requests
- **Base URL**: Configured via `NEXT_PUBLIC_STRAPI_API_URL` environment variable (defaults to `http://localhost:1337`)
- **Revalidation**: API responses are cached with 60-second revalidation by default

### Content Model

The application centers around a blog/portfolio structure:

- **Blogs** (`/blogs` endpoint): Main content items with title, description, slug, cover image
  - Optional `icon` field: Custom emoji/character for the post card title bar (defaults to 📄)
- **Categories**: Used to organize blogs (many-to-many relationship)
  - Optional `colorPreset` field: Preset color scheme for title bars (e.g., "blue", "green", "purple")
  - Optional `titleBarColorStart` and `titleBarColorEnd` fields: Custom hex colors for gradient title bars
- **Dynamic Zone Components**: Blog content uses Strapi's dynamic zones with these component types:
  - `shared.rich-text`: Rich text content
  - `shared.slider`: Image sliders
  - `shared.quote`: Quote blocks
  - `shared.media`: Media embeds
  - `shared.video-embed`: Video embeds

### Routing Structure

- **`/`**: Homepage - displays paginated list of all blog posts (client-side rendered)
- **`/[category]`**: Category pages - filters posts by category slug
- **`/[category]/[slug]`**: Individual blog post pages
- **`/info`**: Info/about page
- **`/win95-demo`**: Demo page showcasing all Windows 95 UI components

All dynamic routes use Next.js 15's `generateStaticParams()` for static generation.

### Key Technical Patterns

1. **Data Fetching**: Uses server-side `fetchAPI()` wrapper with automatic error handling and token injection
2. **Image Handling**: Next.js Image component configured for Strapi uploads (`localhost:1337/uploads/**`) and Pexels
3. **Content Rendering**: `app/utils/post-renderer.tsx` handles dynamic zone components and rich text node rendering
4. **Pagination**: Homepage implements infinite scroll with "load more" button using client-side state
5. **Category Navigation**: Categories fetched in root layout and passed to Navigation component globally

### Component Organization

Reusable components in `app/components/`:
- `Post.tsx`: Individual post display with dynamic zone rendering
- `PostList.tsx`: Grid layout for post lists with Windows 95 styled cards
- `Navigation.tsx`: Main nav with dynamic category links
- `PageHeader.tsx`: Consistent page headers
- `ArticleSelect.tsx`: Category filter and related posts sidebar
- Content renderers: `RichText`, `ImageSlider`, `Quote`, `Media`, `VideoEmbed`

**Windows 95 UI Components** (`app/components/win95/`):
- `Win95Button.tsx`: Classic Win95 button with raised 3D effect (normal/default variants)
- `Win95Input.tsx`: Text input with sunken 3D border
- `Win95Select.tsx`: Dropdown select with Win95 styling
- `Win95Checkbox.tsx`: Classic checkbox with checkmark indicator
- `Win95Panel.tsx`: Container with 3D borders (raised/sunken variants)
- `Win95Window.tsx`: Window component with title bar and control buttons
- `index.ts`: Barrel export for all Win95 components

### Environment Variables

Required in `.env.local`:
- `NEXT_PUBLIC_STRAPI_API_URL`: Strapi backend URL
- `NEXT_PUBLIC_STRAPI_API_TOKEN`: API authentication token
- `NEXT_PUBLIC_PAGE_LIMIT`: Number of posts per page (optional, defaults to 10)

### Windows 95 UI System

The site features a complete Windows 95 aesthetic with authentic styling:

**Styling** (`app/styles/win95.css`):
- CSS variables for color schemes with 4 themes: Classic, Desert, Lilac, High Contrast
- 3D border utilities for raised/sunken/ridge effects
- Consistent 1px borders for components, 2px for windows
- Gradient title bars with customizable colors
- MS Sans Serif font family

**Theme System**:
- Apply themes via `data-win95-theme` attribute (e.g., `data-win95-theme="desert"`)
- Default theme is Classic (traditional silver-gray)

**Color Customization** (`app/utils/title-bar-colors.ts`):
- 8 preset color schemes for title bars: blue, green, purple, red, teal, orange, pink, gray
- Category-based title bar colors (per-category gradients)
- `getTitleBarColors()` utility function with priority: custom colors > preset > default
- Each post card's title bar reflects its category's color scheme

**Border System**:
- Raised elements (buttons, panels): White/light top-left, black bottom-right with gray inset shadows
- Sunken elements (inputs, panels): Black top-left, white/light bottom-right with gray inset shadows
- Consistent right and bottom edge styling for authentic Win95 appearance

### Important Notes

- Category filtering in `[category]/page.tsx` happens client-side because Strapi relation filters may not work as expected
- The middleware.ts file is set up for i18n but not fully implemented
- Post rendering handles both dynamic zone components and direct rich text formats for flexibility
- TypeScript path alias `@/*` maps to repository root for cleaner imports
- PostList cards use `.win95-panel` class (1px borders) to match ArticleSelect and ImageSlider components
- Title bar colors are determined by category settings, with fallback to default blue if not configured
