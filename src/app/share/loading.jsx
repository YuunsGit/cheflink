import Loader from "@/components/Loader";

export default function Loading() {
  return (
    <div className="h-full">
      <Loader />
      <h4 className="text-center text-2xl italic">Loading…</h4>
    </div>
  );
}
