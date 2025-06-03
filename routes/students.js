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

  return[
    body('name')
      .isString().withMessage('name must be a strig')
      .notEmpty().withMessage('name is requiered'),
    body('age')
      .isInt({ min: 1 }).withMessage('Age must be a positive integer.')
      .notEmpty().withMessage('Age is required.'),
    body('email')
      .isEmail().withMessage('Must be a valid email address.')
      .notEmpty().withMessage('Email is required.'),
    body('grade')
      .isInt({min:0, max: 10}).withMessage('Grades must be from 0 to 10')
      .notEmpty().withMessage('This field is requiered')
  ];
};

//middleware to check if :id is correct
//I found this mongoid validator parameter
const idValidator = (id = 'id') => {
  return [param(id).isMongoId().withMessage(`The id '${id}' is not a valid MongoDB id.`)];
};

//middleware to handle validators
const validation = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next;
  }

  // catch all errors if it is the case and display to user
  const givenErrors = [];
  errors.array().map(err => givenErrors.push({[err.path]: err.msg}));

  return res.status(400).json({
    errors: givenErrors,
  });
};

router.get('/', getAll);
router.get('/:id', validation, idValidator('id') ,getSingle);
router.post('/',schemaValidator, validation, addContact);
router.put('/:id', schemaValidator, validation, idValidator('id'), updateContact);
router.delete('/:id',  validation, idValidator('id') ,deleteContact);

export default router;
