"use client";
import Link from "next/link";

export default function Home() {
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
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-blue-700 text-white">
           <tr>
                  <th
                    scope="col"
                    className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide"
                  >
                    Nome
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide"
                  >
                    Ano
                  </th>
                  <th
                    scope="col"
                    className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide"
                  >
                    Lançamento
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide"
                  >
                    Diretor
                  </th>
                  <th
                    scope="col"
                    className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide"
                  >
                    Gênero
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide"
                  >
                    Ações
                  </th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
  );
}
