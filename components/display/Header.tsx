import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import React from "react";
import CardIcon from "../../public/icon/CardIcon";
import HomeIcon from "../../public/icon/HomeIcon";
import SunIcon from "../../public/icon/SunIcon";
import { useAppDispatch, useAppSelector } from "../../hooks/useDispatch";
import { change } from "../../features/nigthLifeSlice";

export default function Header() {
  const NightState = useAppSelector((state) => state.night.value.isNight);

  const dispatch = useAppDispatch();
  const headersButtons = [
    { name: "/Card", icon: CardIcon, Link: true },
    { name: "/", icon: HomeIcon, Link: true },

    {
      name: "contrast",
      icon: SunIcon,
      click: () => {
        dispatch(change);
      },
    },
  ];

  return (
    <div className="h-14 w-full  bottom-2 z-50 lg:top-0   fixed lg:p-0 p-2">
      <div
        className={`backdrop-blur-sm h-full  border ${
          NightState ? "border-gray-800" : " border-gray-300 lg:border-gray-300"
        } duration-300 rounded-full lg:rounded-none lg:border-x-0 lg:border-t-0 flex items-center justify-around`}
      >
        {headersButtons.map((item) => {
          if (item.Link) {
            return (
              <Link href={item.name} key={item.name}>
                {item.icon("fill-green-400", "20", "20")}
              </Link>
            );
          } else
            return (
              <button
                key={item.name}
                onClick={() => {
                  if (!item.Link) {
                    dispatch(change());
                  }
                }}
              >
                {item.name === "contrast"
                  ? item.icon(
                      `duration-300 ${
                        !NightState
                          ? "fill-green-400"
                          : "fill-green-400 rotate-90"
                      }`,
                      "20",
                      "20"
                    )
                  : item.icon("fill-green-400", "20", "20")}
              </button>
            );
        })}
      </div>
    </div>
  );
}
