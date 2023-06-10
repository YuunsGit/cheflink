import Image from "next/image";
import Link from "next/link";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { listRecipes } from "@/api/recipe";
import SearchBox from "./SearchBox";
import { listComments } from "@/api/comment";
import User from "./User";

export default async function Header() {
  const recipes = await listRecipes();
  const comments = await listComments();

  return (
    <header className="w-full bg-primary-700 text-white">
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
          <Link
            href="/share"
            className="flex items-center gap-x-3 rounded bg-secondary-500 px-5 py-2 font-bold transition-colors hover:bg-secondary-600"
          >
            <PencilSquareIcon className="h-6 w-6" />
            <h2>Share Recipe</h2>
          </Link>
          <User />
        </div>
      </div>
      <div className="w-full border-b bg-white text-black">
        <ul className="mx-auto flex max-w-4xl flex-auto justify-evenly py-4 text-center font-semibold">
          <li className="flex-grow border-r">
            <Link href="/recipes" className="h-full">
              BEST RECIPES
            </Link>
          </li>
          <li className="flex-grow border-r">
            <Link href="/users" className="h-full">
              POPULAR RECIPES
            </Link>
          </li>
          <li className="flex-grow">
            <Link href="/users" className="h-full">
              CHEFS
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
