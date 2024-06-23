import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import {z} from 'zod'
import {signupInput, signinInput} from '@kartik_chausali/common/dist'
import { jwt, sign, decode } from "hono/jwt";
export const userRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>();


userRouter.post('/signup', async(c)=>{

    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const {success} = signupInput.safeParse(body)
    if(!success){
        c.status(411);
        return c.json("invalid credentials");
    }

    try{

        const user = await prisma.user.create({
           data:{
            email:body.email,
            password:body.password,
            name:body.name
           }
        })

        const token = await sign({id: user.id }, c.env.JWT_SECRET);
        return c.json({
            jwt:token,
            userId:user.id
        })

    }catch(e){
        c.status(403);
        return c.json({msg:"Account with email already exists "})
    }

})

userRouter.post('/signin',async(c)=>{

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
      }).$extends(withAccelerate());

      const body = await c.req.json();
      const{success} = signinInput.safeParse(body);

      if(!success){
        c.status(411);
        return c.json("invalid credentials")
    }

    const user = await prisma.user.findUnique({
        where:{
          email: body.email
        }
      })
    
     if(!user){
      c.status(403);
      return c.json({mssg: "user not found"});
     }

     const token = await sign({id: user.id}, c.env.JWT_SECRET)
     return c.json({
        jwt:token,
        userId:user.id
     })

})

userRouter.get('/me',  (c)=>{
    

    try{
      const header = c.req.header('authorization')|| "";
     const {payload} =  decode(header);
     
   
     return c.json({payload})

    }catch(e){

     c.status(500)
     return c.json("Error while fetching user details");

    }

   
 })

userRouter.get('/me/:id',async (c)=>{

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
      }).$extends(withAccelerate());

      const id = c.req.param("id")

      try{

        const user = await prisma.user.findUnique({
            where:{
                id:id
            }
        })
        return c.json(user);
      }catch(e){
        c.status(500);
        return c.json("Error while fetching user details")
      }
})