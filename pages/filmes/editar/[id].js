
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";

const schema = yup.object().shape({
  titulo: yup.string().required("Título é obrigatório"),
  ano: yup.number().min(1900, "Ano deve ser maior que 1900").required("Ano é obrigatório"),
  sinopse: yup.string().required("A sinopse é obrigatória"),
  diretor: yup.string().required("Diretor é obrigatório"),
  generoId: yup.number().required("Gênero é obrigatório"),
});

export default function EditarFilme() {
  const router = useRouter();
  const { id } = router.query; 
  const [generos, setGeneros] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [submitSuccess, setSubmitSuccess] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (id) {
      async function fetchFilme() {
        try {
          const filmeResponse = await fetch(`/api/filmes?id=${id}`);
          const filmeData = await filmeResponse.json();
          const generosResponse = await fetch("/api/generos");
          const generosData = await generosResponse.json();

          setGeneros(generosData); 
          setValue("titulo", filmeData.titulo);
          setValue("ano", filmeData.ano);
          setValue("sinopse", filmeData.sinopse);
          setValue("diretor", filmeData.diretor);
          setValue("generoId", filmeData.generoId);

          setLoading(false);
        } catch (error) {
          console.error("Erro ao buscar o filme:", error);
          setSubmitSuccess("Erro ao buscar os dados do filme.");
          setLoading(false);
        }
      }

      fetchFilme();
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`/api/filmes`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, ...data }), 
      });

      if (response.ok) {
        const result = await response.json();
        // setSubmitSuccess("Filme atualizado com sucesso!");
        toast.success("Filme atualizado com sucesso!");
        setTimeout(() => {
          router.push("/filmes");
        }, 1000);
      } else {
        const errorData = await response.json();
        // setSubmitSuccess(`Erro ao atualizar: ${errorData.message || "Erro desconhecido"}`);
        toast.error(`Erro ao atualizar: ${errorData.message || "Erro desconhecido"}`);
      }
    } catch (error) {
      setSubmitSuccess(`Erro de rede: ${error.message}`);
    }
  };

  if (loading) {
    return <div>Carregando...</div>; 
  }

  return (
    <main className="min-h-screen bg-gradient-to-r from-gary-400 to-gray-600 p-8 flex items-center justify-center">
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <Toaster position="top-center" />
      <h1 className="text-center mb-6 font-extrabold text-2xl text-gray-800">Editar Filmes</h1>


        {submitSuccess && (
          <div className={`text-center mb-4 ${submitSuccess.includes("sucesso") ? "text-green-500" : "text-red-500"}`}>
            {submitSuccess}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <label htmlFor="titulo" className="mb-2 font-semibold text-gray-700">Título</label>
          <input
            {...register("titulo")}
            className={`border-2 p-3 mb-4 rounded-lg transition duration-200 ${
              errors.titulo ? "border-red-500" : "border-gray-300 focus:border-blue-500"
            }`}
            id="titulo"
            type="text"
            placeholder="Digite o título do filme"
          />
          {errors.titulo && <span className="text-red-500 text-sm">{errors.titulo.message}</span>}

          <label htmlFor="ano" className="mt-4 mb-2 font-semibold text-gray-700">Ano de Lançamento</label>
          <input
            {...register("ano")}
            className={`border-2 p-3 rounded-lg transition duration-200 ${
              errors.ano ? "border-red-500" : "border-gray-300 focus:border-blue-500"
            }`}
            id="ano"
            type="number"
            placeholder="Digite o ano"
          />
          {errors.ano && <span className="text-red-500 text-sm">{errors.ano.message}</span>}

          <label htmlFor="sinopse" className="mt-4 mb-2 font-semibold text-gray-700">Sinopse</label>
          <textarea
            {...register("sinopse")}
            className={`border-2 p-3 rounded-lg transition duration-200 ${
              errors.sinopse ? "border-red-500" : "border-gray-300 focus:border-blue-500"
            }`}
            id="sinopse"
            rows="4"
            placeholder="Digite a sinopse do filme"
          />
          {errors.sinopse && <span className="text-red-500 text-sm">{errors.sinopse.message}</span>}

          <label htmlFor="diretor" className="mt-4 mb-2 font-semibold text-gray-700">Diretor</label>
          <input
            {...register("diretor")}
            className={`border-2 p-3 rounded-lg transition duration-200 ${
              errors.diretor ? "border-red-500" : "border-gray-300 focus:border-blue-500"
            }`}
            id="diretor"
            type="text"
            placeholder="Digite o nome do diretor"
          />
          {errors.diretor && <span className="text-red-500 text-sm">{errors.diretor.message}</span>}

          <label htmlFor="generoId" className="mt-4 mb-2 font-semibold text-gray-700">Gênero</label>
          <select
            {...register("generoId")}
            className={`border-2 p-3 rounded-lg transition duration-200 ${
              errors.generoId ? "border-red-500" : "border-gray-300 focus:border-blue-500"
            }`}
            id="generoId"
          >
            <option value="">Selecione um gênero</option>
            {generos.map((genero) => (
              <option key={genero.id} value={genero.id}>
                {genero.nome}
              </option>
            ))}
          </select>
          {errors.generoId && <span className="text-red-500 text-sm">{errors.generoId.message}</span>}

          <div className="flex justify-between mt-6">
            <Link href="/filmes" className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200">
              Cancelar
            </Link>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200">
              Salvar
            </button>
            </div>
        </form>
        </div>
    </main>
  );
}
