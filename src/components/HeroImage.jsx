"use client";

import Lottie from "lottie-react";
import heroAnimation from "@/lottie/Hero.json";

export default function HeroImage() {
  return <Lottie className="h-96" animationData={heroAnimation} loop={true} />;
}
