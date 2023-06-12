"use client";

import { ToastContainer } from "react-toastify";

export default function Container() {
  return (
    <ToastContainer
      position="bottom-left"
      theme="colored"
      newestOnTop={false}
    />
  );
}
