import { model, Schema } from "mongoose";
import { isEmail } from "validator";

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'username is required'],
        trim: true,
        minLength: 3,
        maxLength: 50
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        trim: true,
        validate: (em)=> {
            if(!isEmail(em)) {
                throw new Error("please enter a correct email")
            }
        },
        lowrcase: true,
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minLength: 8,
    }
}, {timestamps: true})

