import mysql from 'mysql2/promise'; // Importar la versión 'promise' de mysql2
import dotenv from 'dotenv';

const DEFAULT_CONFIG = {
  host: 'localhost',
      user: 'admin',
      port: 3306,
      password: '123456',
      database: 'redddb'
};

dotenv.config(); 

// Verifica si la variable de entorno DATABASE_URL está definida, de lo contrario, usa la configuración predeterminada
const connectionString =  process.env.DATABASE_URL ? process.env.DATABASE_URL : DEFAULT_CONFIG;
console.log('CONN',connectionString,process.env.DATABASE_URL  )
// Función para conectar a la base de datos MySQL
const connectToDatabase = async () => {
  try {
    const connection = await mysql.createConnection(connectionString);
    console.log('Conexión exitosa a la base de datos.');
    return connection;
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error.message);
    throw error;
  }
};

// Exportar la función para conectar a la base de datos
export default connectToDatabase;