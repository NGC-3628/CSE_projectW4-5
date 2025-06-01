import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'API project W3-4', 
        description: 'usersApi'
    },
    host: 'localhost:8080',
    schemas: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

//generate swagger json
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    console.log('Swagger JSON file has been generated');
}).catch(err => {
    console.error('Error generating Swagger JSON:', err);
});;