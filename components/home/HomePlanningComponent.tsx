import React from "react";
import Image from "next/image";

export const HomePlanningComponent = () => {
  return (
    <div className="max-w-[1080px] items-center justify-center mx-auto px-5">
      <div className="flex flex-col items-center justify-center mb-15">
        <h2 className="text-lg font-bold bg-gradient-to-r from-teal-600 to-orange-500 bg-clip-text text-transparent mb-2">
          PLANNING AHEAD
        </h2>
        <h3 className="text-3xl text-center md:text-4xl font-semibold text-black">
          Let’s review your checklist of everything
        </h3>
      </div>
      <Image
        src="/home/planning.png"
        alt="planning"
        width={1080}
        height={400}
        className="object-contain"
      />
    </div>
  );
};
