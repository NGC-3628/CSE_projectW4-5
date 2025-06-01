import { getDatabase } from '../data/database.js'; 
import { ObjectId } from 'mongodb';


const getAll = async (req, res) => {
    const db = getDatabase();
    const result = await db.collection('contacts').find();
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    });
};

const getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const db = getDatabase(); 
    const result = await db.collection('contacts').find({ _id: userId });
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json'); 
        res.status(200).json(contacts[0]);
    });
};

//post
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
            { $set: updatedContact }
        );
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

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