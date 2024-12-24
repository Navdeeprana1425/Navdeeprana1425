 import ProductModel from "../models/productModels.js"
 import ErrorHandler from "../utils/errorHandler.js";
 import catchAsyncError from "../middleware/catchAsyncError.js";
 import { search,filter,paginate } from "../utils/apiFeatures.js";
 

 const createProduct =  catchAsyncError(async(req,res,next)=>{
   req.body.user = req.user.id;
   const product = await ProductModel.create(req.body);
   res.status(201).json({
      success:true,
      product 
   })   
 })

 const getAllProducts = catchAsyncError(async (req, res, next) => {
   const resultPerPage = 10; // Adjust as per your requirement
   let query = ProductModel.find();
 
   // Step 1: Apply search
   query = search(query, req.query);
 
   // Step 2: Apply filter
   query = filter(query, req.query);
 
   // Step 3: Apply pagination
   query = paginate(query, req.query, resultPerPage);
 
   // Execute the final query
   const products = await query;
 
   res.status(200).json({
     success: true,
     products,
   });
 });

 const getSingleProduct = catchAsyncError(async(req,res,next)=>{

   let product =  await ProductModel.findById(req.params.id)

   if(!product){
      return next(new ErrorHandler("Product not Found",404))
   }
   
   res.status(201).json({
      success:true,
      product
   })


 })

//  Update

const updateProduct = catchAsyncError(async(req,res)=>{
   let product = await ProductModel.findById(req.params.id);

   if(!product){
      return  res.status(500).json({
         success:false,
         message:"Product not Found"
      })
   }

   product = await ProductModel.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true,useFindAndModify:false})

   res.status(201).json({success:true,product})

})

const deleteProduct = catchAsyncError(
   async (req, res) => {
      const product = await ProductModel.findById(req.params.id);
      if (!product) {
         return next(new ErrorHandler("Product not Found",404))
      }

      await ProductModel.findByIdAndDelete(product._id);       

      res.status(200).json({ 
         success: true,
         message: "Product Deleted Successfully"
       });

   }
)



 export {getAllProducts,createProduct,getSingleProduct,updateProduct, deleteProduct}