import Image from "next/image";
import Link from "next/link";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import SearchBox from "./SearchBox";
import User from "./User";
import { useContext } from "react";
import { AuthContext } from "@/components/AuthProvider";
import { ShareRecipeButton } from "@/components/ShareRecipeButton";
import { listRecipes } from "@/api/recipe";
import { listComments } from "@/api/comment";

export default async function Header() {
  const recipes = await listRecipes();
  const comments = await listComments();

  return (
    <header className="mb-8 w-full bg-primary-700 text-white">
      <div className="mx-auto flex h-20 max-w-6xl flex-auto items-center justify-between gap-x-24">
        <Link href="/" className="block h-full">
          <Image
            src="/Logo.svg"
            alt="ChefLink logo"
            width={500}
            height={500}
            className="relative -bottom-4 h-24 w-auto"
            priority
          />
        </Link>
        <SearchBox recipes={recipes} comments={comments} />
        <div className="flex items-center gap-x-8">
          <ShareRecipeButton />
          <User />
        </div>
      </div>
    </header>
  );
}
