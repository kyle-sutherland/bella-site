"use client";
import { useState, useEffect, useCallback } from "react";
import { fetchAPI } from "./utils/fetch-api";
import Loader from "./components/Loader";
import PostList from "./components/PostList";
import PageHeader from "./components/PageHeader";

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
  cover?: {
    url?: string;
  };
  category?: Array<{
    id: number;
    name: string;
    slug: string;
    documentId: string;
  }>;
}

interface Meta {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export default function BlogPage() {
  const [meta, setMeta] = useState<Meta | undefined>();
  const [data, setData] = useState<Article[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (page: number, pageSize: number) => {
    setLoading(true);
    setError(null);

    try {
      const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
      // Change path to /blogs which is the correct endpoint from your API response
      const path = `/blogs`;
      const urlParamsObject = {
        sort: { createdAt: "desc" },
        pagination: {
          page: page,
          pageSize: pageSize,
        },
        populate: ["category", "cover"],
      };

      const options = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : {};

      console.log("Fetching from:", path, "with params:", urlParamsObject);
      const responseData = await fetchAPI(path, urlParamsObject, options);
      console.log("Response data:", responseData);

      if (!responseData || !responseData.data) {
        throw new Error("Invalid API response structure");
      }

      if (page === 1) {
        setData(responseData.data);
      } else {
        setData((prevData) => [...prevData, ...responseData.data]);
      }

      setMeta(responseData.meta);
    } catch (error) {
      console.error("API Error:", error);
      setError(
        error instanceof Error ? error.message : "Failed to fetch articles",
      );
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  function loadMorePosts(): void {
    if (meta) {
      const nextPage = meta.pagination.page + 1;
      const pageSize = meta.pagination.pageSize;
      fetchData(nextPage, pageSize);
    }
  }

  useEffect(() => {
    const pageSize = Number(process.env.NEXT_PUBLIC_PAGE_LIMIT) || 10;
    fetchData(1, pageSize);
  }, [fetchData]);

  if (isLoading) return <Loader />;

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <PageHeader heading="Our Blog" text="Checkout Something Cool" />
        <div className="text-center p-6 bg-red-50 rounded-lg text-red-600 my-4">
          <h2 className="text-xl font-bold mb-2">Error Loading Articles</h2>
          <p>{error}</p>
          <button
            onClick={() =>
              fetchData(1, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT) || 10)
            }
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader heading="Our Blog" text="Checkout Something Cool" />
      <PostList data={data}>
        {meta && meta.pagination.page < meta.pagination.pageCount && (
          <div className="flex justify-center">
            <button
              type="button"
              className="px-6 py-3 text-sm rounded-lg hover:underline dark:bg-gray-900 dark:text-gray-400"
              onClick={loadMorePosts}
            >
              Load more posts...
            </button>
          </div>
        )}
      </PostList>
    </div>
  );
}
