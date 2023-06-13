"use client";

import Link from "next/link";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";
import { AuthContext } from "@/components/AuthProvider";
import { deleteRecipe } from "@/api/recipe";
import { logout } from "@/api/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export function DeleteRecipeButton({ recipeId, userId }) {
  const user = useContext(AuthContext);
  const router = useRouter();

  return (
    <>
      {userId === user.userId && (
        <button
          type="button"
          onClick={async () => {
            const deleteSubmit = await deleteRecipe({ recipeId });
            toast.success(deleteSubmit?.message);
            router.refresh();
          }}
          className="absolute right-2 top-2 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-gray-400 text-white transition-all hover:bg-red-600"
        >
          <TrashIcon className="aspect-square h-5 w-5" />
        </button>
      )}
    </>
  );
}
