import User from '../models/user.model.js'
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';

// Recibir datos del frontend, crear una instacia del modelo de datos, e insertar en MongoDB
export const register = async (req, res) => {
    const {email, password, username} = req.body;

    try {
        // Hash para encriptar password
        const passwordHash = await bcrypt.hash(password, 10)
        // Creacion de usuario
        const newUser = new User({
            username,
            email,
            password: passwordHash,
        })

        // Guardar usuario en DB
        const userSaved = await newUser.save();

        // Ejecución de promesa para generar token
        const token = await createAccessToken({id: userSaved._id})

        // Almacenar el id del token en una cookie de usuario
        res.cookie('token', token);

        res.json({
            id: userSaved.id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt
        });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Recibir datos del frontend, crear una instacia del modelo de datos, e insertar en MongoDB
export const login = async (req, res) => {
    const {email, password } = req.body;

    try {
        // Buscar por el correo del usuario para autenticar
        const UserFound = await User.findOne({email})
        // Mostrar error en caso de que no se encuentre el usuario
        if (!UserFound) return res.status(400).json({ message: "User not found"})

        // comparar la contraseña hasheada
        const isMatch = await bcrypt.compare(password, UserFound.password);

        if (!isMatch) return res.status(400).json({ message: "Invalid credentials"})

        // Ejecución de promesa para generar token
        const token = await createAccessToken({id: UserFound._id})

        // Almacenar el id del token en una cookie de usuario
        res.cookie('token', token);

        res.json({
            id: UserFound.id,
            username: UserFound.username,
            email: UserFound.email,
            createdAt: UserFound.createdAt,
            updatedAt: UserFound.updatedAt
        });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Eliminar el token una vez que el usuario cierra sesión
export const logout = (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0),
    });
    return res.sendStatus(200);
}

// Busqueda de datos de usuario por id
export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id)

    if (!userFound) return res.status(400).json({ message: "User not found" })
    return res.json({
        id: userFound.id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    });

    res.send('profile')
}