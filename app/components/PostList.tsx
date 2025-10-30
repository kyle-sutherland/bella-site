// app/components/PostList.tsx
import Image from "next/image";
import Link from "next/link";
import { getStrapiMedia, formatDate } from "../utils/api-helpers";

interface Article {
  id: number;
  documentId: string;
  title: string;
  description: string;
  content: any[];
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
                border: "1px solid #000",
                display: "flex",
                flexDirection: "column",
                textDecoration: "none",
                backgroundColor: "#fff",
                overflow: "hidden"
              }}
            >
              {imageUrl && (
                <Image
                  alt="presentation"
                  width="240"
                  height="240"
                  className="object-cover w-full h-44"
                  src={imageUrl}
                />
              )}
              <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "8px", position: "relative" }}>
                {avatarUrl && (
                  <Image
                    alt="avatar"
                    width="80"
                    height="80"
                    src={avatarUrl}
                    style={{
                      height: "64px",
                      width: "64px",
                      objectFit: "cover",
                      position: "absolute",
                      top: "-32px",
                      right: "16px",
                      border: "1px solid #000"
                    }}
                  />
                )}

                <h3 style={{ fontSize: "20px", fontWeight: "bold", textDecoration: "underline" }}>
                  {article.title}
                </h3>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "12px" }}>
                  <span>
                    {formatDate(article.publishedAt)}
                  </span>
                  {authorsBio && (
                    <span>
                      {authorsBio.name}
                    </span>
                  )}
                </div>
                <p style={{ paddingTop: "16px" }}>{article.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
      {children && children}
    </section>
  );
}
