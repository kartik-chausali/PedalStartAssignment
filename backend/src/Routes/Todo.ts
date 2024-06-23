import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createTodoInput, updateTodoInput } from "@kartik_chausali/common/dist"
import { verify } from "hono/jwt";

export const todoRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables:{
        userId: string
    }
}>();

todoRouter.use('/*', async(c, next)=>{
    const header =   c.req.header('authorization')|| "";
    const response: any = await verify(header, c.env.JWT_SECRET);
    if(response){
        c.set("userId", response.id)
        await next();
    }else{
        c.status(403);
        return c.json({mssg:"unauthorized"});
      }
})


todoRouter.post('/', async(c)=>{

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const {success} = createTodoInput.safeParse(body);
    if(!success){
        c.status(400);
        return c.json("invalid format to create task")
    } 
    try{
        const authorId = c.get("userId")
        console.log(authorId)
        console.log(body.tittle , body.description);
        const todo = await prisma.todo.create({
            data:{
                tittle:body.tittle,
                description:body.description,
                dueDate:body.dueDate,
                authorId: authorId,
                priority:body.priority
            }
        })

        return c.json({id: todo.id});

    }catch(e){
        c.status(500)
        return c.json({mssg:"error while creating task"})
    }
})

todoRouter.put('/', async(c)=>{

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const body  = await c.req.json();
    const {success} = updateTodoInput.safeParse(body);
    console.log(success);
    if(!success){
        c.status(411);
        return c.json("invalid format to update task");
    }

    try{

        const todo = await prisma.todo.update({
            where:{
                id:body.id
            },
            data:{
                tittle:body.tittle,
                description:body.description,
                dueDate:body.dueDate,
                priority:body.priority
            }
        })

        return c.json({id: todo.id});

    }catch(e){
        c.status(411);
        c.json({mssg:"error while updating the task"})
    }

})

todoRouter.post('/delete/:id', async(c)=>{

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    const id = c.req.param("id");

    try{

        const todo = await prisma.todo.delete({
            where:{
                id:id
            }
        })

        return c.json("Task removed successfully");

    }catch(e){
        c.status(500);
        return c.json("Error while deleting task")
    }
})

todoRouter.get('/single/:id', async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const id = c.req.param("id");

    try{

        const todo = await prisma.todo.findUnique({
            where:{
                id:id
            }
        })

        return c.json({todo: todo});

    }catch(e){
        c.status(411);
        return c.json("Error while fetching task")
    }
})

todoRouter.get('/todos/:id', async(c)=>{
    const prisma= new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())
    const userId = c.req.param('id')

    try{

        const todos = await prisma.todo.findMany({
            where:{
                authorId:userId
            }
        })

        return c.json({todo: todos})
    }catch(e){
            c.status(500);
            return c.json("Error while fetching profile tasks")
        }
})