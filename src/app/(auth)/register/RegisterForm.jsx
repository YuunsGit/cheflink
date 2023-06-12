"use client";

import { toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import { register as registerUser } from "@/api/auth";
import { joiResolver } from "@hookform/resolvers/joi";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/components/AuthProvider";
import { useForm } from "react-hook-form";
import { userSchema } from "@/api/joi";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";

export default function RegisterForm() {
  const user = useContext(AuthContext);
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: joiResolver(userSchema) });

  useEffect(() => {
    if (user.authorized) router.push("/");
  });

  const onSubmit = async (data) => {
    setLoading(true);
    const registerSubmit = await registerUser(data);

    if (registerSubmit?.error) {
      setLoading(false);
      return toast.error(registerSubmit.error);
    }
    toast.success(registerSubmit?.message);

    router.push("/login");
    router.refresh();
  };

  return (
    <form className="mt-4 space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label
          htmlFor="username"
          className="flex justify-between text-sm font-medium leading-6 text-gray-900"
        >
          <p>Username</p>
          {errors.username && (
            <div className="flex items-center gap-x-1 rounded-md bg-red-100 px-2 font-semibold text-red-500">
              <ExclamationCircleIcon className="h-4 w-4" />
              {errors.username?.message}
            </div>
          )}
        </label>
        <div className="mt-2">
          <input
            id="username"
            name="username"
            type="username"
            autoComplete="username"
            required
            {...register("username")}
            className="block w-full rounded-md border-0 px-2 py-1.5 leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary-500"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="flex justify-between text-sm font-medium leading-6 text-gray-900"
        >
          <p>Email address</p>
          {errors.email && (
            <div className="flex items-center gap-x-1 rounded-md bg-red-100 px-2 font-semibold text-red-500">
              <ExclamationCircleIcon className="h-4 w-4" />
              {errors.email?.message}
            </div>
          )}
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            {...register("email")}
            className="block w-full rounded-md border-0 px-2 py-1.5 leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary-500"
          />
        </div>
      </div>

      <div>
        <div>
          <label
            htmlFor="password"
            className="flex justify-between text-sm font-medium leading-6 text-gray-900"
          >
            <p>Password</p>
            {errors.password && (
              <div className="flex items-center gap-x-1 rounded-md bg-red-100 px-2 font-semibold text-red-500">
                <ExclamationCircleIcon className="h-4 w-4" />
                {errors.password?.message}
              </div>
            )}
          </label>
        </div>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            {...register("password")}
            className="block w-full rounded-md border-0 px-2 py-1.5 leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary-500"
          />
        </div>
      </div>

      <div>
        <div>
          <label
            htmlFor="confirmPwd"
            className="flex justify-between text-sm font-medium leading-6 text-gray-900"
          >
            <p>Confirm password</p>
            {errors.confirmPwd && (
              <div className="flex items-center gap-x-1 rounded-md bg-red-100 px-2 font-semibold text-red-500">
                <ExclamationCircleIcon className="h-4 w-4" />
                {errors.confirmPwd?.message}
              </div>
            )}
          </label>
        </div>
        <div className="mt-2">
          <input
            id="confirmPwd"
            name="confirmPwd"
            type="password"
            autoComplete="off"
            required
            {...register("confirmPwd")}
            className="block w-full rounded-md border-0 px-2 py-1.5 leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary-500"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className="focus-visible:outline-secondary flex w-full justify-center rounded-md bg-secondary-500 px-3 py-1.5 font-semibold leading-6 text-white shadow-sm transition-colors hover:bg-secondary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          {loading ? "Loading…" : "Register"}
        </button>
      </div>
    </form>
  );
}
