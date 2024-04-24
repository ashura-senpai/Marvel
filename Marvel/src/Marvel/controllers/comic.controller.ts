import { Request, Response } from 'express'
import ComicService from '../services/comic.service';

class ComicController {
    async Comics(req: Request, res: Response) {
        try {
            const comics = await ComicService.Comics();
            return res.send(comics);
        } catch (error) {
            console.error('Erro no controller:', error);
            return res.status(500).json({ message: 'Erro ao buscar Quadrinhos' });
        }
    }

    async CreateComic(req: Request, res: Response) {
        try {
            const Comic = await ComicService.Create(req.body);
            return res.send(Comic);
        } catch (error) {
            console.error('Erro no controller:', error);
            return res.status(500).json({ message: 'Erro ao Criar Criador' });
        }
      }
  
      async FindIdComic(req: Request, res: Response){
          try{
              const creator = await ComicService.findByIdComic(req.params.id)
              return res.send(creator)
          } catch (error){
              console.error(error)
              return res.status(500).json({ message: 'Erro ao achar Criador'})
          }
      }
  
      async UpdateComic(req: Request, res: Response) {
          try {
              const Comic = await ComicService.Update(req.params.id, req.body);
              return res.send(Comic);
          } catch (error) {
              console.error('Erro no controller:', error);
              return res.status(500).json({ message: 'Erro ao atualizar Criador' });
          }
        }
    
        async DeleteComic(req: Request, res: Response) {
          try {
              const Comic = await ComicService.Delete(req.params.id);
              return res.status(200).json("Deletado com sucesso");
          } catch (error) {
              console.error('Erro no controller:', error);
              return res.status(500).json({ message: 'Erro ao deletar Criador' });
          }
        }
}

export default new ComicController()