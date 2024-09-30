import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";

// Esquema de validação com Yup
const schema = yup.object().shape({
  nome: yup.string().required("Nome do gênero é obrigatório"),
  descricao: yup.string().required("Descrição é obrigatória"),
});

export default function EditGenero() {
  const router = useRouter();
  const { id } = router.query; // Obtém o ID da URL
  const [genero, setGenero] = useState(null);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Buscar o gênero pelo ID quando a página carregar
  useEffect(() => {
    if (id) {
      async function fetchGenero() {
        const res = await fetch(`/api/generos/${id}`);
        const data = await res.json();
        setGenero(data);
        reset(data); // Preencher o formulário com os dados existentes
        setLoading(false);
      }

      fetchGenero().catch((err) => console.error("Erro ao buscar gênero:", err));
    }
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`/api/generos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Gênero atualizado com sucesso!");
        router.push("/generos"); // Redireciona para a lista de gêneros
      } else {
        const errorData = await response.json();
        console.error("Erro ao atualizar o gênero:", errorData);
      }
    } catch (error) {
      console.error("Erro ao realizar o request", error);
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <main className="min-h-screen bg-gradient-to-r from-gray-400 to-gray-600 p-8 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h1 className="text-center mb-6 font-extrabold text-2xl text-gray-800">Editar Gênero de Filmes</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <label htmlFor="nome" className="mb-2 font-semibold text-gray-700">Nome do Gênero</label>
          <input
            {...register("nome")}
            className={`border-2 p-3 mb-4 rounded-lg transition duration-200 ${errors.nome ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'}`}
            id="nome"
            type="text"
            placeholder="Digite o nome do gênero"
          />
          {errors.nome && <span className="text-red-500 text-sm">{errors.nome.message}</span>}

          <label htmlFor="descricao" className="mb-2 font-semibold text-gray-700">Descrição</label>
          <textarea
            {...register("descricao")}
            className={`border-2 p-3 mb-4 rounded-lg transition duration-200 ${errors.descricao ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'}`}
            id="descricao"
            rows="4"
            placeholder="Digite uma descrição do gênero"
          />
          {errors.descricao && <span className="text-red-500 text-sm">{errors.descricao.message}</span>}

          <div className="flex justify-between mt-6">
            <Link href="/generos" className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200">
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
