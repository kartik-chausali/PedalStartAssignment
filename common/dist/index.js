"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTodoInput = exports.createTodoInput = exports.signinInput = exports.signupInput = void 0;
const zod_1 = require("zod");
exports.signupInput = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
    name: zod_1.z.string().optional()
});
exports.signinInput = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string()
});
exports.createTodoInput = zod_1.z.object({
    tittle: zod_1.z.string(),
    description: zod_1.z.string(),
    dueDate: zod_1.z.string().optional(),
    id: zod_1.z.string().optional(),
});
exports.updateTodoInput = zod_1.z.object({
    tittle: zod_1.z.string(),
    description: zod_1.z.string(),
    dueDate: zod_1.z.string().optional(),
    id: zod_1.z.string().optional()
});
