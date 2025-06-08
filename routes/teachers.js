import express from 'express';
import { body, param, validationResult } from 'express-validator';
import {
  getAll,
  getSingle,
  addTeachers,
  updateContact,
  deleteContact
} from '../controllers/teachers.js';

const router = express.Router();


//like regexp. 
const schemaValidator = () => {
  return [
    body('name')
      .isString().withMessage('name must be a string')
      .notEmpty().withMessage('name is required'),
    body('email')
      .isEmail().withMessage('Must be a valid email address.')
      .notEmpty().withMessage('Email is required.'),
    body('subject')
      .isString().withMessage('subject must be a string')
      .notEmpty().withMessage('subject is required'),
  ];
};

const idValidator = (id = 'id') => {
  return [param(id).isMongoId().withMessage(`The id '${id}' is not a valid MongoDB id.`)];
};

const validation = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const givenErrors = [];
  errors.array().map(err => givenErrors.push({ [err.path]: err.msg }));
  return res.status(400).json({ errors: givenErrors });
};


router.get('/', getAll);
router.get('/:id', idValidator('id'), validation, getSingle);
router.post('/', schemaValidator(), validation, addTeachers);
router.put('/:id', idValidator('id'), schemaValidator(), validation, updateContact);
router.delete('/:id', idValidator('id'), validation, deleteContact);

export default router;