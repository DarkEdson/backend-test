import z from 'zod'
import moment from "moment";
const DateTimeWithFormat = z.custom((value) => {
    // Expresión regular para verificar el formato dd/mm/yyyy
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regex.test(value)) {
      //throw new Error('Formato de fecha inválido. El formato debe ser dd/mm/yyyy');
    }
    return value;
  });

const usuarioSchema = z.object({
  Nombres: z.string().nullable(),
  Apellidos: z.string().nullable(),
  Usuario: z.string().min(1),
  Email: z.string().email(),
  Whatsapp: z.string().nullable(),
  PalabraClave: z.string().min(1),
  Swdatecreated: z.date().optional().default(() => new Date()), // Campo opcional con valor por defecto de la fecha actual
  Swcreatedby: z.number().optional(),
  SwdateUpdated: z.date().optional().default(() => new Date()), // Campo opcional con valor por defecto de la fecha actual
  SwUpdatedby: z.number().optional(),
  Estado: z.boolean().nullable(),
  IdColaborador: z.number().int().nullable(),
  NotificacionWhatsapp: z.boolean().nullable(),
  DocumentoIdTipo: z.number().int().nullable(),
  NoDocumento: z.string().nullable(),
  IdGuid: z.string().nullable(),
  FechaNacimiento: z.string().nullable(), // Ajustar el tipo según el formato de fecha deseado
  IdEstadoCivil: z.number().int().nullable(),
  Ocupacion: z.string().nullable(),
  IdComunidadLinguistica: z.number().int().nullable(),
  IdPuebloPertenencia: z.number().int().nullable(),
  Telefono: z.string().nullable(),
  DireccionNotificacion: z.string().nullable(),
  IdDepartamento: z.number().int().nullable(),
  IdMunicipio: z.number().int().nullable(),
  IdSexo: z.number().int().nullable(),
  DocumentoAdjunto: z.any().nullable(),
})

const LoginSchema = z.object({
    Usuario: z.string().min(1),
    PalabraClave: z.string().min(1),
  });

export function validateUsuario (object){
  let objectUser = object
  const fechaNacimientoMoment = moment(objectUser.FechaNacimiento);
  const fechaNacimientoDate = fechaNacimientoMoment.toDate().toISOString().slice(0, 19).replace('T', ' ');
  objectUser.FechaNacimiento = fechaNacimientoDate;
    return usuarioSchema.safeParse(objectUser)
}

export function validatePartialUsuario ( object){
    return usuarioSchema.partial().safeParse(object)
}

export function validateLogin (object){
    return LoginSchema.safeParse(object)
}


