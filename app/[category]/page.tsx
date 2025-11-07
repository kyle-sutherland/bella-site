import PageHeader from "@/app/components/PageHeader";
import { fetchAPI } from "@/app/utils/fetch-api";
import PostList from "@/app/components/PostList";

// Force dynamic rendering during development
export const revalidate = 0;

interface Category {
  id: number;
  name: string;
  slug: string;
  documentId: string;
  description?: string;
}

interface ContentSection {
  __component: string;
  [key: string]: unknown;
}

interface Post {
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
  category?: Category[];
}

interface APIResponse {
  data: Post[];
}

async function fetchPostsByCategory(): Promise<APIResponse> {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/blogs`;
    const urlParamsObject = {
      sort: { createdAt: "desc" },
      populate: ["category", "cover"],
    };
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const responseData = await fetchAPI(path, urlParamsObject, options);
    return responseData;
  } catch (error) {
    console.error(error);
    return { data: [] };
  }
}

export default async function CategoryRoute({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const response = await fetchPostsByCategory();

  // Filter posts by category since the API filter may not work with relations
  const filteredData = response.data?.filter((post: Post) =>
    post.category?.some((cat: Category) => cat.slug === category)
  ) || [];

  if (!filteredData || filteredData.length === 0) return <div>No Posts In this category</div>;

  const categoryData = filteredData[0]?.category?.[0];
  const name = categoryData?.name || "Category";
  const description = categoryData?.description || "";

  return (
    <div>
      <PageHeader heading={name} text={description} />
      <PostList data={filteredData} />
    </div>
  );
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

  // Get unique categories, filtering out articles without categories
  const uniqueCategories = Array.from(
    new Map(
      articleResponse.data
        .filter((article: Post) => article.category?.[0]?.slug)
        .map((article: Post) => [
          article.category![0].slug,
          { category: article.category![0].slug },
        ]),
    ).values(),
  );

  return uniqueCategories;
}
