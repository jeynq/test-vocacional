"use client";

import Link from "next/link";

export default function Dashboard() {

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">

      <h1 className="text-4xl font-bold">
        Dashboard
      </h1>

      <Link href="/test">
        Iniciar Test
      </Link>

    </main>
  );

}