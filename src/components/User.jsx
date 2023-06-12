"use client";

import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import Link from "next/link";

export default function User() {
  const user = useContext(AuthContext);

  return (
    <Link
      href={user.authorized ? "/recipes" : "/login"}
      className="flex items-center gap-x-2"
    >
      <UserCircleIcon className="h-10 w-10" />
      <h2 className="font-semibold">
        {user.authorized ? user.username : "Sign In"}
      </h2>
    </Link>
  );
}
