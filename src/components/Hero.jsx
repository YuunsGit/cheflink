import HeroImage from "@/components/HeroImage";
import { Squares2X2Icon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default async function Hero() {
  return (
    <div className="relative isolate mb-20 px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <HeroImage />
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Culinary inspiration just a click away
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Discover, share, and savor recipes from around the world. Connect with
          food lovers, spark inspiration, and elevate your culinary experiences.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/recipes"
            className="rounded-md bg-secondary-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-secondary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-500"
          >
            Browse Recipes
          </Link>
          <Link
            href="/register"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Join us <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
