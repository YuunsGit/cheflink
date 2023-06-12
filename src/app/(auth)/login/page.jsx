import Image from "next/image";
import LoginForm from "./LoginForm";
import Link from "next/link";

export const metadata = {
  title: "Sign In",
};

export default function Login() {
  return (
    <main className="my-20 flex-grow space-y-12">
      <Image
        src="/Login.svg"
        width={250}
        height={150}
        alt="Pasta picture"
        className="mx-auto drop-shadow-lg"
        priority
      />
      <div className="mx-auto">
        <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900">
          Sign into your account
        </h2>
        <div className="mx-auto mt-10 w-full max-w-sm">
          <LoginForm />

          <p className="mt-4 text-center text-sm text-gray-500">
            Not registered?{" "}
            <Link
              href="/register"
              className="font-semibold leading-6 text-secondary-500 transition-colors hover:text-secondary-600"
            >
              Register now
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
