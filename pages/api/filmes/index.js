import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { id } = req.query; 

    if (req.method === 'POST') {
        const { titulo, ano, sinopse, diretor, generoId } = req.body;
        if (!titulo || !ano || !sinopse || !diretor || !generoId) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
        }
        try {
            const filme = await prisma.filme.create({
                data: { titulo, ano, sinopse, diretor, generoId },
            });
            res.status(201).json(filme);
        } catch (error) {
            console.error('Erro ao criar filme:', error);
            res.status(500).json({ error: 'Erro ao criar filme', details: error.message });
        }
    } else if (req.method === 'GET') {
        try {
            if (id) {
                const filme = await prisma.filme.findUnique({
                    where: { id: Number(id) },
                    include: { genero: true }, 
                });

                if (!filme) {
                    return res.status(404).json({ message: 'Filme não encontrado' });
                }
                res.status(200).json(filme);
            } else {
                const filmes = await prisma.filme.findMany({
                    include: { genero: true }, 
                });
                res.status(200).json(filmes);
            }
        } catch (error) {
            console.error('Erro ao buscar filmes:', error);
            res.status(500).json({ error: 'Erro ao buscar filmes', details: error.message });
        }
    } else if (req.method === 'PUT') {
        const { id } = req.body;
        const { titulo, ano, sinopse, diretor, generoId } = req.body;

        if (!id || !titulo || !ano || !sinopse || !diretor || !generoId) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
        }
        try {
            const filme = await prisma.filme.update({
                where: { id: Number(id) },
                data: { titulo, ano, sinopse, diretor, generoId: Number(generoId) },
            });
            res.status(200).json(filme);
        } catch (error) {
            console.error('Erro ao atualizar filme:', error);
            res.status(500).json({ error: 'Erro ao atualizar filme', details: error.message });
        }
    } else if (req.method === 'DELETE') {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: 'O ID do filme é obrigatório' });
        }
        try {
            await prisma.filme.delete({
                where: { id: Number(id) },
            });
            res.status(204).end();
        } catch (error) {
            console.error('Erro ao deletar filme:', error);
            res.status(500).json({ error: 'Erro ao deletar filme', details: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE']);
        res.status(405).end(`Método ${req.method} não permitido`);
    }
}
