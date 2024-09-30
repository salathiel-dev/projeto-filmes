"use client";
import Link from "next/link";

export default function Home() {


  return (
    <div className="min-h-screen bg-white p-8 flex flex-col items-center">
      <h1 className="text-center mt-5 font-extrabold text-3xl text-gray-800">Gênero de Filmes</h1>
      
      <div className="flex justify-end w-full mb-5">
        <Link href="/genero/novo">
          <div className="transition duration-300 hover:bg-blue-500 hover:border-blue-700 border border-blue-700 bg-blue-800 shadow-lg rounded-lg text-white text-lg py-2 px-4">
            <span>Cadastrar gênero</span>
          </div>
        </Link>
      </div>

      <div className="overflow-x-auto w-full">
        <div className="inline-block min-w-full py-2 align-middle">
          <table className="min-w-full divide-y divide-gray-300 bg-white rounded-lg shadow-md">
            <thead className="bg-blue-400 text-white">
              <tr>
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
            <tbody className="divide-y divide-gray-300">
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}