import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { nome, descricao } = req.body;
        if (!nome) {
            return res.status(400).json({ message: 'O nome do gênero é obrigatório' });
        }
        try {
            const genero = await prisma.genero.create({
                data: { nome, descricao },
            });
            res.status(201).json(genero);
        } catch (error) {
            console.error('Erro ao criar gênero:', error);
            res.status(500).json({ error: 'Erro ao criar gênero', details: error.message });
        }
    } 
    else if (req.method === 'GET') {
        const { id } = req.query; 
        
        try {
            if (id) {
                const genero = await prisma.genero.findUnique({
                    where: { id: Number(id) },
                });
                
                if (!genero) {
                    return res.status(404).json({ message: 'Gênero não encontrado' });
                }
                
                res.status(200).json(genero);
            } else {
                const generos = await prisma.genero.findMany();
                res.status(200).json(generos);
            }
        } catch (error) {
            console.error('Erro ao buscar gêneros:', error);
            res.status(500).json({ error: 'Erro ao buscar gêneros', details: error.message });
        }
    } 
    else if (req.method === 'PUT') {
        const { id, nome, descricao } = req.body;
        if (!id || !nome) {
            return res.status(400).json({ message: 'O ID e o nome do gênero são obrigatórios' });
        }
        try {
            const genero = await prisma.genero.update({
                where: { id: Number(id) },
                data: { nome, descricao },
            });
            res.status(200).json(genero);
        } catch (error) {
            console.error('Erro ao atualizar gênero:', error);
            res.status(500).json({ error: 'Erro ao atualizar gênero', details: error.message });
        }
    } 
    else if (req.method === 'DELETE') {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: 'O ID do gênero é obrigatório' });
        }
        try {
            await prisma.genero.delete({
                where: { id: Number(id) },
            });
            res.status(204).end();
        } catch (error) {
            console.error('Erro ao deletar gênero:', error);
            res.status(500).json({ error: 'Erro ao deletar gênero', details: error.message });
        }
    } 
    else {
        res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE']);
        res.status(405).end(`Método ${req.method} não permitido`);
    }
}
