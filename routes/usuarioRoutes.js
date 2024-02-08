import { Router } from 'express';
import { UsuariosController } from '../controllers/usuarioController.js';

export const createUsuarioRoutes = ({usuarioModel}) =>{

    const usuarioRouter = Router()
    
    const usuarioController = new UsuariosController({usuarioModel})
    
    usuarioRouter.post('/registroWithFile', usuarioController.registrarUsuario);
    usuarioRouter.post('/registro', usuarioController.registrarUsuarioJSON);
    usuarioRouter.post('/login', usuarioController.loginUsuario);

    //   moviesRouter.get('/:id', movieController.getById )
    

    
      return usuarioRouter
    }