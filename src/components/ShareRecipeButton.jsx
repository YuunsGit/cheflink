"use client";

import Link from "next/link";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";
import { AuthContext } from "@/components/AuthProvider";

export function ShareRecipeButton() {
  const user = useContext(AuthContext);

  return (
    <Link
      href={user.authorized ? "/share" : "/login"}
      className="flex items-center gap-x-3 rounded bg-secondary-500 px-5 py-2 font-bold transition-colors hover:bg-secondary-600"
    >
      <PencilSquareIcon className="h-6 w-6" />
      <h2>Share Recipe</h2>
    </Link>
  );
}
