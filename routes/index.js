//Im addressing and handling all routes from routes/index.js

import express from 'express';
import studentRoutes from './students.js';
import teacherRoutes from './teachers.js';
import passport from 'passport';
import swaggerUi from 'swagger-ui-express';
import { createRequire } from 'module';


//swagger 
const require = createRequire(import.meta.url);
const swaggerDocument = require('../swagger.json');

const router = express.Router();

//API routes

//APIs routes students and teachers
router.use('/students', studentRoutes);
router.use('/teachers', teacherRoutes);

//APIs routes swagger
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


//This part was in index.js now it is routes/index.js
router.get('/', (req, res) => {
    res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : 'Logged Out');
  });

//LOGIN
router.get('/login', passport.authenticate('github'), (req, res) => {});


//LOGOUT
router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

router.get('/github/callback',
    passport.authenticate('github', {
      failureRedirect: '/api-docs',
      session: false
    }),
    (req, res) => {
      req.session.user = req.user;
      res.redirect('/');
    }
  );

export default router;