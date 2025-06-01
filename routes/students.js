import express from 'express';
import {
  getAll,
  getSingle,
  addContact,
  updateContact,
  deleteContact
} from '../controllers/students.js';

const router = express.Router();

router.get('/', getAll);
router.get('/:id', getSingle);
router.post('/', addContact);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);

export default router;
