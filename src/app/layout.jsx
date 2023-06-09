import Header from "@/components/Header";
import { Lato } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import Container from "@/components/ToastContainer";
import AuthProvider from "@/components/AuthProvider";
import { authorize } from "@/api/auth";
import Footer from "@/components/Footer";
import React from "react";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

export const metadata = {
  title: {
    template: "%s | ChefLink",
    default: "ChefLink",
  },
  description: "Recipe sharing platform for chefs all around the world.",
};

export default async function RootLayout({ children }) {
  const user = await authorize();

  return (
    <html className="bg-white" lang="en">
      <body
        className={`${lato.className} flex min-h-screen flex-auto flex-col`}
      >
        <AuthProvider user={user}>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
        <Container />
      </body>
    </html>
  );
}
