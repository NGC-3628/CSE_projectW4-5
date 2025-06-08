import express from 'express';
import { body, param, validationResult } from 'express-validator';
import {
  getAll,
  getSingle,
  addContact,
  updateContact,
  deleteContact
} from '../controllers/students.js';

const router = express.Router();

const schemaValidator = () => {
  return [
    body('name')
      .isString().withMessage('name must be a string')
      .notEmpty().withMessage('name is required'),
    body('age')
      .isInt({ min: 1 }).withMessage('Age must be a positive integer.')
      .notEmpty().withMessage('Age is required.'),
    body('email')
      .isEmail().withMessage('Must be a valid email address.')
      .notEmpty().withMessage('Email is required.'),
    body('grade')
      .isInt({ min: 0, max: 10 }).withMessage('Grades must be from 0 to 10')
      .notEmpty().withMessage('This field is required')
  ];
};

//middleware to check if :id is correct
//I found this mongoid validatoir parameter in stackoverflow
const idValidator = (id = 'id') => {
  return [param(id).isMongoId().withMessage(`The id '${id}' is not a valid MongoDB id.`)];
};

//validator
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
router.post('/', schemaValidator(), validation, addContact);
router.put('/:id', idValidator('id'), schemaValidator(), validation, updateContact);
router.delete('/:id', idValidator('id'), validation, deleteContact);

export default router;