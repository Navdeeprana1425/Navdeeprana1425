import mongoose, { Mongoose } from "mongoose";
import { Schema } from "mongoose";

const productSchema = new Schema({
  name: { type: String, required: [true, "Please Enter the Product Name"] },
  description: {
    type: String,
    required: [true, "Please Enter Product Description"],
  },
  price: {
    type: Number,
    min: [0, "price cannot be smaller than 0"],
    required: [true, "Please Enter Product Price"],
    maxLength: [8, "price cannot be greater than 8 digits"],
  },
  rating: { type: Number, default: 0 },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: { type: String, required: [true, "Please enter the Category"] },
  stock:{
    type:Number,default:0
  },
  reviews:[{
    name:{ 
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    comment:{
        type:String,
        required:true,
    }
  }],
  user:{
    type:mongoose.Schema.ObjectId,
    ref:"User",
    required:true
  },

  createdAt:{
    type:Date,
    default:Date.now
  }
});

const ProductModel =  mongoose.model("Product",productSchema)

export default ProductModel