import React, { useEffect, useState } from "react";
import { useTrip } from "@context/TripContext";
import Image from "@node_modules/next/image";

export default function TripLoadingComponent() {
  const { tripInput } = useTrip();
  const [index, setIndex] = useState(0);
  const [images, setImages] = useState<any[]>([]);

  const damascusImages = [
    "/damascus/d-3.jpg",
    "/damascus/d-4.jpg",
    "/damascus/d-2.jpg",
  ];
  const parisImages = ["/paris/p-1.jpg", "/paris/p-2.jpg", "/paris/p-3.jpg"];
  const tokyoImages = ["/tokyo/tk-1.jpg", "/tokyo/tk-2.jpg", "/tokyo/tk-3.jpg"];

  useEffect(() => {
    const destination = tripInput.destination?.toLowerCase() || "";

    if (destination.includes("paris")) {
      setImages(parisImages);
    } else if (destination.includes("damascus")) {
      setImages(damascusImages);
    } else if (destination.includes("tokyo")) {
      setImages(tokyoImages);
    } else {
      setImages([...tokyoImages, ...parisImages, ...damascusImages]);
    }
  }, [tripInput.destination]);

  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-60 h-90 rounded-2xl overflow-hidden shadow-lg">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Tokyo ${i}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded-full shadow">
          <Image
            className="w-8 h-8"
            src="/plane_logo.svg"
            alt="plane"
            width={20}
            height={20}
          ></Image>
        </div>
        <div className="absolute bottom-5 w-full text-center text-white text-lg font-semibold drop-shadow">
          {tripInput.destination}
        </div>
      </div>
      <div className="mt-4 text-gray-600 text-sm">
        Generating your Itinerary...
      </div>
    </div>
  );
}
