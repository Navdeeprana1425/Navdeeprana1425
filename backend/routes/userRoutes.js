import express from 'express'
import {createUser, loginUser,logOutUser} from "../controllers/userController.js";


const router = express.Router();

router.post('/user/new',createUser );
router.post('/user/login',loginUser);
router.get('/user/logOut',logOutUser)


export default router