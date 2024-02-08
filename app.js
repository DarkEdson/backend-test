import express from 'express';
import bodyParser  from 'body-parser';
import cors from 'cors';
import {createUsuarioRoutes} from './routes/usuarioRoutes.js';
import {createCombosRoutes} from './routes/combosRoutes.js'
import {corsMiddleware} from './middleware/corsMiddleware.js';

export const createApp = ({usuarioModel, combosModel}) =>{


    const app = express()
    app.disable('x-powered-by')
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use( corsMiddleware())
    app.options('*', cors())
    app.use('/api/usuario', createUsuarioRoutes({usuarioModel}));
    app.use('/api/miscelanea', createCombosRoutes({combosModel}));
    
    const PORT = process.env.PORT ?? 1234
    
    app.listen(PORT, () => {
      console.log(`server listening on port http://localhost:${PORT}`)
    })
}