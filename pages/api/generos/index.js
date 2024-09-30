// import { PrismaClient } from '@prisma/client'
import { createGenero } from "../../repo/genero.repo.mjs";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { nome, descricao } = req.body;
        if (!nome) {
            return res.status(400).json({ message: 'O nome do gênero é obrigatório' });
        }
        try {
            const genero = await createGenero({ nome, descricao });
            res.status(201).json(genero);
        } catch (error) {
            console.error('Erro ao criar gênero:', error);
            res.status(500).json({ error: 'Erro ao criar gênero', details: error.message });
        }

    }
    if (req.method === 'GET') {
        const generos = await prisma.genero.findMany();
        res.status(200).json(generos);
    }
    if (req.method === 'DELETE') {
        const { nome } = req.body;
        if (!nome) {
            return res.status(400).json({ message: 'O nome do gênero é obrigatório' });
        }
        try {
            await deleteGenero(nome);
            res.status(204).end();
        } catch (error) {
            console.error('Erro ao deletar gênero:', error);
            res.status(500).json({ error: 'Erro ao deletar gênero', details: error.message });
        }
    }
}


// export default async function handler(req, res) {
//     const prisma = new PrismaClient();
//     if (req.method === 'POST') {
//         const { nome, descricao } = req.body;
//         if (!nome) {
//             return res.status(400).json({ message: 'O nome do gênero é obrigatório' });
//         }
//         try {
//             const genero = await prisma.genero.create({ data: { nome, descricao } });
//             res.status(201).json(genero);
//         } catch (error) {
//             console.error('Erro ao criar gênero:', error); // Loga detalhes no servidor
//             res.status(500).json({ error: 'Erro ao criar gênero', details: error.message });
//         }
//
//     } else if (req.method === 'GET') {
//         const generos = await prisma.genero.findMany();
//         res.status(200).json(generos);
//     }
// }