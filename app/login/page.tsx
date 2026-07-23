"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {

  const router = useRouter();

  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");

  async function login() {

    const { data, error } =
      await supabase
        .from("alumnos")
        .select("*")
        .eq("dni", dni)
        .eq("password", password)
        .single();

    if (error || !data) {
      alert("DNI o contraseña incorrectos");
      return;
    }

    localStorage.setItem(
      "alumno",
      JSON.stringify(data)
    );

    router.push("/test");
  }

  return (
    <main className="min-h-screen flex items-center justify-center">

      <div className="w-96 space-y-3">

        <h1 className="text-3xl font-bold">
          Iniciar Sesión
        </h1>

        <input
          placeholder="DNI"
          className="border p-2 w-full"
          value={dni}
          onChange={(e)=>setDni(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="border p-2 w-full"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="bg-green-600 text-white p-2 w-full"
        >
          Ingresar
        </button>

      </div>

    </main>
  );
}