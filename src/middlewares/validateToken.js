import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js';
// Funciones que se ejecutan de forma intermedia antes de otra función final. La caracteristica
// es que reciben tres parámetros, la petición, la respuesta, y la función siguiente que se ejecutará
export const authRequired = (req, res, next) => {
    // Obtener el token almacenada en las cookies del usuario logueado, para almacenarlo y
    // utilizarlo en otras funciones
    const {token} = req.cookies;
    if (!token)
        return res.status(401).json({ message: "No token, authorization denied" });

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token" });
        }
        req.user = user;
        next()
    })
}