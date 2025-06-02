import mongoose from "mongoose";
const useSchemaStudents = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true, 
    },
    grade: {
        type: Number,
        required: true,
    }
});

const useSchemaTeachers = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    }
});

export{useSchemaStudents, useSchemaTeachers};