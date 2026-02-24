import express from 'express'
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/tasks.routes.js';

const app = express()
// Alias para npm start
app.use(morgan('dev'));
// Convertir respuestas del server en JSON
app.use(express.json());
// Poder visualizar las cookies almacenados en los headers para verificar si existe el token del usuario
app.use(cookieParser())
// Define directorio inicial
app.use("/api", authRoutes);
app.use("/api", taskRoutes);

export default app;