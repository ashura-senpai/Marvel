import app from '../src/app';
import { describe, it, expect } from '@jest/globals';
import * as request from 'supertest';

describe('Testando endpoints de Criadores', () => {
    it('deve inserir um criador e depois buscar pelo mesmo ID', async () => {
        const CreatorMock = {
            name: 'Stan Lee',
            bio: 'Stan Lee foi um escritor de histórias em quadrinho, editor e escritor.',
            thumbnail: 'http://i.annihil.us/u/prod/marvel/i/mg/3/50/537ba56d31087.jpg'
        };

        // Teste de inserção de criador
        const createResponse = await request.default(app)
            .post('/criadores/criar')
            .send(CreatorMock);
        expect(createResponse.status).toEqual(201);
        expect(createResponse.body._id).toBeDefined();
        const createdCreatorId = createResponse.body._id;

        // Teste de busca por ID
        const findResponse = await request.default(app).get(`/criadores/${createdCreatorId}`);
        expect(findResponse.status).toBe(200);
        expect(findResponse.body._id).toEqual(createdCreatorId);
        expect(findResponse.body.name).toBe(CreatorMock.name);
        expect(findResponse.body.bio).toBe(CreatorMock.bio);
        expect(findResponse.body.thumbnail).toBe(CreatorMock.thumbnail);
    });
});
