import React, { useEffect } from "react";
import {
  blueSkyLogo,
  blueSkyLogoCropped,
  cloud1,
  cloud2,
  cloudHero,
  textStar,
} from "../../assets";

const Hero = () => {
  return (
    <>
      <div className="hero-bg min-h-screen">
        <div className="container mx-auto px-4 text-center flex flex-col items-center justify-center min-h-screen pt-5 -mt-20">
          {/* Hero logo placeholder */}
          <div className="relative mb-6 flex flex-col items-center leading-none select-none">
            {/* Logo glow background */}
            <div className="logo-glow flex flex-col items-center">
              {/* Cloud near logo */}
              <img
                src={cloud2}
                alt="Cloud 2"
                className="absolute w-38 h-auto z-10 top-68 -left-25"
              />
              <img
                src={cloud1}
                alt="Cloud 1"
                className="absolute w-46 h-auto z-10 top-25 -right-40"
              />

              {/* BLUE SKY 3D-style text */}
              <img
                src={blueSkyLogoCropped}
                alt="BLUE SKY logo"
                draggable="false"
                className=""
              />

              {/* Themed Park | Events Center */}
              <div className="flex items-center justify-center gap-3 -mt-4">
                <span className="text-sm font-black tracking-widest text-navy-dark uppercase font-satoshi">
                  THEMED
                  <br />
                  PARK
                </span>
                <img
                  src={textStar}
                  alt="Star"
                  className="w-3 h-14 z-10"
                  draggable="false"
                />
                <span className="text-sm font-bold tracking-widest text-navy-dark uppercase">
                  EVENTS
                  <br />
                  CENTER
                </span>
              </div>
            </div>
          </div>

          {/* Tagline */}
          <p className="max-w-md text-navy-dark/80 text-base mb-10 z-1">
            Packed day full of excitement, laughter, and unforgettable memories
            in your life
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center gap-4 z-10">
            <button className=" fixed bottom-5 left-[45%] transform -translate-x-5/6 m-4 btn-secondary flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              BOOK NOW
            </button>
            <button className=" fixed bottom-5 right-[45%] transform translate-x-5/6 m-4 btn-primary flex items-center gap-2 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              CHECK STATUS
            </button>
          </div>
        </div>
      </div>
      {/* Bottom Clouds */}
      <div className="absolute bottom-0 left-0 w-full">
        <img
          src={cloudHero}
          alt="Cloud"
          className="absolute w-full h-auto -bottom-30 left-0 z-0"
        />
      </div>
    </>
  );
};

export default Hero;
