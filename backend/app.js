import express from 'express'
import productRouter from './routes/productRoute.js';
import userRouter from './routes/userRoutes.js'
import ErrorHandler from './middleware/error.js';
import cookieParser from 'cookie-parser';

const app =  express();

app.use(express.json())
app.use(cookieParser())


app.use('/api/v1',productRouter)
app.use('/api/v1',userRouter)


// Middleware

app.use(ErrorHandler)

export default app