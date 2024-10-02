import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [generos, setGeneros] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchGeneros() {
      const res = await fetch("/api/generos");
      const data = await res.json();
      setGeneros(data);
    }

    fetchGeneros().then(() => console.log("Gêneros carregados"));
  }, []);

  function handleAdd() {
    console.log("Adicionar gênero");
    router.push("/genero/novo");
  }

  function handleEditGenero(genero) {
    router.push(`/genero/editar/${genero.id}`);
  }

  function handleRemoveGenero(genero) {
    console.log("Remover Genero", genero);
    fetch("/api/generos", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: genero.id }),
    })
      .then(() => {
        setGeneros((prev) => prev.filter((g) => g.id !== genero.id));
      })
      .catch((error) => console.error("Erro ao remover gênero:", error));
  }

  return (
    <div className="min-h-screen bg-white p-8 flex flex-col items-center">
      <h1 className="text-center mt-5 font-extrabold text-3xl text-gray-800">Gênero de Filmes</h1>
      <div className="flex justify-end w-full mb-5">
        <Link href="/genero/novo">
          <div className="transition duration-300 hover:bg-blue-500 hover:border-blue-700 border border-blue-700 bg-blue-800 shadow-lg rounded-lg text-white text-lg py-2 px-4 cursor-pointer">
            <span>Cadastrar gênero</span>
          </div>
        </Link>
      </div>

      <TabelaGeneros
        generos={generos}
        onEditGenero={handleEditGenero}
        onAdd={handleAdd}
        onRemoveGenero={handleRemoveGenero}
      />
    </div>
  );
}

function TabelaGeneros({ generos, onEditGenero, onAdd, onRemoveGenero }) {
  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none"></div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-0"
                  >
                    Id
                  </th>
                  <th
                    scope="col"
                    className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-0"
                  >
                    Nome
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                  >
                    Descrição
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                  >
                    Ação
                  </th>
                  <th scope="col" className="relative py-3 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Editar</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {generos.map((genero) => (
                  <tr key={genero.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {genero.id}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{genero.nome}</td>
                    <td className="whitespace-pre-wrap break-words px-3 py-4 text-sm text-gray-500">
                      {genero.descricao}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0 space-x-4">
                      <button
                        className="text-indigo-600 hover:text-indigo-900"
                        onClick={() => typeof onEditGenero === "function" && onEditGenero(genero)}
                      >
                        Editar
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() => typeof onRemoveGenero === "function" && onRemoveGenero(genero)}
                      >
                        Apagar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
