import { Board } from "@/components/Board";
import { Header } from "@/components/Header";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Board />
      </div>
    </main>
  );
}
