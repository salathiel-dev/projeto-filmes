import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";

const generos = [
];

const schema = yup.object().shape({
  titulo: yup.string().required("Título é obrigatório"),
  ano: yup.number().min(1900, "Ano deve ser maior que 1900").required("Ano é obrigatório"),
  lancamento: yup.string().required("Lançamento é obrigatório"), 
  diretor: yup.string().required("Diretor é obrigatório"),
  genero: yup.string().required("Gênero é obrigatório"),
});

export default function CadastroFilmes() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-white p-8 flex flex-col items-center">
      <h1 className="text-center mt-5 font-extrabold text-3xl text-gray-800">Cadastro de Filmes</h1>
      
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-96 bg-white border rounded-lg shadow-lg p-6 mt-5"
      >
        <label htmlFor="titulo" className="mb-2 font-semibold text-gray-700">Título</label>
        <input
          {...register("titulo")}
          className={`border-2 p-3 rounded-lg transition duration-200 ${errors.titulo ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'}`}
          id="titulo"
          type="text"
          placeholder="Digite o título do filme"
        />
        {errors.titulo && <span className="text-red-500 text-sm">{errors.titulo.message}</span>}

        <label htmlFor="ano" className="mt-4 mb-2 font-semibold text-gray-700">Ano de Lançamento</label>
        <input
          {...register("ano")}
          className={`border-2 p-3 rounded-lg transition duration-200 ${errors.ano ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'}`}
          id="ano"
          type="number"
          placeholder="Digite o ano"
        />
        {errors.ano && <span className="text-red-500 text-sm">{errors.ano.message}</span>}

        <label htmlFor="lancamento" className="mt-4 mb-2 font-semibold text-gray-700">Lançamento</label>
        <input
          {...register("lancamento")}
          className={`border-2 p-3 rounded-lg transition duration-200 ${errors.lancamento ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'}`}
          id="lancamento"
          type="text" 
          placeholder="Digite as informações de Lançamento"
        />
        {errors.lancamento && <span className="text-red-500 text-sm">{errors.lancamento.message}</span>}

        <label htmlFor="diretor" className="mt-4 mb-2 font-semibold text-gray-700">Diretor</label>
        <input
          {...register("diretor")}
          className={`border-2 p-3 rounded-lg transition duration-200 ${errors.diretor ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'}`}
          id="diretor"
          type="text"
          placeholder="Digite o nome do diretor"
        />
        {errors.diretor && <span className="text-red-500 text-sm">{errors.diretor.message}</span>}

        <label htmlFor="genero" className="mt-4 mb-2 font-semibold text-gray-700">Gênero</label>
        <select
          {...register("genero")}
          className={`border-2 p-3 rounded-lg transition duration-200 ${errors.genero ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'}`}
          id="genero"
        >
          <option value="">Selecione um gênero</option>
          {generos.map((genero) => (
            <option key={genero.id} value={genero.id}>{genero.nome}</option>
          ))}
        </select>
        {errors.genero && <span className="text-red-500 text-sm">{errors.genero.message}</span>}

        <div className="flex justify-between mt-6">
          <Link href="/" className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200">
            Cancelar
          </Link>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200">
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
