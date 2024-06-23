import { z } from 'zod';
export declare const signupInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    name?: string | undefined;
}, {
    email: string;
    password: string;
    name?: string | undefined;
}>;
export declare const signinInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const createTodoInput: z.ZodObject<{
    tittle: z.ZodString;
    description: z.ZodString;
    dueDate: z.ZodOptional<z.ZodString>;
    id: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    tittle: string;
    description: string;
    dueDate?: string | undefined;
    id?: string | undefined;
}, {
    tittle: string;
    description: string;
    dueDate?: string | undefined;
    id?: string | undefined;
}>;
export declare const updateTodoInput: z.ZodObject<{
    tittle: z.ZodString;
    description: z.ZodString;
    dueDate: z.ZodOptional<z.ZodString>;
    id: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    tittle: string;
    description: string;
    dueDate?: string | undefined;
    id?: string | undefined;
}, {
    tittle: string;
    description: string;
    dueDate?: string | undefined;
    id?: string | undefined;
}>;
export type SignUpInput = z.infer<typeof signupInput>;
export type SignInInput = z.infer<typeof signinInput>;
export type CreatTodoInput = z.infer<typeof createTodoInput>;
export type UpdateTodoInput = z.infer<typeof updateTodoInput>;
