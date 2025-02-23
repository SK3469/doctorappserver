import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },

    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['patient', 'doctor'],
         default: "patient"
    },
    appointment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment'
    },phonenumber: {
        type: Number,
    },
    addressline1: {
        type: String
    },
    addressline2: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    zipcode: {
        type: Number
    },
    profilephoto: {
        type: String
    }
}, { timestamps: true })
export const User = mongoose.model('User', userSchema);