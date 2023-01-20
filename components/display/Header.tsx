import { motion } from "framer-motion";
import { useState } from "react";
import React from "react";

export default function Header() {
  const [click, setClicked] = React.useState("");
  const Mas = ["red", "green"];

  return (
    <div className="h-14 w-full border-t  bottom-0 z-50 backdrop-blur-sm border-gray-500 fixed "></div>
  );
}
