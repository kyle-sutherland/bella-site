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
- **Categories**: Used to organize blogs (many-to-many relationship)
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
- `PostList.tsx`: Grid layout for post lists
- `Navigation.tsx`: Main nav with dynamic category links
- `PageHeader.tsx`: Consistent page headers
- Content renderers: `RichText`, `ImageSlider`, `Quote`, `Media`, `VideoEmbed`

### Environment Variables

Required in `.env.local`:
- `NEXT_PUBLIC_STRAPI_API_URL`: Strapi backend URL
- `NEXT_PUBLIC_STRAPI_API_TOKEN`: API authentication token
- `NEXT_PUBLIC_PAGE_LIMIT`: Number of posts per page (optional, defaults to 10)

### Important Notes

- Category filtering in `[category]/page.tsx` happens client-side because Strapi relation filters may not work as expected
- The middleware.ts file is set up for i18n but not fully implemented
- Post rendering handles both dynamic zone components and direct rich text formats for flexibility
- TypeScript path alias `@/*` maps to repository root for cleaner imports
