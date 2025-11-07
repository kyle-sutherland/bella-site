"use client";
import { useState } from "react";
import { getStrapiMedia } from "../utils/api-helpers";
import Image from "next/image";
import Win95Button from "./win95/Win95Button";

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
    <div className="win95-panel" style={{ margin: "16px 0" }}>
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
            style={{ border: "1px solid #000" }}
          />
        </a>
      )}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
        <Win95Button
          onClick={goToPrevious}
          aria-label="Previous image"
        >
          ◄ Previous
        </Win95Button>

        <div style={{ display: "flex", gap: "4px", justifyContent: "center" }}>
          {images.map((_, index) => (
            <Win95Button
              key={index}
              onClick={() => setCurrentIndex(index)}
              variant={currentIndex === index ? "default" : "normal"}
              aria-label={`Go to image ${index + 1}`}
            >
              {index + 1}
            </Win95Button>
          ))}
        </div>

        <Win95Button
          onClick={goToNext}
          aria-label="Next image"
        >
          Next ►
        </Win95Button>
      </div>
      {currentImage.attributes.caption && (
        <div className="win95-panel-sunken" style={{ padding: "8px", fontSize: "12px", marginTop: "8px" }}>
          {currentImage.attributes.caption}
        </div>
      )}
    </div>
  );
}
