import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export async function createGenero(genero) {
    return await prisma.genero.create({
        data: {
            nome: genero.nome,
            descricao: genero.descricao
        }
    });
}

export async function getGeneros() {
    return await prisma.genero.findMany({
        select: {
            id: true,
            nome: true,
            descricao: true
        }
    });
}

export async function deleteGenero(id) {
    let countFilmes = await prisma.filme.count({ where: { generoId: id } });
    if (countFilmes > 0) {
        throw { error: "Existem filmes associados a este gênero" };
    }
    return await prisma.genero.delete({ where: { id } });
}

export async function updateGenero(id, genero) {
    return await prisma.genero.update({
        where: { id },
        data: {
            nome: genero.nome,
            descricao: genero.descricao
        }
    });
}
