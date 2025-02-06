import { Client } from 'pg';

const client = new Client({
    host: 'hostybee.com',
    port: 23992,
    user: 'postgres',
    password: 'postgres',
    database: 'aquipanel'
});

async function initDatabase() {
    try {
        await client.connect();
        
        // Crear la base de datos si no existe
        try {
            await client.query('CREATE DATABASE aquipanel');
            console.log('Base de datos creada exitosamente.');
        } catch (error) {
            console.log('La base de datos ya existe o no se pudo crear:', error.message);
        }

        // Cambiar a la nueva base de datos
        await client.end();
        client.database = 'aquipanel'; // Cambiar la base de datos
        await client.connect();

        // Crear tablas
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS clients (
                id SERIAL PRIMARY KEY,
                cif VARCHAR(20),
                num_empleados INT,
                direccion VARCHAR(255),
                telefono VARCHAR(20),
                email VARCHAR(255),
                sector VARCHAR(100),
                fecha_fundacion DATE
            );
        `;
        await client.query(createTableQuery);
        console.log('Tabla creada exitosamente.');
        
    } catch (error) {
        console.error('Error al inicializar la base de datos:', error);
    } finally {
        await client.end();
    }
}

initDatabase();
