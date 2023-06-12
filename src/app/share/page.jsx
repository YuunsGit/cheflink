import ShareForm from "./ShareForm";

export const metadata = {
  title: "Share Recipe",
};

export function Share() {
  return (
    <main className="mx-auto w-full max-w-4xl flex-grow">
      <ShareForm />
    </main>
  );
}
