import mysql from 'mysql2/promise'; // Importar la versión 'promise' de mysql2

// Función para conectar a la base de datos MySQL
const connectToDatabase = async () => {
  try {
    const connection = await mysql.createConnection({
      host: 'mysql-e785997-jparielsan-7817.a.aivencloud.com',
      user: 'avnadmin',
      port: 20587,
      password: 'AVNS_xkywKtsropPDgyFcFq3',
      database: 'redddb'
    });
    console.log('Conexión exitosa a la base de datos.');
    return connection;
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error.message);
    throw error;
  }
};

// Exportar la función para conectar a la base de datos
export default connectToDatabase;