import { z } from 'zod'; // Eliminamos { email } ya que no existe como exportación nombrada

export const registerSchema = z.object({
    username: z
        .string({ required_error: 'Username is required' })
        .min(3, { message: 'Username must be at least 3 characters' })
        .trim(),
    
    email: z
        .string({ required_error: 'Email is required' })
        .trim()
        .email({ message: 'Invalid email' }),
    
    password: z
        .string({ required_error: 'Password is required' })
        .min(6, { message: 'Password must be at least 6 characters' }),
});

export const loginSchema = z.object({
    email: z
        .string({ required_error: 'Email is required' })
        .trim()
        .email({ message: 'Invalid email' }),
        
    password: z
        .string({ required_error: 'Password is required' })
        .min(6, { message: 'Password must be at least 6 characters' }),
});