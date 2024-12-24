import mongoose from "mongoose";

const connection = () =>{
mongoose
  .connect(process.env.DBCONNECTION)
  .then(() => console.log("connection established"));
}

export default connection