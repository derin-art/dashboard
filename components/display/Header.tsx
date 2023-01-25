import { motion } from "framer-motion";
import { useState } from "react";
import React from "react";
import CardIcon from "../../public/icon/CardIcon";
import HomeIcon from "../../public/icon/HomeIcon";
import SunIcon from "../../public/icon/SunIcon";

export default function Header() {
  const headersButtons = [
    { name: "card", icon: CardIcon },
    { name: "home", icon: HomeIcon },

    { name: "contrast", icon: SunIcon },
  ];

  return (
    <div className="h-14 w-full  bottom-2 z-50 lg:top-0   fixed lg:p-0 p-2">
      <div className="backdrop-blur-sm h-full  border border-gray-800 rounded-full lg:rounded-none lg:border-x-none lg:border-t-none flex items-center justify-around">
        {headersButtons.map((item) => {
          return (
            <button key={item.name}>
              {item.icon("fill-green-400", "20", "20")}
            </button>
          );
        })}
      </div>
    </div>
  );
}
