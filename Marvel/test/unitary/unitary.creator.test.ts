import CreatorService from '../../src/Marvel/services/creator.service';
import creatorSchema from '../../src/Marvel/schemas/creator.schema';

describe('CreatorService', () => {
  // Teste para o método Creators
  test('Creators deve retornar um array de creators', async () => {
    const creators = await CreatorService.Creators();
    expect(Array.isArray(creators)).toBe(true);
  });

  // Teste para o método Create
  test('Create deve criar um new creator', async () => {
    const creator = { name: 'Test Creator', funcao: 'Writer' };
    const createdCreator = await CreatorService.Create(creator);
    expect(createdCreator.name).toBe('Test Creator');
    expect(createdCreator.funcao).toBe('Writer');
  });

  // Teste para o método findByIdCreator
  test('findByIdCreator deve retornar um criador by id', async () => {
    const creator = await CreatorService.Create({ name: 'Test Creator', funcao: 'Writer' });
    const foundCreator = await CreatorService.findByIdCreator(creator._id);
    expect(foundCreator).toBeTruthy();
  });

  // Teste para o método Update
  test('Update deve atualizar o creator', async () => {
    const creator = await CreatorService.Create({ name: 'Test Creator', funcao: 'Writer' });
    const updatedCreator = await CreatorService.Update(creator._id, { name: 'Updated Creator' });
    expect(updatedCreator.name).toBe('Updated Creator');
  });

  // Teste para o método Delete
  test('Delete deve deletar o creator', async () => {
    const creator = await CreatorService.Create({ name: 'Test Creator', funcao: 'Writer' });
    await CreatorService.Delete(creator._id);
    const deletedCreator = await creatorSchema.findById(creator._id);
    expect(deletedCreator).toBeNull();
  });

  // Teste para o método FilterByRole
  test('FilterByRole deve retornar um array de creators filtrados by role', async () => {
    const creators = await CreatorService.FilterByRole('Writer');
    expect(Array.isArray(creators)).toBe(true);
  });

  // Teste para o método SearchCreatorSeries
  test('SearchCreatorSeries deve retornar um array de series by creator name', async () => {
    const series = await CreatorService.SearchCreatorSeries('Stan Lee');
    expect(Array.isArray(series)).toBe(true);
  });

  // Teste para o método SearchCreator
  test('SearchCreator deve retornar um array de creators pelo nome', async () => {
    const creators = await CreatorService.SearchCreator('Stan Lee');
    expect(Array.isArray(creators)).toBe(true);
  });
});
