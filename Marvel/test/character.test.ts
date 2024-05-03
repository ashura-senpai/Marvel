import app from '../src/app'
import { describe, it, expect } from "@jest/globals"
import CharacterModel from '../src/Marvel/schemas/character.schema'
import * as request from 'supertest'


    describe("Testando endpoints de Characters", () => {
        it("deve inserir um character e depois buscar pelo mesmo ID", async () => {
            const CharacterMock = {
                id_hero: 3321,
                name: "Homem Aranha",
                description: "o homem que foi mordido pela aranha, com isso ele ganhou um grande poder",
                thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/8/c0/520d1ad3e543f.jpg"
            };

            const createResponse = await request.default(app).post('/herois/criar').send(CharacterMock);
            expect(createResponse.status).toEqual(201);
            expect(createResponse.body._id).toBeDefined();

            const createdCharacterId = createResponse.body._id;

            const findResponse = await request.default(app).get(`/herois/${createdCharacterId}`);
            expect(findResponse.status).toBe(200);
            expect(findResponse.body._id).toEqual(createdCharacterId);
            expect(findResponse.body.name).toBe(CharacterMock.name);
            expect(findResponse.body.description).toBe(CharacterMock.description);
            expect(findResponse.body.thumbnail).toBe(CharacterMock.thumbnail);
        });
    });