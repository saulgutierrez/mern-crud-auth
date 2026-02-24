import mongoose from "mongoose";

// Modelo de datos
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})

// Acceso a metodos
export default mongoose.model('User', UserSchema)