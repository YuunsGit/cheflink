"use client";

import { toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import { login } from "@/api/auth";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/components/AuthProvider";

export default function LoginForm() {
  const user = useContext(AuthContext);
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user.authorized) router.push("/");
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const loginSubmit = await login({ email, password });
    setLoading(false);

    if (loginSubmit?.error) return toast.error(loginSubmit.error);
    toast.success(loginSubmit?.message);

    router.push("/");
    router.refresh();
  };

  return (
    <form className="mt-4 space-y-6" onSubmit={(e) => handleSubmit(e)}>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Email address
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full rounded-md border-0 px-2 py-1.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary-500"
          />
        </div>
      </div>

      <div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Password
          </label>
        </div>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full rounded-md border-0 px-2 py-1.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary-500"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={loading ? true : false}
          className="focus-visible:outline-secondary flex w-full justify-center rounded-md bg-secondary-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm transition-colors hover:bg-secondary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          {loading ? "Loading..." : "Sign in"}
        </button>
      </div>
    </form>
  );
}
