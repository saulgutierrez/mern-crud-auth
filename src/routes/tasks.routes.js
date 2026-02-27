import { Router } from "express";
import {authRequired} from '../middlewares/validateToken.js';
import {getTasks, getTask, createTask, updateTask, deleteTask} from '../controllers/tasks.controller.js'

const router = Router()

// Obtener todos los datos de un usuarios
router.get('/tasks', authRequired, getTasks)
// Obtener un dato específico
router.get('/tasks/:id', authRequired, getTask)
// Crear
router.post('/tasks', authRequired, createTask)
// Borrar
router.delete('/tasks/:id', authRequired, deleteTask)
// Actualizar
router.put('/tasks/:id', authRequired, updateTask)

export default router