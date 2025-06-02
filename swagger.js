import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'API project W3-4', 
        description: 'usersApi'
    },
    host: 'cse-projectw4-5.onrender.com',
    schemas: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

//generate swagger json
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    console.log('Swagger JSON file has been generated');
}).catch(err => {
    console.error('Error generating Swagger JSON:', err);
});;