import {createGenero, deleteGenero, getGeneros, updateGenero} from "../../repo/genero.repo.mjs";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const genero = req.body;
        const newGenero = await createGenero(genero);
        res.status(201).json(newGenero);
    }
    if (req.method === 'GET') {
        const generos = await getGeneros();
        res.status(200).json(generos);
    }
    if (req.method === 'PUT') {
        const { id } = req.query;
        const genero = req.body;
        const updatedGenero = await updateGenero(id, genero);
        res.status(200).json(updatedGenero);
    }
    if (req.method === 'DELETE') {
        const { id } = req.query;
        await prisma.genero.delete({ where: { id: Number(id) } });
        res.status(204).end(deleteGenero(id));
    }
}
