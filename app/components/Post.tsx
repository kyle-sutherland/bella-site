import { formatDate, getStrapiMedia } from "@/app/utils/api-helpers";
import { postRenderer } from "@/app/utils/post-renderer";
import Image from "next/image";

interface Article {
  id: number;
  title: string;
  description: string;
  slug: string;
  cover?: {
    url?: string;
  };
  content?: any[];
  images?: Array<{
    id?: number;
    url?: string;
    alternativeText?: string;
    caption?: string;
  }>;
  publishedAt: string;
}

export default function Post({ data }: { data: Article }) {
  const { title, description, publishedAt, cover, images } = data;
  const imageUrl = getStrapiMedia(cover?.url);

  return (
    <article style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="article cover image"
          width={400}
          height={400}
          style={{ width: "100%", height: "auto", objectFit: "cover", border: "0px solid #000" }}
        />
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <h1 style={{ lineHeight: 1.2, fontSize: "48px", fontWeight: "bold" }}>{title}</h1>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", borderTop: "1px solid #000", paddingTop: "8px" }}>
          <p style={{ fontSize: "16px" }}>
            {formatDate(publishedAt)}
          </p>
        </div>
      </div>

      <div>
        <p style={{ marginBottom: "16px" }}>{description}</p>

        {data.content && data.content.map((section: any, index: number) =>
          postRenderer(section, index),
        )}

        {images && images.length > 0 && (
          <>
            {postRenderer(
              {
                __component: "shared.slider",
                files: {
                  data: images.map((img) => ({
                    id: img.id,
                    attributes: {
                      alternativeText: img.alternativeText,
                      caption: img.caption,
                      url: img.url,
                    },
                  })),
                },
              },
              data.content?.length || 0
            )}
          </>
        )}
      </div>
    </article>
  );
}
