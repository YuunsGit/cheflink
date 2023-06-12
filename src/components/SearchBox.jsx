"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { ChatBubbleOvalLeftIcon, StarIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

export default function SearchBox({ recipes, comments }) {
  const [search, setSearch] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const handleSearch = (input) => {
    if (input === "") {
      setSearch([]);
      return;
    }
    const filtered = recipes.filter((r) =>
      r.title.toLowerCase().includes(input.toLowerCase())
    );
    setSearch(filtered);
  };

  return (
    <div className="flex flex-grow flex-col">
      <div className="flex gap-x-2 rounded bg-white px-2 py-2 text-black">
        <MagnifyingGlassIcon className="h-6 w-6" />
        <input
          type="search"
          autoComplete="off"
          className="w-full focus:outline-none"
          placeholder="Search recipes"
          onFocus={() => setExpanded(true)}
          onBlur={() => setExpanded(false)}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      {search.length > 0 && expanded && (
        <div className="relative z-20 translate-y-2 text-black">
          <ul className="absolute left-0 w-full space-y-4 rounded border bg-white px-2 py-2 shadow-lg">
            {search.map((recipe) => (
              <li className="group flex h-14 justify-between" key={recipe.id}>
                <div className="flex items-center gap-x-2">
                  <div
                    style={{ backgroundImage: `url(${recipe.image})` }}
                    className="h-14 w-14 rounded bg-cover bg-center transition-all"
                  />
                  <p className="text-md font-semibold">{recipe.title}</p>
                </div>
                <div className="my-auto flex flex-col items-stretch gap-y-1">
                  <div className="flex items-center justify-end gap-x-1">
                    <p>
                      {comments.reduce((accu, curr) => {
                        if (curr.recipeId === recipe.id) {
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
                          if (curr.recipeId === recipe.id) {
                            return accu + curr.rating;
                          }
                          return accu;
                        }, 0) /
                          comments.filter((c) => c.recipeId === recipe.id)
                            .length) *
                          10
                      ) / 10 || `-`}
                    </p>
                    <StarIcon className="h-4 w-4" />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
