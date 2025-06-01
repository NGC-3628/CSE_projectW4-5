import mongoose from "mongoose";
const useSchema = mongoose.Schema({
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

export{useSchema};