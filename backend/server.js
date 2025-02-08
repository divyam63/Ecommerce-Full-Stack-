import app from "./app.js"

import dotenv from "dotenv"
import connectDB from "./database/database.js";

//handle uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Eroor id ${err.message}`);
    console.log("shuting dow server");

    server.close()
    
    
})


//config
dotenv.config({path:"backend/config/config.env"});


//connect to db
connectDB()

app.listen(process.env.PORT,()=>{
    console.log(`Server is working on port ${process.env.PORT}`)
})

//Unhandled Promice Rejection  if not catch block idis there
process.on("unhandledRejection",(err)=>{
    console.log(`Error : ${err.message}`);
    console.log(`shutting down the server `);

    server.close(()=>{
        process.exit(1);
    })
    
    
})

