import React from "react";
import CustomCardV1Component from "./CustomCardV1Component";

function ReachesListComponent() {
  return (
    <div className="flex flex-col md:flex-row items-stretch justify-center gap-1.5 max-w-[1080px] px-5 mx-auto">
      <CustomCardV1Component
        iconPath="/svg/plane_up.svg"
        title="23,000"
        iconH={30}
        iconW={30}
        subtitle="Travel to over 23 thousand locations around the world."
      />
      <CustomCardV1Component
        iconPath="/svg/planet.svg"
        title="82,000"
        iconH={32}
        iconW={32}
        subtitle="Read tens of thousands of reviews of destinations."
      />
      <CustomCardV1Component
        iconPath="/svg/bick.svg"
        title="4,000,000"
        iconH={37}
        iconW={37}
        subtitle="Visited by millions of travelers every single day."
      />
    </div>
  );
}

export default ReachesListComponent;
