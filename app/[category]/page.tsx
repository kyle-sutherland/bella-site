import PageHeader from "@/app/components/PageHeader";
import { fetchAPI } from "@/app/utils/fetch-api";
import PostList from "@/app/components/PostList";
import Navigation from "@/app/components/Navigation";

// Force dynamic rendering during development
export const revalidate = 0;

async function fetchPostsByCategory() {
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
  const filteredData = response.data?.filter((post: any) =>
    post.category?.some((cat: any) => cat.slug === category)
  ) || [];

  if (!filteredData || filteredData.length === 0) return <div>No Posts In this category</div>;

  const categoryData = filteredData[0]?.category?.[0] || {};
  const { name = "Category", description = "" } = categoryData;

  return (
    <div>
      <Navigation />
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
        .filter((article: any) => article.category?.[0]?.slug)
        .map((article: any) => [
          article.category[0].slug,
          { category: article.category[0].slug },
        ]),
    ).values(),
  );

  return uniqueCategories;
}
