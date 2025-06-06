import express from 'express';
import studentRoutes from './students.js';
import teacherRoutes from './teachers.js';
import passport from 'passport';

const router = express.Router();

router.use('/students', studentRoutes);
router.use('/teachers', teacherRoutes);

//LOGIN
router.get('/login', passport.authenticate('github'), (req, res) => {});


//LOGOUT
router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

export default router;