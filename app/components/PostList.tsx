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
              className="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-900 lg:w-[300px] xl:min-w-[375px] rounded-2xl overflow-hidden shadow-lg"
            >
              {imageUrl && (
                <Image
                  alt="presentation"
                  width="240"
                  height="240"
                  className="object-cover w-full h-44 "
                  src={imageUrl}
                />
              )}
              <div className="p-6 space-y-2 relative">
                {avatarUrl && (
                  <Image
                    alt="avatar"
                    width="80"
                    height="80"
                    src={avatarUrl}
                    className="rounded-full h-16 w-16 object-cover absolute -top-8 right-4"
                  />
                )}

                <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">
                  {article.title}
                </h3>

                <div className="flex justify-between items-center">
                  <span className="text-xs dark:text-gray-400">
                    {formatDate(article.publishedAt)}
                  </span>
                  {authorsBio && (
                    <span className="text-xs dark:text-gray-400">
                      {authorsBio.name}
                    </span>
                  )}
                </div>
                <p className="py-4">{article.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
      {children && children}
    </section>
  );
}
