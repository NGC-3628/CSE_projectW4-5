import express from 'express';
import studentRoutes from './students.js';
import teacherRoutes from './teachers.js';

const router = express.Router();

router.use('/students', studentRoutes);
router.use('/teachers', teacherRoutes);

export default router;