// ES modules
import express from 'express';
import { initDb as mongoInitDb } from './data/database.js';
import 'dotenv/config';
import cors from 'cors'; 
import routes from './routes/index.js';
//import swaggerUi from 'swagger-ui-express';
import passport from 'passport';
import session from 'express-session';
import { Strategy as GitHubStrategy } from 'passport-github';


//express
const app = express();
const port = process.env.PORT || 8080;

//middlewares
app
  .use(express.json())
  .use(cors()) 
  .use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  }))
  .use(passport.initialize())
  .use(passport.session())
  .use('/', routes) // all routes will be handled from here

  
  //.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//first test
app.get('/', (req, res) => {res.send("ProjectW3-4, further information type \"/contacts or /teachers or /api-docs\"")});

// passport / oauth
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
(accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

//user is stored here
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});


//database connection and server start
mongoInitDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database is listening and Node Running in port ${port}`);
    });
  }
});