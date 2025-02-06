const express = require('express');
const { Client } = require('pg');
const bodyParser = require('body-parser');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Swagger setup
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'API de Clientes',
            version: '1.0.0',
            description: 'API para gestionar clientes en PostgreSQL',
        },
    },
    apis: ['server.cjs'], // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// PostgreSQL client
const client = new Client({
    host: 'hostybee.com',
    port: 53998,
    user: 'postgres',
    password: 'postgres',
    database: 'aquipanel',
});

client.connect()
    .then(() => console.log('Conectado a la base de datos'))
    .catch(err => console.error('Error de conexión', err));

/**
 * @swagger
 * /clients:
 *   get:
 *     summary: Obtener todos los clientes
 *     responses:
 *       200:
 *         description: Lista de clientes
 */
app.get('/clients', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM clients');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener clientes' });
    }
});

/**
 * @swagger
 * /clients:
 *   post:
 *     summary: Crear un nuevo cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               address:
 *                 type: string
 *               postal_code:
 *                 type: string
 *               municipality:
 *                 type: string
 *               social_reason:
 *                 type: string
 *               employees:
 *                 type: integer
 *               website:
 *                 type: string
 *               role:
 *                 type: string
 *               cif:
 *                 type: string
 *               num_empleados:
 *                 type: integer
 *               sector:
 *                 type: string
 *               fecha_fundacion:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Cliente creado
 */
app.post('/clients', async (req, res) => {
    const { name, phone, email, address, postal_code, municipality, social_reason, employees, website, role, cif, num_empleados, sector, fecha_fundacion } = req.body;
    try {
        const result = await client.query('INSERT INTO clients (name, phone, email, address, postal_code, municipality, social_reason, employees, website, role, cif, num_empleados, sector, fecha_fundacion) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)', [name, phone, email, address, postal_code, municipality, social_reason, employees, website, role, cif, num_empleados, sector, fecha_fundacion]);
        res.status(201).json({ message: 'Cliente creado', clientId: result.insertId });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear cliente' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
