import { getDatabase } from '../data/database.js'; 
import { ObjectId } from 'mongodb';

//GET   GET ALL STUDENTS
const getAll = async (req, res) => {
    try {
        const db = getDatabase();
        const result = await db.collection('contacts').find();
        result.toArray().then((contacts) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(contacts);
        });
    } catch (err) {
        res.status(500).json({ message: err.message || 'Internal server error' });
    }
};

//GET   GET ONE STUDENT
const getSingle = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const db = getDatabase();
        const result = await db.collection('contacts').find({ _id: userId });
        result.toArray().then((contacts) => {
            if (contacts.length > 0) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(contacts[0]);
            } else {
                res.status(404).json({ message: 'Student cannot be found' });
            }
        });
    } catch (err) {
        if (err.name === 'BSONError' && err.message.includes('inputBuffer')) { 
             res.status(400).json({ message: 'Id number invalid\nBad request'})
        } else {
             res.status(500).json({ message: err.message || 'Internal server error' });
        }
    }
};


//POST   CREATE STUDENT
const addContact = async (req, res) => {
    const db = getDatabase();
    const contact = {
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        grade: req.body.grade
    };

    try {
        const result = await db.collection('contacts').insertOne(contact);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//UPDATE   update status
const updateContact = async (req, res) => {
    const db = getDatabase();
    const userId = new ObjectId(req.params.id);
    const updatedContact = {
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        grade: req.body.grade
    };

    try {
        const result = await db.collection('contacts').updateOne(
            { _id: userId },
            { $set: req.body }
        );
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


//DELETE
const deleteContact = async (req, res) => {
    const db = getDatabase();
    const userId = new ObjectId(req.params.id);

    try {
        const result = await db.collection('contacts').deleteOne({ _id: userId });
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export {
    getAll,
    getSingle,
    addContact,
    updateContact,
    deleteContact
};