import {z} from 'zod';

export const signupInput = z.object({
    email:z.string().email(),
    password:z.string(),
    name:z.string().optional()
})


export const signinInput = z.object({
    email: z.string().email(),
    password: z.string()
})

export const createTodoInput= z.object({
    tittle:z.string(),
    description:z.string(),
    dueDate:z.string().optional(),
    id:z.string().optional(),
})

export const updateTodoInput = z.object({
    tittle:z.string(),
    description:z.string(),
    dueDate:z.string().optional(),
    id:z.string().optional()
})

export type SignUpInput = z.infer<typeof signupInput>
export type SignInInput = z.infer<typeof signinInput>
export type CreatTodoInput = z.infer<typeof createTodoInput>
export type UpdateTodoInput = z.infer<typeof updateTodoInput>