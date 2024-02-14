import connectToDatabase from "../config/databaseOnline.js";

class UsuarioModel {
  static registrar = async (userData) => {
    // Lógica para registrar usuario en la base de datos
    try {
        const connection = await connectToDatabase();
        const sql = "INSERT INTO TblSegUsuario SET ?";
        const response = await connection.query(sql, [userData]);
        // Verificar si se insertó correctamente
        if (response && response[0].insertId) {
            // Obtener el ID del usuario insertado
            const insertedUserId = response[0].insertId;

            // Consultar el usuario recién creado
            const [newUser] = await connection.query('SELECT u.*, d.NombreDepartamento, m.nombre,  c.NombreComunidadLinguistica, p.NombrePuebloPertenencia, s.NombreSexo, e.NombreEstadoCivil FROM TblSegUsuario AS u INNER JOIN Departamento AS d ON u.IdDepartamento = d.IdDepartamento INNER JOIN Municipios AS m ON u.IdMunicipio = m.idMunicipio INNER JOIN ComunidadLinguistica AS c ON u.IdComunidadLinguistica = c.IdComunidadLinguistica INNER JOIN PuebloPertenencia AS p ON u.IdPuebloPertenencia = p.IdPuebloPertenencia INNER JOIN Sexo AS s ON u.IdSexo = s.IdSexo  INNER JOIN EstadoCivil AS e ON u.IdEstadoCivil = e.IdEstadoCivil  WHERE u.IdUsuario = ?', [insertedUserId]);
            // Verificar si se encontró el usuario
            if (newUser.length > 0) {
                // Devolver el usuario recién creado
                return newUser[0];
            } else {
                // Si no se encontró el usuario, lanzar un error o devolver un mensaje indicando el problema
                throw new Error('No se pudo encontrar el usuario recién creado');
            }
        } else {
            // Si no se pudo insertar el usuario, lanzar un error o devolver un mensaje indicando el problema
            throw new Error('No se pudo insertar el usuario');
        }
    } catch (error) {
        // Manejar errores
        console.error('Error al registrar usuario:', error);
        throw error; // O manejar de otra manera según tus necesidades
    }
  };

  static login = async (usuario, palabraClave) => {
    try {
      const connection = await connectToDatabase();
      // Realizar operaciones con la conexión...
      // Lógica para realizar el login y devolver un token JWT
      const sql =
        "SELECT u.*, d.NombreDepartamento, m.nombre AS nombreMunicipio, c.NombreComunidadLinguistica, p.NombrePuebloPertenencia, s.NombreSexo, e.NombreEstadoCivil FROM TblSegUsuario AS u INNER JOIN Departamento AS d ON u.IdDepartamento = d.IdDepartamento INNER JOIN Municipios AS m ON u.IdMunicipio = m.idMunicipio INNER JOIN ComunidadLinguistica AS c ON u.IdComunidadLinguistica = c.IdComunidadLinguistica INNER JOIN PuebloPertenencia AS p ON u.IdPuebloPertenencia = p.IdPuebloPertenencia INNER JOIN Sexo AS s ON u.IdSexo = s.IdSexo  INNER JOIN EstadoCivil AS e ON u.IdEstadoCivil = e.IdEstadoCivil  WHERE u.Usuario = ? AND u.PalabraClave = ?";
      const response = await connection.query(sql, [usuario, palabraClave]);
      console.log(response)
      return response[0];
    } catch (error) {
      // Manejar errores
    }
  };

  static obtenerUsuarios = async (estado) => {
    try {
      const connection = await connectToDatabase();
      // Realizar operaciones con la conexión...
      console.log('DB Estado',estado,estado === 1, estado === 2 )
      if (estado) {
        console.log('DB Estado',estado,estado == "Activos", estado == "Inactivos" )
        let value = estado ==  "Activos" ? 1 : 0
        console.log('VALUE Y ESTADO', value, estado)
        const sql =
        "SELECT u.*, d.NombreDepartamento, m.nombre as NombreMunicipio, c.NombreComunidadLinguistica, p.NombrePuebloPertenencia, s.NombreSexo, e.NombreEstadoCivil FROM TblSegUsuario AS u INNER JOIN Departamento AS d ON u.IdDepartamento = d.IdDepartamento INNER JOIN Municipios AS m ON u.IdMunicipio = m.idMunicipio INNER JOIN ComunidadLinguistica AS c ON u.IdComunidadLinguistica = c.IdComunidadLinguistica INNER JOIN PuebloPertenencia AS p ON u.IdPuebloPertenencia = p.IdPuebloPertenencia INNER JOIN Sexo AS s ON u.IdSexo = s.IdSexo  INNER JOIN EstadoCivil AS e ON u.IdEstadoCivil = e.IdEstadoCivil WHERE u.Estado = ? ";
      const response = await connection.query(sql,[value]);
      console.log(response)
      return response;
      }else{
        console.log('FLAG ELSE DB?')
        const sql =
        "SELECT u.*, d.NombreDepartamento, m.nombre as NombreMunicipio, c.NombreComunidadLinguistica, p.NombrePuebloPertenencia, s.NombreSexo, e.NombreEstadoCivil FROM TblSegUsuario AS u INNER JOIN Departamento AS d ON u.IdDepartamento = d.IdDepartamento INNER JOIN Municipios AS m ON u.IdMunicipio = m.idMunicipio INNER JOIN ComunidadLinguistica AS c ON u.IdComunidadLinguistica = c.IdComunidadLinguistica INNER JOIN PuebloPertenencia AS p ON u.IdPuebloPertenencia = p.IdPuebloPertenencia INNER JOIN Sexo AS s ON u.IdSexo = s.IdSexo  INNER JOIN EstadoCivil AS e ON u.IdEstadoCivil = e.IdEstadoCivil ";
      const response = await connection.query(sql);
      console.log('FLAG POST?',response[0])
      return response[0];
      }
      
    } catch (error) {
      // Manejar errores
    }
  }
  
  // Método para obtener la información de una comunidad lingüística por su ID
  static obtenerUsuarioPorID = async (idUsuario)  => {
    const connection = await connectToDatabase();
    const sql = "SELECT u.*, d.NombreDepartamento, m.nombre as NombreMunicipio, c.NombreComunidadLinguistica, p.NombrePuebloPertenencia, s.NombreSexo, e.NombreEstadoCivil FROM TblSegUsuario AS u INNER JOIN Departamento AS d ON u.IdDepartamento = d.IdDepartamento INNER JOIN Municipios AS m ON u.IdMunicipio = m.idMunicipio INNER JOIN ComunidadLinguistica AS c ON u.IdComunidadLinguistica = c.IdComunidadLinguistica INNER JOIN PuebloPertenencia AS p ON u.IdPuebloPertenencia = p.IdPuebloPertenencia INNER JOIN Sexo AS s ON u.IdSexo = s.IdSexo  INNER JOIN EstadoCivil AS e ON u.IdEstadoCivil = e.IdEstadoCivil  WHERE u.IdUsuario = ? ";
    const response = await connection.query(sql, [idUsuario]);
      console.log(response)
      return response[0];
  }
  
}

export default UsuarioModel;
