import { Button } from "@components/ui/button";
import React, { useMemo } from "react";

interface AvatarProps {
  name: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "custom";
  width?: number;
  height?: number;
  onTap?: () => void;
}

const CustomAvatar: React.FC<AvatarProps> = ({
  name,
  className = "",
  size = "md",
  width,
  height,
  onTap,
}) => {
  const initials = useMemo(() => {
    if (!name.trim()) return "?";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }, [name]);

  const sizeClasses = {
    sm: "w-10 h-10 text-sm",
    md: "w-12 h-12 text-base",
    lg: "w-16 h-16 text-lg",
    xl: "w-24 h-24 text-xl",
    custom: "",
  };

  return (
    <Button
      variant="ghost" // Using ghost variant as base
      className={`
        flex items-center justify-center
        rounded-full bg-gray-200 font-semibold text-gray-700
        hover:bg-gray-300 transition-colors duration-200
        ${sizeClasses[size]} 
        ${className}
      `}
      style={{
        ...(size === "custom" && width ? { width: `${width}px` } : {}),
        ...(size === "custom" && height ? { height: `${height}px` } : {}),
      }}
      title={name}
      onClick={onTap}
      aria-label={`User avatar for ${name}`}
    >
      {initials}
    </Button>
  );
};

export default CustomAvatar;
