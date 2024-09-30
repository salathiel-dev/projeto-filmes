import { PrismaClient } from '@prisma/client'

export async function createGenero(genero) {
    const prisma = new PrismaClient();
    return prisma.genero.create({
        data: {nome: genero.nome, descricao: genero.descricao}
    });
}

export async function getGeneros() {
    const prisma = new PrismaClient();
    return prisma.genero.findMany();
}

export async function getGeneroByNome(nome) {
    const prisma = new PrismaClient();
    return prisma.genero.findUnique({where: {nome}});
}

export async function deleteGenero(id) {
    const prisma = new PrismaClient();
    let countFilmes = await prisma.filme.count({where: {generoId: id}});
    if (countFilmes > 0) {
        throw new Error('Existem filmes associados a este gênero');
    }
    return prisma.genero.delete({where: {id}});
}

export async function updateGenero(id, genero) {
    const prisma = new PrismaClient();
    return prisma.genero.update({where: {id}, data: genero});
}
