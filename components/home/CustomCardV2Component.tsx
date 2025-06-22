import React from "react";
import Image from "@node_modules/next/image";
import { Card, CardContent, CardHeader } from "@components/ui/card";

interface CardV2Props {
  iconPath: string;
  title: string;
  subtitle: string;
  className?: string;
  iconH?: number;
}
const CustomCardV2Component = ({
  iconPath,
  title,
  subtitle,
  className = "",
  iconH = 175,
}: CardV2Props) => {
  return (
    <Card className={`w-full flex flex-col items-center ${className}`}>
      <CardContent>
        <div className="mb-6 flex justify-center w-full">
          <div className="relative w-full" style={{ height: iconH }}>
            <Image
              src={iconPath}
              alt="icon"
              fill
              priority
              className="object-contain p-3"
            />
          </div>
        </div>
        <div className="text-center w-full">
          <h3 className="text-2xl font-medium text-black mb-3">{title}</h3>
          <p className="text-gray-600 text-base mx-auto max-w-md">{subtitle}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomCardV2Component;
