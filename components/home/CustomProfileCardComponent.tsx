import React from "react";
import { Card, CardContent } from "@components/ui/card";
import Image from "@node_modules/next/image";

interface ProfileCardProps {
  avatarUrl: string;
  name: string;
  visited: string;
  quote: string;
  className?: string;
  avatarSize?: number;
}

const CustomProfileCardComponent = ({
  avatarUrl,
  name,
  visited,
  quote,
  className = "",
  avatarSize = 80,
}: ProfileCardProps) => {
  return (
    <Card className={`w-full flex flex-col items-center p-6 ${className}`}>
      <CardContent className="flex flex-col items-center gap-4">
        <div
          className="relative rounded-full overflow-hidden my-5"
          style={{ width: avatarSize, height: avatarSize }}
        >
          <Image
            src={avatarUrl}
            alt={`${name}'s avatar`}
            fill
            className="object-cover"
          />
        </div>

        <div className="text-center space-y-1">
          <h3 className="text-xl font-semibold">{name}</h3>
          <p className="text-sm text-gray-500">Visited: {visited}</p>
        </div>

        <div className="w-full border-t border-gray-200 my-2"></div>

        <p className="text-gray-700 text-center italic">"{quote}"</p>
      </CardContent>
    </Card>
  );
};

export default CustomProfileCardComponent;
