import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        version: '1.0.0',
        title: 'NID Mock Server API',
        description: 'API documentation for the NID Mock Server project. This API provides endpoints for managing National ID (NID) operations.'
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Local development server'
        }
    ],
    tags: [
        {
            name: 'NID',
            description: 'Endpoints related to National ID operations'
        },
        {
            name: 'General',
            description: 'General API endpoints'
        }
    ],
    components: {
        schemas: {
            NIDResponse: {
                type: 'object',
                properties: {
                    success: { type: 'boolean' },
                    count: { type: 'number' },
                    data: { type: 'array' }
                }
            },
            NIDItem: {
                type: 'object',
                properties: {
                    id: { type: 'number' },
                    nid_number: { type: 'string' },
                    name: { type: 'string' },
                    father_name: { type: 'string' },
                    mother_name: { type: 'string' },
                    date_of_birth: { type: 'string' },
                    address: { type: 'string' }
                }
            },
            ErrorResponse: {
                type: 'object',
                properties: {
                    success: { type: 'boolean' },
                    error: { type: 'string' }
                }
            }
        }
    }
};

const outputFile = './swagger-output.json';
const routes = ['./src/routes/nid.ts', './src/index.ts'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen({openapi: '3.0.0'})(outputFile, routes, doc).then(async () => {
  console.log('Swagger documentation generated successfully!');
  console.log('Documentation available at: http://localhost:3000/api-docs');
  // Don't import the server here as it will start the server
});

