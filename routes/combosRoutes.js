import { Router } from 'express';
import { CombosController } from '../controllers/combosController.js';

export const createCombosRoutes = ({combosModel}) =>{

    const combosRouter = Router()
    
    const combosController = new CombosController({combosModel})
    
    combosRouter.get('/departamento', combosController.departamentosList);
    combosRouter.post('/municipio', combosController.municipiosList);
    combosRouter.get('/comunidadLinguistica', combosController.comLinguistList);
    combosRouter.get('/puebloPertenencia', combosController.puebloPertList);
    combosRouter.get('/sexo', combosController.sexoList);
    combosRouter.get('/estadoCivil', combosController.estCivilList);

    //   moviesRouter.get('/:id', movieController.getById )
    

    
      return combosRouter
    }