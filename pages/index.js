import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-blue-40 p-8">
      <h1 className="text-center mt-5 font-extrabold text-3xl text-black-800">
        Gerenciamento de Filmes
      </h1>
      <div className="mt-10 grid grid-cols-2 gap-6">
        <ClassCard label="Gênero" description="Gerenciar Gêneros" href="/genero" />
        <ClassCard label="Filmes" description="Gerenciar Filmes" href="/filmes" />
      </div>
    </main>
  );
}

function ClassCard({ label, description, href = "" }) {
  return (
    <Link href={href}>
      <div className="hover:bg-blue-200 hover:border-blue-400 border border-black-300 bg-white h-28 rounded-lg shadow-lg items-center flex justify-center m-4 flex-col transform transition-transform duration-200 hover:scale-105 p-4 text-center">
        <span className="text-black-400 font-semibold text-xl mb-1">
          {label}
        </span>
        <span className="text-black-700 text-sm">{description}</span>
      </div>
    </Link>
  );
}
