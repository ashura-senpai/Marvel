import CharacterMarvelService from '../../src/Marvel/services/character.service';
import CharacterMarvel from '../../src/Marvel/schemas/character.schema';

describe('CharacterMarvelService', () => {
    // Teste para o método FindCharacter
    test('FindCharacter deve retornar um array de characters', async () => {
      const characters = await CharacterMarvelService.FindCharacter();
      expect(Array.isArray(characters)).toBe(true);
    });
  
    // Teste para o método Create
    test('Create deve criar um novo character', async () => {
      const character = { 
        name: 'Test Character', 
        description: 'Test Description', 
        thumbnail: 'https://example.com/image.jpg' // Adicionando a propriedade thumbnail com um valor válido
      };
      const createdCharacter = await CharacterMarvelService.Create(character);
      expect(createdCharacter.name).toBe('Test Character');
      expect(createdCharacter.description).toBe('Test Description');
      expect(createdCharacter.thumbnail).toBe('https://example.com/image.jpg'); // Verificando a propriedade thumbnail
    });
  
    // Teste para o método findByIdCharacter
    test('findByIdCharacter deve retornar um character por id', async () => {
      const character = await CharacterMarvelService.Create({ 
        name: 'Test Character', 
        description: 'Test Description', 
        thumbnail: 'https://example.com/image.jpg' // Adicionando a propriedade thumbnail com um valor válido
      });
      const foundCharacter = await CharacterMarvelService.findByIdCharacter(character._id);
      expect(foundCharacter).toBeTruthy();
    });
  
    // Teste para o método Update
    test('Update deve atualizar um character', async () => {
      const character = await CharacterMarvelService.Create({ 
        name: 'Test Character', 
        description: 'Test Description', 
        thumbnail: 'https://example.com/image.jpg' // Adicionando a propriedade thumbnail com um valor válido
      });
      const updatedCharacter = await CharacterMarvelService.Update(character._id, { name: 'Updated Character' });
      expect(updatedCharacter.name).toBe('Updated Character');
    });
  
    // Teste para o método Delete
    test('Delete deve deletar um character', async () => {
      const character = await CharacterMarvelService.Create({ 
        name: 'Test Character', 
        description: 'Test Description', 
        thumbnail: 'https://example.com/image.jpg' // Adicionando a propriedade thumbnail com um valor válido
      });
      await CharacterMarvelService.Delete(character._id);
      const deletedCharacter = await CharacterMarvel.findById(character._id);
      expect(deletedCharacter).toBeNull();
    });
  
    // Teste para o método SearchHero
    test('SearchHero deve retornar um array de characters de acordo com o nome', async () => {
      const characters = await CharacterMarvelService.SearchHero('Spider-Man');
      expect(Array.isArray(characters)).toBe(true);
      expect(characters.length).toBeGreaterThan(0);
    });
});