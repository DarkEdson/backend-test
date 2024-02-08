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
        "SELECT u.*, d.NombreDepartamento, m.nombre, c.NombreComunidadLinguistica, p.NombrePuebloPertenencia, s.NombreSexo, e.NombreEstadoCivil FROM TblSegUsuario AS u INNER JOIN Departamento AS d ON u.IdDepartamento = d.IdDepartamento INNER JOIN Municipios AS m ON u.IdMunicipio = m.idMunicipio INNER JOIN ComunidadLinguistica AS c ON u.IdComunidadLinguistica = c.IdComunidadLinguistica INNER JOIN PuebloPertenencia AS p ON u.IdPuebloPertenencia = p.IdPuebloPertenencia INNER JOIN Sexo AS s ON u.IdSexo = s.IdSexo  INNER JOIN EstadoCivil AS e ON u.IdEstadoCivil = e.IdEstadoCivil  WHERE u.Usuario = ? AND u.PalabraClave = ?";
      const response = await connection.query(sql, [usuario, palabraClave]);
      console.log(response)
      return response[0];
    } catch (error) {
      // Manejar errores
    }
  };

  static obtenerDepartamento = async () => {
    const sql = 'SELECT * FROM Departamento';
    const response = await connection.query(sql);
      console.log(response)
      return response[0];
  }
  
  // Método para obtener la información de una comunidad lingüística por su ID
  static obtenerComunidadLinguistica = async ()  => {
    const sql = 'SELECT * FROM ComunidadLinguistica';
    const response = await connection.query(sql);
      console.log(response)
      return response[0];
  }
  
  // Método para obtener la información de un pueblo de pertenencia por su ID
  static obtenerPuebloPertenencia = async () => {
    const sql = 'SELECT * FROM PuebloPertenencia';
    const response = await connection.query(sql);
      console.log(response)
      return response[0];
  }
  
  // Método para obtener la información de un sexo por su ID
  static obtenerSexo = async () => {
    const sql = 'SELECT * FROM Sexo';
    const response = await connection.query(sql);
      console.log(response)
      return response[0];
  }
  
  // Método para obtener la información de un estado civil por su ID
  static obtenerEstadoCivil = async ()=> {
    const sql = 'SELECT * FROM EstadoCivil';
    const response = await connection.query(sql);
      console.log(response)
      return response[0];
  }
  
  // Método para obtener los municipios de un departamento por su ID
  static obtenerMunicipiosPorDepartamentoId = async (idDepartamento) => {
    const sql = 'SELECT * FROM Municipio WHERE IdDepartamento = ?';
    const response = await connection.query(sql, [idDepartamento]);
      console.log(response)
      return response[0];
  }
}

export default UsuarioModel;
