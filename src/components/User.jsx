"use client";

import { UserCircleIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon as UserSolid } from "@heroicons/react/24/solid";
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import Link from "next/link";
import { logout } from "@/api/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function User() {
  const user = useContext(AuthContext);
  const router = useRouter();

  return (
    <>
      {user.authorized ? (
        <button
          type="button"
          onClick={async () => {
            const logoutSubmit = await logout();
            toast.success(logoutSubmit?.message);
            router.push("/");
            router.refresh();
          }}
          className="flex items-center gap-x-2"
        >
          <UserSolid className="h-10 w-10" />
          <h2 className="font-semibold">{user.username}</h2>
        </button>
      ) : (
        <Link href="/login" className="flex items-center gap-x-2">
          <UserCircleIcon className="h-10 w-10" />
          <h2 className="font-semibold">Sign In</h2>
        </Link>
      )}
    </>
  );
}
