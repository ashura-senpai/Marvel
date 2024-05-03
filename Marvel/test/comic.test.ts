import app from '../src/app';
import { describe, it, expect } from '@jest/globals';
import * as request from 'supertest';

describe('Testando endpoints de Quadrinhos', () => {
    it('deve inserir um quadrinho e depois buscar pelo mesmo ID', async () => {
        const ComicMock = {
            title: 'O Incrível Homem-Aranha #1',
            description: 'O primeiro quadrinho de O Incrível Homem-Aranha.',
            thumbnail: 'http://i.annihil.us/u/prod/marvel/i/mg/6/90/5b7f91f9da259.jpg'
        };

        // Teste de inserção de quadrinho
        const createResponse = await request.default(app)
            .post('/quadrinhos/criar')
            .send(ComicMock);
        expect(createResponse.status).toEqual(201);
        expect(createResponse.body._id).toBeDefined();
        const createdComicId = createResponse.body._id;

        // Teste de busca por ID
        const findResponse = await request.default(app).get(`/quadrinhos/${createdComicId}`);
        expect(findResponse.status).toBe(200);
        expect(findResponse.body._id).toEqual(createdComicId);
        expect(findResponse.body.title).toBe(ComicMock.title);
        expect(findResponse.body.description).toBe(ComicMock.description);
        expect(findResponse.body.thumbnail).toBe(ComicMock.thumbnail);
    });
});
