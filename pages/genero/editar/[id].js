import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

// Validação de formulário com Yup
const schema = yup.object().shape({
  nome: yup.string().required("Nome do gênero é obrigatório"),
  descricao: yup.string().required("Descrição é obrigatória"),
});

export default function EditarGenero() {
  const router = useRouter();
  const { id } = router.query; // Pegando o ID do gênero da URL
  const [submitSuccess, setSubmitSuccess] = useState(null);
  const [loading, setLoading] = useState(true); // Para controlar o carregamento
  const [generoData, setGeneroData] = useState(null); // Para armazenar o gênero atual

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Função para buscar o gênero existente baseado no ID
  
  useEffect(() => {
    if (id) {
      async function fetchGenero() {
        try {
          const response = await fetch(`/api/generos?id=${id}`);
          const data = await response.json();
  
          // Preenche o formulário com os dados do gênero
          setValue("nome", data.nome);
          setValue("descricao", data.descricao);
          setLoading(false); // Desativa o estado de carregamento
        } catch (error) {
          console.error("Erro ao buscar gênero:", error);
          setSubmitSuccess("Erro ao buscar os dados do gênero.");
          setLoading(false);
        }
      }
  
      fetchGenero();
    }
  }, [id, setValue]);

  // Função para lidar com o envio do formulário atualizado
  const onSubmit = async (data) => {
    try {
      const response = await fetch(`/api/generos`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, ...data }),
      });

      if (response.ok) {
        const result = await response.json();
        setSubmitSuccess("Gênero atualizado com sucesso!");
        router.push("/genero/");
      } else {
        const errorData = await response.json();
        setSubmitSuccess(`Erro ao atualizar: ${errorData.message || "Erro desconhecido"}`);
      }
    } catch (error) {
      setSubmitSuccess(`Erro de rede: ${error.message}`);
    }
  };

  if (loading) {
    return <div>Carregando...</div>; // Mostra um indicador de carregamento enquanto busca o gênero
  }

  return (
    <main className="min-h-screen bg-gradient-to-r from-gary-400 to-gray-600 p-8 flex items-center justify-center">
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      <h1 className="text-center mb-6 font-extrabold text-2xl text-gray-800">Editar Gênero de Filmes</h1>

        {submitSuccess && (
          <div className={`text-center mb-4 ${submitSuccess.includes("sucesso") ? "text-green-500" : "text-red-500"}`}>
            {submitSuccess}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <label htmlFor="nome" className="mb-2 font-semibold text-gray-700">Nome do Gênero</label>
          <input
            {...register("nome")}
            className={`border-2 p-3 mb-4 rounded-lg transition duration-200 ${
              errors.nome ? "border-red-500" : "border-gray-300 focus:border-blue-500"
            }`}
            id="nome"
            type="text"
            placeholder="Digite o nome do gênero"
          />
          {errors.nome && <span className="text-red-500 text-sm">{errors.nome.message}</span>}

          <label htmlFor="descricao" className="mb-2 font-semibold text-gray-700">Descrição</label>
          <textarea
            {...register("descricao")}
            className={`border-2 p-3 mb-4 rounded-lg transition duration-200 ${
              errors.descricao ? "border-red-500" : "border-gray-300 focus:border-blue-500"
            }`}
            id="descricao"
            rows="4"
            placeholder="Digite uma descrição do gênero"
          />
          {errors.descricao && <span className="text-red-500 text-sm">{errors.descricao.message}</span>}

          <div className="flex justify-between mt-4">
            <Link href="/genero" className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200">
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
