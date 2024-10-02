"use client";
import Link from "next/link";
import {useEffect, useState} from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [filmes, setFilmes] = useState([]);
  const router = useRouter();

    useEffect(() => {
        async function fetchFilmes() {
            const res = await fetch("/api/filmes");
            const data = await res.json();
            setFilmes(data);
        }

        fetchFilmes().then(() => console.log("Filmes carregados"));
    }, []);

    function handleAdd() {
        console.log("Adicionar filme");
        router.push("/filmes/novo");
    }

    function handleEdit(filme) {
        console.log("Editar filme", filme);
        router.push(`/filmes/editar/${filme.id}`);
    }

    function handleRemoveFilme(filme) {
        console.log("Remover filme", filme);
        fetch("/api/filmes/", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: filme.id }),
            })
            .then(() => {
                setFilmes((prev) => prev.filter((f) => f.id !== filme.id));
            })
            .catch((error) => console.log("Erro ao remover filme", error));
    }

  return (
    <div className="min-h-screen bg-blue-40 p-8">
       <h1 className="text-center mt-5 font-extrabold text-3xl text-black-800">Filmes</h1>
      <div className="flex justify-end mb-5">
        <Link href="/filmes/novo">
          <div className="transition duration-300 hover:bg-blue-500 hover:border-blue-700 border border-blue-700 bg-blue-800 shadow-lg rounded-lg text-white text-lg py-2 px-4">
            <span>Cadastrar Filme</span>
          </div>
        </Link>
      </div>

          <TabelaFilmes
                filmes={filmes}
                onEditFilme={handleEdit}
                onAdd={handleAdd}
                onRemoveFilme={handleRemoveFilme}
          />
    </div>
  );
}

function TabelaFilmes({ filmes, onEditFilme, onAdd, onRemoveFilme }) {
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
                                    Título
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                                >
                                    Ano
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                                >
                                    Sinopse
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                                >
                                    Diretor
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                                >
                                    Gênero
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
                            {filmes.map((filme) => (
                                <tr key={filme.id}>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                        {filme.id}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{filme.titulo}</td>
                                    <td className="whitespace-pre-wrap break-words px-3 py-4 text-sm text-gray-500">
                                        {filme.ano}
                                    </td>
                                    <td className="whitespace-pre-wrap break-words px-3 py-4 text-sm text-gray-500">
                                        {filme.sinopse}
                                    </td>
                                    <td className="whitespace-pre-wrap break-words px-3 py-4 text-sm text-gray-500">
                                        {filme.diretor}
                                    </td>
                                    <td className="whitespace-pre-wrap break-words px-3 py-4 text-sm text-gray-500">
                                        {filme.genero?.nome || "Sem gênero"}
                                    </td>
                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0 space-x-4">
                                        <button
                                            className="text-indigo-600 hover:text-indigo-900"
                                            onClick={() => typeof onEditFilme === "function" && onEditFilme(filme)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="text-red-600 hover:text-red-900"
                                            onClick={() => typeof onRemoveFilme === "function" && onRemoveFilme(filme)}
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