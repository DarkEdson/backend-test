import connectToDatabase from "../config/databaseOnline.js";

const connection = await connectToDatabase();

class CombosModel {

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
    const sql = 'SELECT * FROM Municipios WHERE IdDepartamento = ?';
    const response = await connection.query(sql, [idDepartamento]);
      console.log(response)
      return response[0];
  }
}

export default CombosModel;
