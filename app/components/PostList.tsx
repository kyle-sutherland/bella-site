// app/components/PostList.tsx
import Image from "next/image";
import Link from "next/link";
import { getStrapiMedia, formatDate } from "../utils/api-helpers";
import Win95Panel from "./win95/Win95Panel";

interface ContentSection {
  __component: string;
  [key: string]: unknown;
}

interface Article {
  id: number;
  documentId: string;
  title: string;
  description: string;
  content: ContentSection[];
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  // Cover is optional since it may not appear in the API response
  cover?: {
    url?: string;
  };
  // Category is an array in Strapi v4/v5
  category?: Array<{
    id: number;
    name: string;
    slug: string;
    documentId: string;
  }>;
  // Make authorsBio optional since it may not appear in the API response
  authorsBio?: {
    name: string;
    avatar?: {
      url?: string;
    };
  };
  // Optional custom icon for the title bar
  icon?: string;
}

export default function PostList({
  data: articles,
  children,
}: {
  data: Article[];
  children?: React.ReactNode;
}) {
  return (
    <section className="container p-6 mx-auto space-y-6 sm:space-y-12">
      <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => {
          // Safe access to cover - may not exist in API response
          const imageUrl = article.cover?.url
            ? getStrapiMedia(article.cover.url)
            : null;

          // Safe access to category - it's an array in v4/v5
          const category = article.category?.[0];

          // Safe access to authorsBio - may not exist in API response
          const authorsBio = article.authorsBio;

          // Safe access to avatar - may not exist in API response
          const avatarUrl = authorsBio?.avatar?.url
            ? getStrapiMedia(authorsBio.avatar.url)
            : null;

          return (
            <Link
              href={`${category?.slug || "blog"}/${article.slug}`}
              key={article.id}
              style={{
                maxWidth: "400px",
                margin: "0 auto",
                textDecoration: "none",
                display: "block"
              }}
            >
              <div className="win95-panel" style={{ height: "100%", padding: 0 }}>
                {/* Title Bar */}
                <div className="win95-title-bar">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ fontSize: '14px' }}>{article.icon || '📄'}</span>
                    <span>{formatDate(article.publishedAt)}</span>
                  </div>
                </div>

                {/* Content */}
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  padding: "8px"
                }}>
                  {imageUrl && (
                    <Win95Panel
                      variant="sunken"
                      style={{
                        padding: 0,
                        overflow: "hidden"
                      }}
                    >
                      <Image
                        alt="presentation"
                        width="240"
                        height="240"
                        className="object-cover w-full h-44"
                        src={imageUrl}
                        style={{ display: "block" }}
                      />
                    </Win95Panel>
                  )}

                  <div className="mx-2 flex-col-auto relative win95-font" >
                    {avatarUrl && (
                      <Win95Panel
                        variant="sunken"
                        style={{
                          position: "absolute",
                          top: "-32px",
                          right: "0",
                          padding: 0,
                          overflow: "hidden"
                        }}
                      >
                        <Image
                          alt="avatar"
                          width="64"
                          height="64"
                          src={avatarUrl}
                          style={{
                            height: "64px",
                            width: "64px",
                            objectFit: "cover",
                            display: "block"
                          }}
                        />
                      </Win95Panel>
                    )}

                    <h3 className="win95-font-bold" style={{
                      fontSize: "14px",
                      color: "var(--win95-button-text)",
                      marginBottom: "4px"
                    }}>
                      {article.title}
                    </h3>

                    {authorsBio && (
                      <Win95Panel
                        variant="sunken"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          fontSize: "11px",
                          padding: "4px 8px",
                          color: "var(--win95-button-text)",
                          alignSelf: "flex-start"
                        }}
                      >
                        <span>By {authorsBio.name}</span>
                      </Win95Panel>
                    )}

                    <p style={{
                      paddingTop: "4px",
                      paddingBottom: "8px",
                      fontSize: "11px",
                      lineHeight: "1.4",
                      color: "var(--win95-button-text)"
                    }}>
                      {article.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      {children && children}
    </section>
  );
}
