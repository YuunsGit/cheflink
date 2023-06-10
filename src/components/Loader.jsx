"use client";

import Lottie from "lottie-react";
import loadAnimation from "@/lottie/Loader.json";

export default function Loader() {
  return (
    <Lottie
      className="my-auto h-72 "
      animationData={loadAnimation}
      loop={true}
    />
  );
}
