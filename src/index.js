import app from './app.js'
import { connectDB } from './db.js';

// Levantar el servidor
connectDB();
app.listen(4000)
console.log('Server on port ', 4000)