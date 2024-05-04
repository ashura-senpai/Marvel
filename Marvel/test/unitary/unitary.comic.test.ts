import ComicService from '../../src/Marvel/services/comic.service';
import Comics from '../../src/Marvel/schemas/comic.schema';

describe('ComicService', () => {
  // Teste para o método Comics
  test('Comics deve retornar um array de comics', async () => {
    const comics = await ComicService.Comics();
    expect(Array.isArray(comics)).toBe(true);
  });

  // Teste para o método Create
  test('Create deve criar uma new comic', async () => {
    const comic = { title: 'Test Comic', description: 'Test Description' };
    const createdComic = await ComicService.Create(comic);
    expect(createdComic.title).toBe('Test Comic');
    expect(createdComic.description).toBe('Test Description');
  });

  // Teste para o método findByIdComic
  test('findByIdComic deve retornar uma comic by id', async () => {
    const comic = await ComicService.Create({ title: 'Test Comic', description: 'Test Description' });
    const foundComic = await ComicService.findByIdComic(comic._id);
    expect(foundComic).toBeTruthy();
  });

  // Teste para o método Update
  test('Update deve atualizar uma comic', async () => {
    const comic = await ComicService.Create({ title: 'Test Comic', description: 'Test Description' });
    const updatedComic = await ComicService.Update(comic._id, { title: 'Updated Comic' });
    expect(updatedComic.title).toBe('Updated Comic');
  });

  // Teste para o método Delete
  test('Delete deve deletar uma comic', async () => {
    const comic = await ComicService.Create({ title: 'Test Comic', description: 'Test Description' });
    await ComicService.Delete(comic._id);
    const deletedComic = await Comics.findById(comic._id);
    expect(deletedComic).toBeNull();
  });

  // Teste para o método CountComic
  test('CountComic deve retornar o numero de comics', async () => {
    const count = await ComicService.CountComic();
    expect(count).toBeGreaterThanOrEqual(0);
  });
});