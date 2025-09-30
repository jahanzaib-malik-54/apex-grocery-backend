// src/swagger/swaggerConfig.js
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Apex Grocery API',
            version: '1.0.0',
            description: 'API documentation for Apex Grocery backend',
        },
        servers: [
            {
                url: process.env.BASE_URL || 'http://192.168.18.14:4040/doc',
                description: 'Local server',
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                BearerAuth: [], 
            },
        ],
    },
    apis: [
        path.join(__dirname, './docs/*/*.js'), // Importing all docs files
    ],
};
