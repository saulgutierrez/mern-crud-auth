import mongoose from "mongoose";

// Funcion para conectarse a MongoDB, incluye el endpoint con el nombre de la base de datos
export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost/merndb');
        console.log("DB Connected")
    } catch (error) {
        console.log(error)
    }
};