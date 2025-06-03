import { getDatabase } from "../data/database.js";
import { ObjectId } from "mongodb";

//GET all teachers
const getAll = async (req, res) => {
    try{
        const db = getDatabase();
        const result = await db.collection('teachers').find();
        result.toArray().then((teachers) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(teachers);
        });
    } catch (err) {
        res.status(500).json({ message: err.message || 'Internal server error' });
    }
};

//GET one teacher by id
const getSingle = async (req, res) => {
    try{
        const userId = new ObjectId(req.params.id);
        const db = getDatabase();
        const result = await db.collection('teachers').find({ _id: userId });
        result.toArray().then((teachers) => {
            if (teachers.length > 0) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(teachers[0]);
            } else {
                res.status(404).json({ message: 'Student cannot be found' });
            }
        });
    }catch (err) {
        if (err.name === 'BSONError' && err.message.includes('inputBuffer')) { 
             res.status(400).json({ message: 'Id number invalid\nBad request'})
        } else {
             res.status(500).json({ message: err.message || 'Internal server error' });
        }
    }
};


//POST adding new teachers
const addTeachers = async (req, res) => {
    const db = getDatabase();
    const teachers = {
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject
    };

    try {
        const result = await db.collection('teachers').insertOne(teachers);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

//PUT update teacher's information
const updateContact =  async (req, res) => {
    const db = getDatabase();
    const userId = new ObjectId(req.params.id);
    const updatedContact = {
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject
    };

    try{
        const result = await db.collection('teachers').updateOne(
            {_id: userId },
            { $set: req.body }
        );
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


//DELETE
const deleteContact = async (req, res) => {
    const db = getDatabase;
    const userId = new ObjectId(req.params.id);
    
    try{
        const result = await db.collection('teachers').deleteOne({ _id: userId});
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
};

export {
    getAll,
    getSingle,
    addTeachers,
    updateContact,
    deleteContact
};

