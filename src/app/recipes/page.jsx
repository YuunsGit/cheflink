import { listRecipes } from "@/api/recipe";
import { listUsers } from "@/api/user";
import Link from "next/link";
import { ChatBubbleOvalLeftIcon, StarIcon } from "@heroicons/react/20/solid";
import { listComments } from "@/api/comment";

export const metadata = {
  title: "Recipes",
};

export default async function Recipes() {
  const recipes = await listRecipes();
  const users = await listUsers();
  const comments = await listComments();

  return (
    <main className="mx-auto my-10 max-w-5xl flex-grow">
      <h1 className="text-2xl font-semibold">Recipes</h1>
      <div className="mt-8 grid w-full grid-cols-3 gap-6">
        {recipes.map((r) => (
          <div
            key={r.id}
            className="group h-fit w-full rounded-md bg-gray-50 shadow-md transition-shadow hover:shadow-lg"
          >
            <Link
              className="block h-44 overflow-hidden"
              prefetch={false}
              href={`/recipes/${r.slug}`}
            >
              <div
                style={{ backgroundImage: `url(${r.image})` }}
                className="h-full w-full rounded-t-md bg-cover bg-center transition-all group-hover:scale-110"
              />
            </Link>
            <div className="m-4">
              <Link
                href={`/recipes/${r.slug}`}
                prefetch={false}
                className="text-lg font-semibold"
              >
                {r.title}
              </Link>
              <p className="text-sm">
                by {users.find((u) => u.id === r.userId).username}
              </p>
              <div className="right-0 my-auto flex w-full items-end justify-end gap-x-4 text-gray-500">
                <div className="flex items-center justify-end gap-x-1">
                  <p>
                    {comments.reduce((accu, curr) => {
                      if (curr.recipeId === r.id) {
                        return accu + 1;
                      }
                      return accu;
                    }, 0) || 0}
                  </p>
                  <ChatBubbleOvalLeftIcon className="h-4 w-4" />
                </div>
                <div className="flex items-center justify-end gap-x-1">
                  <p>
                    {Math.round(
                      (comments.reduce((accu, curr) => {
                        if (curr.recipeId === r.id) {
                          return accu + curr.rating;
                        }
                        return accu;
                      }, 0) /
                        comments.filter((c) => c.recipeId === r.id).length) *
                        10
                    ) / 10 || `?`}
                  </p>
                  <StarIcon className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
