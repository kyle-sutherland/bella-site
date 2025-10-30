import React from "react";
import Link from "next/link";

interface Category {
  id: number;
  name: string;
  slug: string;
  documentId: string;
}

interface Article {
  id: number;
  title: string;
  slug: string;
  documentId: string;
}

function selectedFilter(current: string, selected: string) {
  return current === selected
    ? { border: "1px solid #000", padding: "4px 8px", fontWeight: "bold" }
    : { border: "1px solid #000", padding: "4px 8px", fontWeight: "normal" };
}

export default function ArticleSelect({
  categories,
  articles,
  params,
}: {
  categories: Category[];
  articles: Article[];
  params: {
    slug?: string;
    category?: string;
  };
}) {
  return (
    <div style={{ padding: "16px", border: "1px solid #000", minHeight: "365px", position: "relative" }}>
      <h4 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}>Browse By Category</h4>

      <div>
        <div style={{ display: "flex", flexWrap: "wrap", paddingTop: "24px", paddingBottom: "24px", gap: "8px", borderBottom: "1px solid #000", marginBottom: "16px" }}>
          {categories.map((category: Category) => {
            return (
              <Link
                key={category.id}
                href={`/${category.slug}`}
                className="link"
                style={selectedFilter(
                  category.slug,
                  params.category || "",
                )}
              >
                #{category.name}
              </Link>
            );
          })}
          <Link href={"/"} className="link" style={selectedFilter("", "filter")}>
            #all
          </Link>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <h4 style={{ fontSize: "18px", fontWeight: "bold" }}>Other Posts You May Like</h4>
          <ul style={{ marginLeft: "24px", display: "flex", flexDirection: "column", gap: "8px" }}>
            {articles.map((article: Article) => {
              return (
                <li key={article.id}>
                  <Link
                    rel="noopener noreferrer"
                    href={`/${params.category}/${article.slug}`}
                    className="link"
                    style={{
                      textDecoration: params.slug === article.slug ? "underline" : "none",
                      fontWeight: params.slug === article.slug ? "bold" : "normal",
                    }}
                  >
                    {article.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
