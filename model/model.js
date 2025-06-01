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
        type: Int32,
        required: true,
    }
});

export{useSchema};