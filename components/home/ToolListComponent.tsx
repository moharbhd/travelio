import React from "react";
import CustomCardV2Component from "./CustomCardV2Component";

function ToolListComponent() {
  return (
    <div className="max-w-[1080px] mx-auto px-5">
      <div className="flex flex-col">
        <h2 className="w-30 text-[18px] font-bold bg-gradient-to-r from-teal-600 to-orange-500 bg-clip-text text-transparent mb-2">
          TOOL LIST
        </h2>
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-10 items-start mb-10">
          <div className="lg:flex-2 w-full">
            <h3 className="text-[40px] md:text-4xl font-semibold text-black">
              Use our assortment of
              <br />
              travel plan tools
            </h3>
          </div>

          <div className="lg:flex-1 w-full">
            <p className="text-[18px] text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque pulvinar lorem justo, Lorem ipsum dolor sit amet.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-stretch justify-center gap-1.5">
        <CustomCardV2Component
          iconPath="/home/clock.png"
          title="Plan Trip Dates"
          subtitle="orem ipsum dolor sit amet, consectetur adipiscing elit. "
        />
        <CustomCardV2Component
          iconPath="/home/plane.png"
          title="Pay For Your Flights"
          subtitle="orem ipsum dolor sit amet, consectetur adipiscing elit. "
        />
        <CustomCardV2Component
          iconPath="/home/money.png"
          title="Plan Your Finances"
          subtitle="orem ipsum dolor sit amet, consectetur adipiscing elit. "
        />
      </div>
    </div>
  );
}

export default ToolListComponent;
