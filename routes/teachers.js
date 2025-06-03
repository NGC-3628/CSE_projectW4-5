import express from 'express';
import { body, param, validationResult } from 'express-validator';
import{
    getAll,
    getSingle,
    addTeachers,
    updateContact,
    deleteContact
} from '../controllers/teachers.js';

const router = express.Router();

const schemaValidator = () => {
    return[
        body('name')
            .isString().withMessage('name must be a string')
            .notEmpty().withMessage('name is requiered'),
        body('email')
            .isEmail().withMessage('Must be a valid email address.')
            .notEmpty().withMessage('Email is required.'),
        body('subject')
            .isString().withMessage('subject must be a string')
            .notEmpty().withMessage('subject is requiered'),
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
router.get('/:id', getSingle, validation, idValidator('id'));
router.post('/', addTeachers, schemaValidator, validation);
router.put('/:id', updateContact, schemaValidator ,validation, idValidator('id'));
router.delete('/:id', deleteContact, validation, idValidator('id'));

export default router; 