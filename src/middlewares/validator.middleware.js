import { z } from 'zod';
export const validateSchema = (schema) => (req, res, next) => {
    try {
        // Si se valida correctemente la entrada del usuario, se sigue el flujo de la aplicacion
        schema.parse(req.body) // Validacion de entrada del esquema
        next()
    } catch (error) {
        if (error instanceof z.ZodError) {
            // const errorMessages = error.errors.map((issue) => issue.message);
            
            // console.log("Errores encontrados:", errorMessages);
            console.log(error);

            return res.status(400).json({
                status: "error",
                errors: errorMessages
            });
        }
    }
};