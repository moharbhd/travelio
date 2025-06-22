import React from "react";
import Image from "@node_modules/next/image";
import { Card, CardContent, CardHeader } from "@components/ui/card";

interface CardV1Props {
  iconPath: string;
  title: string;
  subtitle: string;
  className?: string;
  iconW?: number;
  iconH?: number;
}

const CustomCardV1Component = ({
  iconPath,
  title,
  subtitle,
  className = "",
  iconH,
  iconW,
}: CardV1Props) => {
  return (
    <Card className={`w-full flex flex-col items-start ${className}`}>
      <CardContent className="m-2">
        <Image
          src={iconPath}
          alt="icon"
          width={iconW ?? 35}
          height={iconH ?? 35}
          priority
          className="object-contain mb-20"
        />

        <div className="flex-1 text-start">
          <h3 className="text-4xl font-normal text-black mb-1.5">{title}</h3>
          <p className="text-gray-600 text-base line-clamp-3">{subtitle}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomCardV1Component;
