import Image from "next/image";
import RegisterForm from "./RegisterForm";

export const metadata = {
  title: "Register",
};

export default function Register() {
  return (
    <main className="my-20 flex-grow space-y-12">
      <Image
        src="/Register.svg"
        width={250}
        height={300}
        alt="Pizza picture"
        className="mx-auto drop-shadow-xl"
        priority
      />
      <div className="mx-auto">
        <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900">
          Create an account
        </h2>
        <div className="mx-auto mt-10 w-full max-w-sm">
          <RegisterForm />
        </div>
      </div>
    </main>
  );
}
