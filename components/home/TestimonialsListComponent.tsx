import React from "react";
import CustomCardV2Component from "./CustomCardV2Component";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import CustomProfileCardComponent from "./CustomProfileCardComponent";

function TestimonialsListComponent() {
  return (
    <div className="max-w-[1080px] mx-auto px-5">
      <div className="flex flex-col">
        <h2 className="text-lg font-bold bg-gradient-to-r from-teal-600 to-orange-500 bg-clip-text text-transparent mb-2">
          TESTIMONIALS
        </h2>

        <div className="flex flex-col lg:flex-row gap-3 items-start lg:items-end justify-between mb-10">
          <div className="w-full lg:w-auto">
            <h3 className="text-3xl md:text-4xl font-semibold text-black">
              Let's see what fans of
              <br />
              Travelulu have to say
            </h3>
          </div>

          <div className="flex justify-between w-full lg:w-auto lg:ml-auto gap-4 mt-4 lg:mt-0">
            <button className="w-12 h-12 rounded-full border-2 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition">
              <FaArrowLeft className="text-gray-700 text-lg" />
            </button>
            <button className="w-12 h-12 rounded-full border-2 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition">
              <FaArrowRight className="text-gray-700 text-lg" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-stretch justify-center gap-1.5">
        <CustomProfileCardComponent
          name="Johan A"
          visited="Tokyo"
          avatarUrl="/faces/face-1.png"
          quote="orem ipsum dolor sit amet, consectetur adipiscing consectetur adipiscing elit."
        />
        <CustomProfileCardComponent
          name="Johana B"
          visited="Dubai"
          avatarUrl="/faces/face-2.png"
          quote="orem ipsum dolor sit amet, consectetur adipiscing consectetur adipiscing elit."
        />
        <CustomProfileCardComponent
          name="Blacko"
          visited="Paris"
          avatarUrl="/faces/face-3.png"
          quote="orem ipsum dolor sit amet, consectetur adipiscing consectetur adipiscing elit."
        />
      </div>
    </div>
  );
}

export default TestimonialsListComponent;
