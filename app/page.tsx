"use client";

import React from "react";
import HeroComponent from "@components/home/HeroComponent";
import ReachesListComponent from "@components/home/ReachesListComponent";
import ToolListComponent from "@components/home/ToolListComponent";
import TestimonialsListComponent from "@components/home/TestimonialsListComponent";
import { HomePlanningComponent } from "@components/home/HomePlanningComponent";
import Navbar from "@components/NavBar";
import FooterComponent from "@components/FooterComponent";

const Home = () => {
  return (
    <>
      <div className="items-center justify-center">
        <Navbar className="text-white" />

        <HeroComponent />

        {/* Reaches */}
        <div className="h-[100px]"></div>
        <ReachesListComponent />

        {/* Tool List */}
        <div className="h-[150px]"></div>
        <ToolListComponent />

        {/* TESTIMONIALS */}
        <div className="h-[150px]"></div>
        <TestimonialsListComponent />

        {/* Last */}
        <div className="h-[200px]"></div>
        <HomePlanningComponent />

        <div className="h-[150px]"></div>
        <FooterComponent />
      </div>
    </>
  );
};

export default Home;
