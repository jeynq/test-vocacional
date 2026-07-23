"use client";
import { useRouter }
from "next/navigation";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Pregunta = {
  id: number;
  pregunta: string;
  categoria_id: number;
  created_at?: string;
};

export default function TestPage() {
    const router = useRouter();
  const [preguntas, setPreguntas] = useState<Pregunta[]>([]);
const [respuestas, setRespuestas] = useState<
  Record<number, number>
>({});


  useEffect(() => {
    async function cargarPreguntas() {
      const { data, error } = await supabase
        .from("preguntas")
        .select("*");

      console.log("DATA:", data);
      console.log("ERROR:", error);

      if (data) {
        setPreguntas(data);
      }
    }

    cargarPreguntas();
  }, []);


function responder(
  preguntaId: number,
  valor: number
) {
  setRespuestas((prev) => ({
    ...prev,
    [preguntaId]: valor
  }));
}

async function finalizarTest() {

  const alumnoGuardado =
    localStorage.getItem("alumno");

  if (!alumnoGuardado) {
    alert("Debe iniciar sesión");
    return;
  }

  const alumno =
    JSON.parse(alumnoGuardado);
const puntajes: Record<number, number> = {};
preguntas.forEach((pregunta) => {

  const respuesta =
    respuestas[pregunta.id];

  if (!respuesta) return;

  if (!puntajes[pregunta.categoria_id]) {

    puntajes[pregunta.categoria_id] = 0;

  }

  puntajes[pregunta.categoria_id] +=
    respuesta;

});
console.log(puntajes);
const categoriaGanadora =
Object.entries(puntajes)
.sort((a,b)=>b[1]-a[1])[0];
console.log(
  "GANADOR",
  categoriaGanadora
);
const categorias: Record<number, string> = {

  1: "Tecnología",

  2: "Ingeniería",

  3: "Salud",

  4: "Arte",

  5: "Negocios",

  6: "Comunicación",

  7: "Educación",

  8: "Derecho"

};

const nombreCategoria =
categorias[
  Number(categoriaGanadora[0])
];
console.log(nombreCategoria);

await supabase
.from("resultados")
.insert({

  alumno_id:
  alumno.id,

  categoria_ganadora:
  nombreCategoria,

  puntaje:
  categoriaGanadora[1]

});

localStorage.setItem(
  "categoriaGanadora",
  nombreCategoria
);
router.push("/resultados");

  const respuestasGuardar =
    Object.entries(respuestas).map(
      ([preguntaId, valor]) => ({
        alumno_id: alumno.id,
        pregunta_id: Number(preguntaId),
        valor: Number(valor)
      })
    );

  console.log(respuestasGuardar);

  const { error } =
    await supabase
      .from("respuestas")
      .insert(respuestasGuardar);

  if (error) {
    alert(error.message);
    return;
  }

  alert(
    "Respuestas guardadas correctamente"
  );
}


  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Test Vocacional
      </h1>

      <p className="mb-4">
        Total de preguntas: {preguntas.length}
      </p>

<p className="mb-6">

  Respondidas:

  {Object.keys(respuestas).length}

  /

  {preguntas.length}

</p>

      {preguntas.map((pregunta) => (
        <div
          key={pregunta.id}
          className="border p-4 mb-4 rounded"
        >
          <h2 className="font-semibold">
            Pregunta {pregunta.id}
          </h2>

          <p>{pregunta.pregunta}</p>
          <div className="flex gap-2 mt-3">

  {[1,2,3,4,5].map((valor) => (

  <button
  key={valor}
  onClick={() =>
    responder(
      pregunta.id,
      valor
    )
  }
  className={`
    px-3 py-2 rounded border transition-all

    ${
      respuestas[pregunta.id] === valor
        ? "bg-blue-600 text-white border-blue-600"
        : "bg-gray-800 text-white border-gray-600 hover:bg-gray-700"
    }
  `}
>
  {valor}
</button>

  ))}

</div>
        </div>
      ))}
 <button
  onClick={finalizarTest}
  className="bg-green-600 text-white px-6 py-3 rounded"
>
  Finalizar Test
</button>

    </main>
    
  );
}