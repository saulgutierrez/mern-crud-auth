import Task from '../models/task.model.js';

// Funciones asincronas exportables hacia base de datos
export const getTasks = async(req, res) => {
    const tasks = await Task.find({
        // Obtiene la tarea del usuario que esta logueado dentro del sistema, filtrando por el id
        // recibido mediate el body en la petición post
        user: req.user.id
    }).populate('user') // Obtiene todo el modelo usuario, es decir, todos sus datos
    res.json(tasks)
}

export const createTask = async(req, res) => {
    // Recibir los datos desde el cuerpo de la petición http y almacenarlo
    const { title, description, date } = req.body

    const newTask = new Task({
        title,
        description,
        date,
        // Referencia al id del usuario
        user: req.user.id
    })
    const savedTask = await newTask.save()
    res.json(savedTask)
};

export const deleteTasks = async(req, res) => {
    
}

export const getTask = async(req, res) => {
    // Buscar por id enviado desde la url con la petición get
    const task = await Task.findById(req.params.id).populate('user');
    // Mostrar error en caso de que no se encuentre el id
    if (!task) return res.status(404).json({message: 'Task not found'})
    res.json(task)
}

export const deleteTask = async(req, res) => {
    // Buscar por id enviado desde la url con la petición get y eliminar
    const task = await Task.findByIdAndDelete(req.params.id);
    // Mostrar error en caso de que no se encuentre el id
    if (!task) return res.status(404).json({message: 'Task not found'})
    res.sendStatus(204);
}

export const updateTask = async(req, res) => {
    // Buscar por id enviado desde la url con la petición get y actualizar
    // Recibe dos parámetros, el id de la tarea a buscar/actualizar, y el cuerpo de la petición, es decir,
    // el mensaje con el que se va a sobreescribir
    const task = await Task.findById(req.params.id, req.body, {
        new: true
    });
    // Mostrar error en caso de que no se encuentre el id
    if (!task) return res.status(404).json({message: 'Task not found'})
    res.json(task)
}