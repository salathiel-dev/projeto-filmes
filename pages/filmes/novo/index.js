import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import {useEffect, useState} from "react";
import {toast, Toaster} from "react-hot-toast";
import { useRouter } from "next/router";

const schema = yup.object().shape({
    titulo: yup.string().required("Título é obrigatório"),
    ano: yup.number().min(1900, "Ano deve ser maior que 1900").required("Ano é obrigatório"),
    sinopse: yup.string().required("A sinopse é obrigatória"),
    diretor: yup.string().required("Diretor é obrigatório"),
    genero: yup.number().required("Gênero é obrigatório"),
});

export default function CadastroFilmes() {
    const [generos, setGeneros] = useState([]); 
    const router = useRouter(); 

    useEffect(() => {
        const fetchGeneros = async () => {
            try {
                const response = await fetch("/api/generos");
                if (response.ok) {
                    const data = await response.json();
                    setGeneros(data);
                } else {
                    console.error('Erro ao buscar gêneros:', response);
                }
            } catch (error) {
                console.error('Erro ao buscar gêneros:', error);
            }
        };
        fetchGeneros();
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        fetch("/api/filmes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                titulo: data.titulo,
                ano: data.ano,
                sinopse: data.sinopse,
                diretor: data.diretor,
                generoId: data.genero,
            }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                return response.json().then((error) => Promise.reject(error));
            })
            .then((result) => {
                console.log('Cadastro de filme bem-sucedido:', result);
                toast.success('Filme cadastrado com sucesso!');
                setTimeout(() => {
                    router.push('/filmes'); 
                }, 2000);
            })
            .catch((error) => {
                console.error('Erro ao cadastrar o filme:', error);
                toast.error('Erro ao cadastrar o filme');
            });
    };

    return (
        <main className="min-h-screen bg-gradient-to-r from-gary-400 to-gray-600 p-8 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <Toaster position="top-right" />
                <h1 className="text-center mb-6 font-extrabold text-2xl text-gray-800">Cadastro de Filmes</h1>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col w-full"
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

                    <label htmlFor="sinopse" className="mt-4 mb-2 font-semibold text-gray-700">Sinopse</label>
                    <textarea
                        {...register("sinopse")}
                        className={`border-2 p-3 rounded-lg transition duration-200 ${errors.sinopse ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'}`}
                        id="sinopse"
                        rows="4"
                        placeholder="Digite a sinopse do filme"
                    />
                    {errors.sinopse && <span className="text-red-500 text-sm">{errors.sinopse.message}</span>}

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
