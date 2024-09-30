import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient(); 

export async function createGenero(genero) {
    return prisma.genero.create({
        data: {nome: genero.nome, descricao: genero.descricao}
    });
}

export async function getGeneros() {
    return prisma.genero.findMany();
}

export async function getGeneroByNome(nome) {
    return prisma.genero.findUnique({where: {nome}});
}

export async function deleteGenero(id) {
    let countFilmes = await prisma.filme.count({where: {generoId: id}});
    if (countFilmes > 0) {
        throw new Error('Existem filmes associados a este gênero');
    }
    return prisma.genero.delete({where: {id}});
}

export async function updateGenero(id, genero) {
    return prisma.genero.update({
        where: {id},
        data: genero
    });
}
