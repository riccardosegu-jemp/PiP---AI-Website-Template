import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50">
      <h1 className="text-2xl font-bold mb-6">pip-template</h1>
      <div className="flex gap-4">
        <Button>shadcn funziona ✅</Button>
        <Button variant="outline">Outline</Button>
      </div>
    </div>
  );
}
