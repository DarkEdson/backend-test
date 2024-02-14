import { Router } from 'express';
import { UsuariosController } from '../controllers/usuarioController.js';
import authMiddleware from '../middleware/authMiddleware.js';

export const createUsuarios2Routes = ({usuarioModel}) =>{

    const usuariosRouter = Router()
    
    const usuariosController = new UsuariosController({usuarioModel})
    
    usuariosRouter.use(authMiddleware);
    usuariosRouter.get('/listarUsuarios', usuariosController.listarUsuarios);
    usuariosRouter.get('/usuario', usuariosController.obtenerUsuarioPorId);

    //   moviesRouter.get('/:id', movieController.getById )
    

    
      return usuariosRouter
    }