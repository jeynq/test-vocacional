"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {

  const [nombres, setNombres] = useState("");
  const [colegio, setColegio] = useState("");
  const [carrera, setCarrera] = useState("");
  const [dni, setDni] = useState("");
  const [celular, setCelular] = useState("");
  const [password, setPassword] = useState("");

  async function registrar() {

    if (
      !nombres ||
      !colegio ||
      !carrera ||
      !dni ||
      !celular ||
      !password
    ) {
      alert("Complete todos los campos");
      return;
    }

    const { error } =
      await supabase
        .from("alumnos")
        .insert({
          nombres,
          colegio,
          carrera_interes: carrera,
          dni,
          celular,
          password
        });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Alumno registrado correctamente");
  }

  return (
    <main className="min-h-screen flex items-center justify-center">

      <div className="w-96 space-y-3">

        <h1 className="text-3xl font-bold">
          Registro
        </h1>

        <input
          placeholder="Nombres completos"
          className="border p-2 w-full"
          value={nombres}
          onChange={(e)=>setNombres(e.target.value)}
        />

        <input
          placeholder="Nombre del colegio"
          className="border p-2 w-full"
          value={colegio}
          onChange={(e)=>setColegio(e.target.value)}
        />

        <input
          placeholder="Carrera de interés"
          className="border p-2 w-full"
          value={carrera}
          onChange={(e)=>setCarrera(e.target.value)}
        />

        <input
          placeholder="DNI"
          className="border p-2 w-full"
          value={dni}
          onChange={(e)=>setDni(e.target.value)}
        />

        <input
          placeholder="Celular"
          className="border p-2 w-full"
          value={celular}
          onChange={(e)=>setCelular(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="border p-2 w-full"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          onClick={registrar}
          className="bg-blue-600 text-white p-2 w-full"
        >
          Registrarse
        </button>

      </div>

    </main>
  );
}