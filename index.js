// ES modules
import express from 'express';
import { initDb as mongoInitDb } from './data/database.js'; 
import 'dotenv/config';
import routes from './routes/index.js'; 
import swaggerUi from 'swagger-ui-express';
import passport, { Passport } from 'passport';
import session from 'express-session';
import { Strategy as GitHubStrategy } from 'passport-github2';




//swagger
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const swaggerDocument = require('./swagger.json');


//conection with PORT 
const app = express();
const port = process.env.PORT || 8080;

//middleware
app
    .use(express.json())
    .use('/', routes)
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

//authenticator
    .use(session({
        secret: "secret",
        resave: false,
        saveUninitialized: true,
    }))
    .use(passport.initialize())
    .use(passport.session())
    .use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader(
            "Accesse-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-type, Accept, Z-Key, Authorization"
        );
        res.setHeader(
            "Accesse-Control-Allow-Headers",
            "POST, GET, PUT, PACH, OPTION,  DELETE, "
        );
        next();
    })
    .use(cors({methods: ['POST', 'GET', 'PUT', 'PACH', 'OPTION',  'DELETE']}))
    .use(cors({ origin: "*"}))
    .use("/", require("./routes/index.js"));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
}
));

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) =>{
    done(null, user);
});

app.get('/', (req, res) => {
    res.send(req.session.user !== undefined ? `logged in as ${req.session.user.displayName}` : `Logged out`)
});

app.get('/github/callback', passport.authenticate('githib', {
    failureRedirect: 'api-docs', session: false}),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    }
);


//first test
app.get('/', (req, res) => {res.send("ProjectW3-4, further information type \"/contacts or /teachers or /api-doc\"")});


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