import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/config.js'; // Reemplaza esto con la ubicación y nombre correctos del archivo de configuración que contiene la clave secreta del JWT

function authMiddleware(req, res, next) {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ result: -1, message: 'Token de autenticación no proporcionado' });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ result: -1, message: 'Token de autenticación inválido' });
    }

    req.user = decoded; // Almacenar los datos del usuario decodificados en el objeto de solicitud para su uso posterior
    next();
  });
}

export default authMiddleware;
