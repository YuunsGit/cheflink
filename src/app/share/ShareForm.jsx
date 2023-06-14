"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/components/AuthProvider";
import { PhotoIcon } from "@heroicons/react/24/solid";
import {
  BookOpenIcon,
  PlusCircleIcon,
  MinusCircleIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { blobToBase64, formatBytes } from "@/api/utils";
import { createRecipe } from "@/api/recipe";

export default function ShareForm() {
  const user = useContext(AuthContext);
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [ingredientInput, setIngredientInput] = useState("");
  const [ingredients, setIngredients] = useState(new Set());
  const [image, setImage] = useState({});
  const [stepInput, setStepInput] = useState("");
  const [steps, setSteps] = useState(new Set());

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user.authorized) router.push("/login");
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    maxFiles: 1,
    maxSize: 2_000_000,
    multiple: false,
    onDrop: (files) => handleUpload(files[0]),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (ingredients.size === 0) {
      return toast.error("Enter at least 1 ingredient.");
    }
    if (steps.size === 0) {
      return toast.error("Enter at least 1 step.");
    }

    setLoading(true);
    const recipe = await createRecipe({
      userId: BigInt(user.userId),
      image: image.base64,
      ingredients: [...ingredients],
      steps: [...steps],
      title,
    });
    if (recipe?.error) {
      setLoading(false);
      return toast.error(recipe?.error);
    }
    toast.success(recipe?.message);
    router.push(`/recipes/${recipe.slug}`);
  };

  const handleUpload = async (upload) => {
    if (!upload) {
      toast.error("PNG, JPG up to 2MB");
      return;
    }
    const base64 = await blobToBase64(upload);
    setImage({
      name:
        upload.name.length > 20
          ? upload.name.slice(0, 20 - 1) + "…"
          : upload.name,
      size: formatBytes(upload.size),
      base64,
    });
  };

  const addIngredient = () => {
    if (!ingredientInput) return;
    setIngredients(new Set(ingredients).add(ingredientInput));
    setIngredientInput("");
  };

  const removeIngredient = (i) => {
    const newSet = new Set(ingredients);
    newSet.delete(i);
    setIngredients(newSet);
  };

  const addStep = () => {
    if (!stepInput) return;
    setSteps(new Set(steps).add(stepInput));
    setStepInput("");
  };

  const removeStep = (i) => {
    const newSet = new Set(steps);
    newSet.delete(i);
    setSteps(newSet);
  };

  return (
    <form className="my-20" onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-gray-900/10 pb-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold leading-7 text-gray-900">
                Share Recipe
              </h1>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Share your favourite recipe in detail.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <Link
                href="/"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="rounded-md bg-secondary-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-secondary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-500"
              >
                {loading ? "Loading…" : "Save & Share"}
              </button>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
            <div className="col-span-full">
              <label
                htmlFor="title"
                className="block font-semibold leading-6 text-gray-900"
              >
                Recipe name
              </label>
              <div className="mt-2">
                <div className="flex items-center gap-x-2 rounded-md px-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-secondary-500">
                  <BookOpenIcon className="h-6 w-6 text-gray-400" />
                  <input
                    type="text"
                    name="title"
                    id="title"
                    autoComplete="off"
                    required
                    onChange={(e) => setTitle(e?.target?.value)}
                    value={title}
                    className="block w-full border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Vintage Chocolate Chip Cookies"
                  />
                </div>
              </div>
            </div>

            <div className="w-full">
              <label
                htmlFor="ingredients"
                className="block font-semibold leading-6 text-gray-900"
              >
                Ingredients
              </label>
              <ul className="mt-2 space-y-1">
                {[...ingredients].map((i) => (
                  <li
                    key={i}
                    className="group flex justify-between rounded border px-2 py-1"
                  >
                    <p>{i}</p>
                    <button type="button" onClick={() => removeIngredient(i)}>
                      <MinusCircleIcon className="h-6 w-6 text-red-500 opacity-0 transition group-hover:opacity-100" />
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-2 flex items-center gap-x-2 rounded-md px-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-secondary-500">
                <button type="button" onClick={addIngredient}>
                  <PlusCircleIcon className="h-6 w-6 text-gray-400 transition-colors hover:text-secondary-500" />
                </button>
                <input
                  type="text"
                  name="ingredients"
                  id="ingredients"
                  autoComplete="off"
                  onChange={(e) => setIngredientInput(e?.target?.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addIngredient();
                    }
                  }}
                  value={ingredientInput}
                  placeholder="Add ingredient"
                  className="block w-full border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="w-full">
              <label
                htmlFor="cover-photo"
                className="block font-semibold leading-6 text-gray-900"
              >
                Recipe photo
              </label>
              {Object.keys(image).length !== 0 ? (
                <div className="relative mt-2 flex items-center gap-x-3 rounded-md border p-2 shadow-sm">
                  <div
                    style={{ backgroundImage: `url(${image.base64})` }}
                    className="h-20 w-20 rounded bg-cover bg-center"
                  />
                  <div>
                    <h3 className="text-md font-semibold">{image.name}</h3>
                    <p className="text-sm">{image.size}</p>
                  </div>
                  <button
                    onClick={() => setImage({})}
                    type="button"
                    className="absolute right-2 top-2"
                  >
                    <XMarkIcon className="h-5 w-5 text-gray-600 hover:text-red-500" />
                  </button>
                </div>
              ) : (
                <div
                  {...getRootProps()}
                  className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
                >
                  <input {...getInputProps()} />
                  <div className="text-center">
                    <PhotoIcon
                      className="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <span className="cursor-pointer font-semibold text-secondary-600 hover:text-secondary-500">
                        Upload a file
                      </span>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG up to 2MB
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="col-span-full w-full">
              <label
                htmlFor="steps"
                className="block font-semibold leading-6 text-gray-900"
              >
                Steps
              </label>
              <ul className="mt-2 space-y-1">
                {[...steps].map((s, i) => (
                  <li
                    key={s}
                    className="group flex flex-auto items-center justify-between gap-x-2 rounded border px-2 py-1"
                  >
                    <div className="h-full w-6 self-stretch">
                      <p className="mb-auto w-6 text-center text-2xl font-black text-gray-500">
                        {i + 1}
                      </p>
                    </div>
                    <p className="flex-grow break-words break-all">{s}</p>
                    <button type="button" onClick={() => removeStep(s)}>
                      <MinusCircleIcon className="h-6 w-6 text-red-500 opacity-0 transition group-hover:opacity-100" />
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-2 flex items-center gap-x-2 rounded-md pl-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-secondary-500">
                <button type="button" onClick={addStep}>
                  <PlusCircleIcon className="h-6 w-6 text-gray-400 transition-colors hover:text-secondary-500" />
                </button>
                <textarea
                  name="steps"
                  id="steps"
                  rows="2"
                  autoComplete="off"
                  onChange={(e) => setStepInput(e?.target?.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addStep();
                    }
                  }}
                  value={stepInput}
                  placeholder="Add step"
                  wrap="hard"
                  className="block w-full resize overflow-hidden whitespace-pre break-all border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
