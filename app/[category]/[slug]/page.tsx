import { fetchAPI } from "@/app/utils/fetch-api";
import Post from "@/app/components/Post";
import type { Metadata } from "next";

async function getPostBySlug(slug: string) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/blogs`;
  const urlParamsObject = {
    filters: { slug },
    populate: {
      cover: { fields: ["url"] },
      category: { fields: ["name"] },
    },
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
  params: { slug: string };
}): Promise<Metadata> {
  const meta = await getMetaData(params.slug);
  const metadata = meta[0].attributes;

  return {
    title: metadata.metaTitle,
    description: metadata.metaDescription,
  };
}

export default async function PostRoute({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const data = await getPostBySlug(slug);
  if (data.length === 0) return <h2>no post found</h2>;
  return <Post data={data[0]} />;
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

  return articleResponse.data.map(
    (article: {
      attributes: {
        slug: string;
        category: {
          slug: string;
        };
      };
    }) => ({
      slug: article.attributes.slug,
      category: article.attributes.slug,
    }),
  );
}
