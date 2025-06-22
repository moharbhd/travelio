"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "@node_modules/next/image";
import { Button } from "@components/ui/button";
import { useTrip } from "@context/TripContext";
import { useRouter } from "@node_modules/next/navigation";
import { useAuth } from "@context/AuthContext";

const HeroComponent = () => {
  const router = useRouter();
  const { user } = useAuth();

  const cities = [
    {
      name: "Paris",
      image: "/paris/p-2.jpg",
      onTap: () => {
        if (user) {
          router.push(
            `/trips/new?destination=${encodeURIComponent("France, Paris")}`
          );
        } else {
          router.push("/auth/signup");
        }
      },
    },
    {
      name: "Damascus",
      image: "/damascus/d-4.jpg",
      onTap: () => {
        if (user) {
          router.push(
            `/trips/new?destination=${encodeURIComponent("Syria, Damascus")}`
          );
        } else {
          router.push("/auth/signup");
        }
      },
    },
    {
      name: "Tokyo",
      image: "/tokyo/tk-2.jpg",
      onTap: () => {
        if (user) {
          router.push(
            `/trips/new?destination=${encodeURIComponent("Tokyo, Japan")}`
          );
        } else {
          router.push("/auth/signup");
        }
      },
    },
  ];

  return (
    <section className="relative h-[800px] w-full overflow-visible">
      {/* Background Image */}
      <div className="absolute h-[720px] w-full inset-0">
        <Image
          src="/home/bg.jpg"
          alt="Travel background"
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="absolute top-80 left-0 right-0 flex justify-center pb-16">
        <h1 className="text-white font-bold text-7xl text-center">
          Travel Trip With AI
        </h1>
      </div>

      {/* Card Container - Simple and Responsive */}
      <div className="absolute bottom-[-64px] left-0 right-0 flex justify-center pb-16">
        <div className="w-full max-w-[960px] px-4">
          <Card className="bg-white w-full h-[280px] mx-auto shadow-lg rounded-[25px]">
            <CardContent className="h-full flex flex-col justify-between items-center p-1 text-center">
              <Image
                src="/plane_logo.svg"
                alt="Plane Logo"
                width={32}
                height={32}
                priority
                className="object-cover"
              />

              <p className="text-[32px] text-[#A8A29E] mb-4 md:mb-6">
                Where are you exploring next?
              </p>

              <div className="flex flex-wrap gap-2 justify-center">
                {cities.map((city) => (
                  <Button
                    key={city.name}
                    className="image_button"
                    onClick={city.onTap}
                    style={{ backgroundImage: `url(${city.image})` }}
                  >
                    <div className="absolute inset-0 bg-black/30"></div>
                    <span className="relative text-white">{city.name}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HeroComponent;
