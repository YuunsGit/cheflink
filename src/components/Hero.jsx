import HeroImage from "@/components/HeroImage";
import { Squares2X2Icon } from "@heroicons/react/24/solid";

export default async function Hero() {
  return (
    <div className="mx-auto flex max-w-6xl justify-center">
      <HeroImage />
      <div className="my-4 flex w-1/2 flex-col justify-center gap-y-4">
        <h1 className="text-4xl font-black">Stuck in a cooking rut?</h1>
        <h2 className="text-xl">
          Say goodbye to mealtime monotony and unlock a world of culinary
          possibilities on ChefLink.
        </h2>
        <button className="mr-auto flex items-center gap-x-2 rounded bg-secondary-500 px-6 py-3 text-lg font-semibold text-white transition-colors before:content-[''] hover:bg-secondary-600">
          <Squares2X2Icon className="h-4 w-4" />
          <p>Browse Recipes</p>
        </button>
      </div>
    </div>
  );
}
