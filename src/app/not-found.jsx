import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-full flex-grow place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-primary-700">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Sorry, we couldn&lsquo;t find the page you&lsquo;re looking for.
        </p>
        <div className="mt-10">
          <Link
            href="/"
            className="focus-visible:outline-secondary rounded-md bg-secondary-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-secondary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Go back home
          </Link>
        </div>
      </div>
    </main>
  );
}
