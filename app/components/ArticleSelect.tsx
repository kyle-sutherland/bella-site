import React from "react";
import Link from "next/link";
import Win95Button from "./win95/Win95Button";

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
    <div className="win95-panel" style={{ minHeight: "365px", position: "relative" }}>
      <h4 className="win95-font-bold" style={{ fontSize: "16px", marginBottom: "16px" }}>Browse By Category</h4>

      <div>
        <div className="win95-panel-sunken" style={{ display: "flex", flexWrap: "wrap", paddingTop: "12px", paddingBottom: "12px", gap: "6px", marginBottom: "16px" }}>
          {categories.map((category: Category) => {
            const isSelected = category.slug === params.category;
            return (
              <Link
                key={category.id}
                href={`/${category.slug}`}
                style={{ textDecoration: "none" }}
              >
                <Win95Button variant={isSelected ? "default" : "normal"}>
                  #{category.name}
                </Win95Button>
              </Link>
            );
          })}
          <Link href={"/"} style={{ textDecoration: "none" }}>
            <Win95Button>
              #all
            </Win95Button>
          </Link>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <h4 className="win95-font-bold" style={{ fontSize: "14px" }}>Other Posts You May Like</h4>
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
