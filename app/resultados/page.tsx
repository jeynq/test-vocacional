"use client";

import { useEffect, useState } from "react";

export default function ResultadosPage() {

  const [resultado, setResultado] =
    useState("");

    const carreras: Record<
  string,
  string[]
> = {

  Tecnología: [
    "Ingeniería de Software",
    "Ciencia de Datos",
    "Ciberseguridad",
    "Desarrollo Web"
  ],

  Ingeniería: [
    "Ingeniería Civil",
    "Ingeniería Industrial",
    "Ingeniería Mecánica"
  ],

  Salud: [
    "Medicina",
    "Psicología",
    "Enfermería"
  ],

  Arte: [
    "Diseño Gráfico",
    "Arquitectura",
    "Animación Digital"
  ],

  Negocios: [
    "Administración",
    "Marketing",
    "Finanzas"
  ],

  Comunicación: [
    "Periodismo",
    "Publicidad",
    "Comunicación Corporativa"
  ],

  Educación: [
    "Pedagogía",
    "Educación Inicial",
    "Educación Primaria"
  ],

  Derecho: [
    "Derecho",
    "Criminología",
    "Ciencias Políticas"
  ]

};

  useEffect(() => {

    const categoria =
      localStorage.getItem(
        "categoriaGanadora"
      );

    if (categoria) {

      setResultado(categoria);

    }

  }, []);

  return (

    <main className="p-8">

      <h1 className="text-4xl font-bold">

        Resultado Vocacional

      </h1>

      <p className="mt-6 text-2xl">

        Tu perfil principal es:

      </p>

      <h2 className="text-5xl font-bold text-blue-600 mt-4">

        {resultado}

      </h2>

      <div className="mt-10">

  <h3 className="text-2xl font-bold mb-4">

    Carreras recomendadas

  </h3>

  <ul className="space-y-3">

    {carreras[resultado]?.map(
      (carrera) => (

        <li
          key={carrera}
          className="border p-3 rounded"
        >
          ✅ {carrera}
        </li>

      )
    )}

  </ul>

</div>


    </main>

  );

}