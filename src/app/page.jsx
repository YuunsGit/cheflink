import Hero from "@/components/Hero";

export async function Home() {
  return (
    <main className="mx-auto flex-grow">
      <Hero />
      <div className="h-24 w-full border-b border-t"></div>
    </main>
  );
}
