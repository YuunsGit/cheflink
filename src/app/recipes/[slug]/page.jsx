import { listRecipes } from "@/api/recipe";
import { listComments } from "@/api/comment";
import {
  ChatBubbleOvalLeftIcon,
  StarIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import {
  StarIcon as StarSolid,
  UserCircleIcon as UserSolid,
} from "@heroicons/react/24/solid";
import { listUsers } from "@/api/user";
import CommentForm from "./CommentForm";

export async function generateMetadata({ params }) {
  const recipes = await listRecipes({ slug: params.slug });
  const recipe = recipes[0];
  return {
    title: recipe.title,
  };
}

export default async function Recipe({ params }) {
  const recipes = await listRecipes({ slug: params.slug });
  const recipe = recipes[0];
  const comments = await listComments({ recipeId: recipe.id });
  const users = await listUsers();

  const star =
    Math.round(
      (comments.reduce((accu, curr) => {
        if (curr.recipeId === recipe.id) {
          return accu + curr.rating;
        }
      }, 0) /
        comments.filter((c) => c.recipeId === recipe.id).length) *
        10
    ) / 10;

  const reviews = comments.reduce((accu, curr) => {
    if (curr.recipeId === recipe.id) {
      return accu + 1;
    }
  }, 0);

  return (
    <main className="mx-auto w-full max-w-5xl flex-grow">
      <div className="mx-auto my-14 max-w-2xl space-y-6">
        <div>
          <h1 className="text-center text-3xl font-semibold">{recipe.title}</h1>
          <p className="mt-3 text-center">
            Written by {users.find((u) => u.id === recipe.userId).username}
          </p>
        </div>
        <div className="mx-auto grid w-full max-w-md grid-cols-2 justify-center">
          <div className="flex items-center justify-center gap-x-1 px-10 font-semibold">
            <ChatBubbleOvalLeftIcon className="h-6 w-6" />
            <p className="ml-1">{reviews || 0}</p>
            <span className="font-medium">Reviews</span>
          </div>
          <div className="flex items-center justify-center gap-x-1 border-l px-10 font-semibold">
            <StarIcon className="h-6 w-6" />
            <p className="ml-1">{star || "No"}</p>
            <span className="font-medium">Stars</span>
          </div>
        </div>
      </div>
      <div className="flex aspect-video w-full overflow-hidden rounded-md border">
        <div className="h-full w-1/2 space-y-3 bg-gray-50 p-10">
          <h3 className="text-lg font-semibold">Ingredients</h3>
          <ul className="flex flex-col px-3">
            {recipe.ingredients.map((i) => (
              <li key={i} className="border-b-2 border-dashed py-2">
                {i}
              </li>
            ))}
          </ul>
        </div>
        <div
          style={{ backgroundImage: `url(${recipe.image})` }}
          className="h-full w-1/2 bg-cover bg-center"
        />
      </div>
      <div className="mx-auto mt-14 w-full max-w-3xl space-y-8">
        <h2 className="text-2xl font-black">Directions</h2>
        {recipe.steps.map((step, i) => (
          <div key={step} className="w-full space-y-1">
            <h5 className="font-black">Step {i + 1}</h5>
            <p>{step}</p>
          </div>
        ))}
      </div>
      <hr className="my-14" />
      <div className="mx-auto w-full max-w-3xl space-y-8">
        <h2 className="text-2xl font-black">
          Reviews{" "}
          <span className="text-sm font-medium">
            &bull; {comments.length} Comments
          </span>
        </h2>
        <div className="flex flex-auto space-x-2">
          <UserIcon className="h-8 w-8" />
          <CommentForm recipe={recipe} />
        </div>
        {comments.length !== 0 ? (
          comments.reverse().map((comment) => (
            <div
              key={comment.id}
              className="flex w-full space-x-2 rounded-md border bg-gray-50 p-4"
            >
              <UserSolid className="h-8 w-8" />
              <div>
                <div className="flex items-center gap-x-2 space-y-1">
                  <h5 className="text-lg font-black">
                    {users.find((u) => u.id === comment.userId).username}
                  </h5>
                  <div className="flex text-yellow-500">
                    {[...Array(comment.rating)].map((_, index) => (
                      <StarSolid key={index} className="h-4 w-4" />
                    ))}
                    {[...Array(5 - comment.rating)].map((_, index) => (
                      <StarIcon key={index} className="h-4 w-4" />
                    ))}
                  </div>
                </div>
                <p>{comment.content}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full rounded-md border bg-gray-50 p-4 text-center font-semibold">
            No Reviews
          </div>
        )}
      </div>
    </main>
  );
}
