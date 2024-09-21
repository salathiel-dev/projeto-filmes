import Link from "next/link";

export default function Home() {
  return (
    <main className="">
        <h1 className="text-center mt-5 font-bold text-2xl">Gerenciamento de Filmes</h1>
        <div className="m-5 flex flex-row gap-5 h-100"> 
          <ClassCard label="Genêro" description="Cadastro de Gênero" href="/genero" />
          <ClassCard label="Filmes" description="Cadastro de Filmes" href="/filmes" />
        </div>

    </main>
  );
}

function ClassCard({label, description, href=""}) {
  return <Link href={href}>
    <div className="hover:bg-slate-300  hover:border-gray-600 col-span-1 border border-gray-400 bg-gray-300 h-24 rounded-md shadow-lg items-center flex justify-center m-2 flex-col shadow-blue-300 p-2 text-center">
    <span className="text-blue-950 font-bold text-lg">{label}</span>
    <span className="">{description}</span>
    </div>
  </Link>
}