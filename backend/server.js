import dotenv from 'dotenv'
import app from "./app.js";
import connection from './config/database.js';

// unCought Exceptions error for if unknow variable defined
process.on('uncaughtException',(err)=>{
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the Server due to UnCaught Exception");
  process.exit(1);
})

dotenv.config({ path: 'backend/config/config.env' });

connection()

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`        
    )
  })

  // unhandled promise rejection 

  process.on('unhandledRejection',(err)=>{

    console.log(`Error: ${err.message}`);
    console.log("Shutting down the Server down to Unhandled Rejection");

    server.close(() => {
      process.exit(1)
    });
    
  })