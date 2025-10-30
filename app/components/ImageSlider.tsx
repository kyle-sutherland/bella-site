"use client";
import { useState } from "react";
import { getStrapiMedia } from "../utils/api-helpers";
import Image from "next/image";

interface ImageType {
  id: number;
  attributes: {
    alternativeText: string | null;
    caption: string | null;
    url: string;
  };
}

interface SlidShowProps {
  files: {
    data: ImageType[];
  };
}

export default function ImageSlider({ data }: { data: SlidShowProps }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = data.files.data;

  if (!images || images.length === 0) return null;

  const currentImage = images[currentIndex];
  const imageUrl = getStrapiMedia(currentImage.attributes.url);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div style={{ border: "1px solid #000", margin: "16px 0", padding: "16px" }}>
      {imageUrl && (
        <a
          href={imageUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "block", cursor: "pointer", marginBottom: "16px" }}
        >
          <Image
            className="w-full object-cover"
            height={400}
            width={600}
            alt={currentImage.attributes.alternativeText || "image"}
            src={imageUrl}
          />
        </a>
      )}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            goToPrevious();
          }}
          className="link"
          style={{ cursor: "pointer" }}
        >
          &lt; Back
        </a>

        <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
          {images.map((_, index) => (
            <a
              key={index}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentIndex(index);
              }}
              className="link"
              style={{
                cursor: "pointer",
                fontWeight: currentIndex === index ? "bold" : "normal",
                textDecoration: currentIndex === index ? "underline" : "none",
              }}
            >
              {index + 1}
            </a>
          ))}
        </div>

        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            goToNext();
          }}
          className="link"
          style={{ cursor: "pointer" }}
        >
          Next &gt;
        </a>
      </div>
    </div>
  );
}
