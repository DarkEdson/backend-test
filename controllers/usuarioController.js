import { validateUsuario } from "../schemas/usuarioSchemas.js";
import formidable from "formidable";
import jwt from "jsonwebtoken";
import {jwtSecret} from '../config/config.js';
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const { pathname: root } = new URL("../uploads", import.meta.url);


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function fileToBase64(filePath) {
    // Lee el archivo de forma sincrónica
    const fileData = fs.readFileSync(filePath);

    // Convierte los datos del archivo a base64
    const base64Data = fileData.toString('base64');

    return base64Data;
}

function generateJWTToken(user) {
  // Lógica para generar token JWT
  const token = jwt.sign(
    {
      Usuario: user.Usuario,
      IdUsuario: user.IdUsuario,
      roles: [user.IdRol],
    },
    jwtSecret,
    { expiresIn: "1h" }
  );
  return token; // Esto es solo un ejemplo, necesitas implementar la lógica real
}


export class UsuariosController {
  constructor({ usuarioModel }) {
    this.usuarioModel = usuarioModel;
  }

  registrarUsuario = async (req, res) => {
    const form = formidable({});

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Error al procesar los datos del formulario" });
      }

      fields = {
        Nombres: fields.Nombres[0],
        Apellidos: fields.Apellidos[0],
        Usuario: fields.Usuario[0],
        Email: fields.Email[0],
        Whatsapp: fields.Whatsapp[0] || null,
        PalabraClave: fields.PalabraClave[0],
        Estado: fields.Estado[0] === "true",
        IdColaborador: parseInt(fields.IdColaborador[0], 10),
        NotificacionWhatsapp: fields.NotificacionWhatsapp[0] === "true",
        DocumentoIdTipo: parseInt(fields.DocumentoIdTipo[0], 10),
        NoDocumento: fields.NoDocumento[0],
        IdGuid: fields.IdGuid[0],
        FechaNacimiento: fields.FechaNacimiento[0],
        IdEstadoCivil: parseInt(fields.IdEstadoCivil[0], 10),
        Ocupacion: fields.Ocupacion[0],
        IdComunidadLinguistica: parseInt(fields.IdComunidadLinguistica[0], 10),
        IdPuebloPertenencia: parseInt(fields.IdPuebloPertenencia[0], 10),
        Telefono: fields.Telefono[0],
        DireccionNotificacion: fields.DireccionNotificacion[0],
        IdDepartamento: parseInt(fields.IdDepartamento[0], 10),
        IdMunicipio: parseInt(fields.IdMunicipio[0], 10),
        IdSexo: parseInt(fields.IdSexo[0], 10),
        DocumentoAdjunto: null
      };

      // Ahora fields contiene los campos enviados como form-data
      // Puedes validar los campos con Zod y luego registrar el usuario
      const userData = validateUsuario(fields);

      if (!userData.success) {
        return res.status(400).json({
          result: -1,
          message: "Ocurrió una Excepción",
          data: JSON.parse(userData.error.message),
        });
      } else {
        const currentDate = new Date();
        const timestamp = currentDate
          .toISOString()
          .replace(/:/g, "-")
          .replace(/\..+/, "");
          console.log('FILES', files)
        const uploadedFile = files.DocumentoAdjunto[0];
        const newFileName = `${timestamp}_${uploadedFile.originalFilename}`;
        const uploadedFileName = newFileName;
        const uploadDir = root.substring(1); // Directorio de subida de archivos
        const filePath = path.join(uploadDir, uploadedFileName);
      

        try {
          // Crea el directorio de subida de archivos si no existe
          if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
          }
          // Mueve el archivo al directorio de subida de archivos
          fs.renameSync(uploadedFile.filepath, filePath);
          const base64File = fileToBase64(filePath);
          // Agrega la ruta y el nombre del archivo a userData
          userData.data.DocumentoAdjunto = filePath;
          userData.data.DocumentoNube = newFileName;
          const user = await this.usuarioModel.registrar(userData.data);
          console.log('FLAG ADJUNTO', user.DocumentoAdjunto)
          const newbase64File = fileToBase64(user.DocumentoAdjunto);
          user.DocumentoAdjunto = newbase64File;

          res.status(200).json({
            result: 1,
            message: "Usuario registrado exitosamente",
            data: user,
          });
        } catch (error) {
          console.error("Error al guardar el archivo:", error);
          res.status(500).json({
            result: -1,
            message: "Error al guardar el archivo",
            error: error.message,
          });
        }
      }
    });
  };

  registrarUsuarioJSON = async (req, res) => {
    const userData = validateUsuario(req.body);
    console.log('PASE VALIDACIONES?', userData)
    if (!userData.success) {
      console.log('FLAG 0')
      return res.status(400).json({
        result: -1,
        message: "Ocurrió una Excepción",
        data: JSON.parse(userData.error.message),
      });
    } else {
      console.log('FLAG 1')
        const user = await this.usuarioModel.registrar(userData.data);
        res.status(200).json({
            result: 1,
            message: "Usuario registrado exitosamente",
            data: user,
          });
    }
    console.log('FLAG 2')
  };

  loginUsuario = async (req, res) => {
    const { usuario, palabraClave } = req.body;
    const user = await this.usuarioModel.login(usuario, palabraClave);
    if (user.length > 0) {
      // Autenticación exitosa, generar token JWT y enviar en la respuesta
      const token = generateJWTToken(user[0]); // Lógica para generar token JWT
      res.status(200).json({
        result: 1,
        message: "Login exitoso",
        data: { ...user[0], token },
      });
    } else {
      res
        .status(401)
        .json({ result: 0, message: "Usuario o contraseña incorrectos" });
    }
  };

  listarUsuarios = async (req, res) => {
    const {Estado} = req.query

    console.log('Estado', Estado,)
    const users = await this.usuarioModel.obtenerUsuarios(Estado);
    console.log('SALIENDO DE DB',users)
    if (users.length > 0) {
      // Autenticación exitosa, generar token JWT y enviar en la respuesta
      res.status(200).json({
        result: 1,
        message: "Usuarios Listados" + (Estado ? (Estado == "Activos" ? ' Activos' : ' Inactivos') : ''),
        data: { ...users },
      });
    } else {
      res
        .status(401)
        .json({ result: 0, message: "No hay usuarios" });
    }
  };

  obtenerUsuarioPorId = async (req, res) => {
    const {IdUsuario} = req.query
    const user = await this.usuarioModel.obtenerUsuarioPorID(IdUsuario);
    if (user.length > 0) {
      // Autenticación exitosa, generar token JWT y enviar en la respuesta
      res.status(200).json({
        result: 1,
        message: "Usuario",
        data: { ...user[0] },
      });
    } else {
      res
        .status(401)
        .json({ result: 0, message: "No hay usuarios" });
    }
  };
}
