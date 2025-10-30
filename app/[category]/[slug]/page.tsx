import { fetchAPI } from "@/app/utils/fetch-api";
import Post from "@/app/components/Post";
import type { Metadata } from "next";

async function getPostBySlug(slug: string) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/blogs`;
  const urlParamsObject = {
    filters: { slug },
    populate: "*",
  };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const response = await fetchAPI(path, urlParamsObject, options);
  return response;
}

async function getMetaData(slug: string) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/blogs`;
  const urlParamsObject = {
    filters: { slug },
  };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const response = await fetchAPI(path, urlParamsObject, options);
  return response.data;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = await getMetaData(slug);
  const metadata = meta[0];

  return {
    title: metadata.title || "Article",
    description: metadata.description || "",
  };
}

export default async function PostRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const response = await getPostBySlug(slug);
  if (!response.data || response.data.length === 0) return <h2>no post found</h2>;
  return <Post data={response.data[0]} />;
}

export async function generateStaticParams() {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/blogs`;
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const articleResponse = await fetchAPI(
    path,
    {
      populate: ["category"],
    },
    options,
  );

  return articleResponse.data
    .filter(
      (article: {
        slug: string;
        category?: Array<{ slug: string }>;
      }) => article.category?.[0]?.slug,
    )
    .map(
      (article: {
        slug: string;
        category: Array<{ slug: string }>;
      }) => ({
        slug: article.slug,
        category: article.category[0].slug,
      }),
    );
}
