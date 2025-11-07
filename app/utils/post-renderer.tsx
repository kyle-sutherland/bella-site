import React from "react";
import RichText from "../components/RichText";
import ImageSlider from "../components/ImageSlider";
import Quote from "../components/Quote";
import Media from "../components/Media";
import VideoEmbed from "../components/VideoEmbed";
import Image from "next/image";
import { getStrapiMedia } from "./api-helpers";

interface RichTextNode {
  type?: string;
  text?: string;
  bold?: boolean;
  italic?: boolean;
  level?: number;
  url?: string;
  format?: string;
  children?: RichTextNode[];
  image?: {
    data?: {
      attributes?: {
        url?: string;
        alternativeText?: string;
      };
    };
  };
}

interface ContentSection {
  __component?: string;
  type?: string;
  [key: string]: unknown;
}

function renderRichTextNode(node: RichTextNode, index?: number): React.ReactNode {
  if (typeof node === 'string') {
    return node;
  }

  if (node.type === 'paragraph') {
    const children = node.children?.map((child: RichTextNode, i: number) => renderRichTextNode(child, i)) || [];
    return <p key={index} style={{ marginBottom: "16px" }}>{children}</p>;
  }

  if (node.type === 'heading') {
    const level = Math.min(Math.max(node.level || 1, 1), 6);
    const children = node.children?.map((child: RichTextNode, i: number) => renderRichTextNode(child, i)) || [];
    const HeadingTag = `h${level}` as React.ElementType;
    return React.createElement(HeadingTag, { key: index, style: { marginBottom: "16px", fontWeight: "bold" } }, children);
  }

  if (node.type === 'image') {
    const imageUrl = getStrapiMedia(node.image?.data?.attributes?.url || node.url);
    if (imageUrl) {
      return (
        <div key={index} style={{ margin: "16px 0", border: "1px solid #000" }}>
          <Image
            src={imageUrl}
            alt={node.image?.data?.attributes?.alternativeText || "image"}
            width={600}
            height={400}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      );
    }
    return null;
  }

  if (node.type === 'link') {
    const children = node.children?.map((child: RichTextNode, i: number) => renderRichTextNode(child, i)) || [];
    return <a key={index} href={node.url || ''} style={{ color: "#0000ff", textDecoration: "underline" }}>{children}</a>;
  }

  if (node.type === 'list') {
    const items = node.children?.map((child: RichTextNode, i: number) => renderRichTextNode(child, i)) || [];
    const ListTag = node.format === 'ordered' ? 'ol' : 'ul';
    return React.createElement(ListTag, { key: index, style: { marginBottom: "16px", marginLeft: "24px" } }, items);
  }

  if (node.type === 'list-item') {
    const children = node.children?.map((child: RichTextNode, i: number) => renderRichTextNode(child, i)) || [];
    return <li key={index}>{children}</li>;
  }

  if (node.bold) {
    return <strong key={index}>{node.text || ''}</strong>;
  }

  if (node.italic) {
    return <em key={index}>{node.text || ''}</em>;
  }

  if (node.text) {
    return node.text;
  }

  return null;
}

export function postRenderer(section: ContentSection, index: number) {
  // Handle dynamic zone components
  if (section.__component) {
    switch (section.__component) {
      case "shared.rich-text":
        return <RichText key={index} data={section as { body: string }} />;
      case "shared.slider":
        return <ImageSlider key={index} data={section as never} />;
      case "shared.quote":
        return <Quote key={index} data={section as never} />;
      case "shared.media":
        return <Media key={index} data={section as never} />;
      case "shared.video-embed":
        return <VideoEmbed key={index} data={section as never} />;
      default:
        return null;
    }
  }

  // Handle rich text format (Strapi rich text editor)
  if (section.type) {
    return renderRichTextNode(section as RichTextNode, index);
  }

  return null;
}
