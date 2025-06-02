import express from 'express';
import{
    getAll,
    getSingle,
    addTeachers,
    updateContact,
    deleteContact
} from '../controllers/teachers.js';

const router = express.Router();

router.get('/', getAll);
router.get('/:id', getSingle);
router.post('/', addTeachers);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);

export default router; 