"use client";

import { useContext, useState } from "react";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import { StarIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { insertComment } from "@/api/comment";
import { AuthContext } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";

export default function CommentForm({ recipe }) {
  const user = useContext(AuthContext);
  const router = useRouter();

  const [content, setContent] = useState("");
  const [rating, setRating] = useState(-1);
  const [hover, setHover] = useState(-1);

  const [loading, setLoading] = useState(false);

  const handleComment = async (e) => {
    e.preventDefault();
    if (!user.authorized) {
      return router.push("/login");
    } else if (!content) {
      return toast.warn("Enter your comment");
    } else if (rating < 0) {
      return toast.warn("Enter your rating");
    }
    setLoading(true);
    const commentSubmit = await insertComment({
      userId: BigInt(user.userId),
      recipeId: BigInt(recipe.id),
      content,
      rating,
    });

    if (commentSubmit?.error) {
      setLoading(false);
      return toast.error(commentSubmit.error);
    }
    toast.success(commentSubmit?.message);
    setContent("");
    setRating(-1);
    router.refresh();
    setLoading(false);
  };

  return (
    <form onSubmit={handleComment} className="flex-grow space-y-2">
      <textarea
        className="block w-full rounded-md border-0 px-2 py-1.5 leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary-500"
        placeholder="Make a review"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex items-start justify-between">
        <div className="flex gap-x-1">
          <p>Give a score:</p>
          <div className="flex text-yellow-500">
            {[...Array(5)].map((star, index) => {
              index += 1;
              return (
                <button
                  type="button"
                  key={index}
                  onClick={() => setRating(index)}
                  onMouseEnter={() => setHover(index)}
                  onMouseLeave={() => setHover(rating)}
                >
                  {index <= (hover || rating) ? (
                    <StarSolid className="h-5 w-5" />
                  ) : (
                    <StarIcon className="h-5 w-5" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
        <button
          disabled={loading}
          className="rounded-md bg-secondary-500 px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-secondary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-500"
        >
          {loading ? "Loading…" : "Send Review"}
        </button>
      </div>
    </form>
  );
}
