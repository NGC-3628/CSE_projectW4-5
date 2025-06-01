// ES modules
import express from 'express';
import { initDb as mongoInitDb } from './data/database.js'; 
import 'dotenv/config';
import routes from './routes/index.js'; 


//swagger
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' assert {type: 'json'};


//conection with PORT 
const app = express();
const port = process.env.PORT || 8080;

//middleware
app
    .use(express.json())
    .use('/', routes)
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


//first test
app.get('/', (req, res) => {res.send("ProjectW3-4, further information type \"/contacts or /api-doc\"")});


//ignition to database 
mongoInitDb((err) => { 
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Database is listening and Node Running in port ${port}`);
        });
    }
});