import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-5xl font-bold">
        Test Vocacional
      </h1>

      <p className="text-gray-600">
        Descubre la carrera ideal para ti
      </p>

      <div className="flex gap-4">
        <Link href="/register">
          Registrarse
        </Link>

        <Link href="/login">
          Iniciar Sesión
        </Link>
      </div>
    </main>
  );
}