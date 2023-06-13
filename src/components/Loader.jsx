"use client";

import Lottie from "lottie-react";
import loadAnimation from "@/lottie/Loader.json";

export default function Loader() {
  return (
    <Lottie
      className="mx-auto my-auto max-w-lg"
      animationData={loadAnimation}
      loop={true}
    />
  );
}
