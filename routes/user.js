import express from 'express'
import {getUser,createUser,signIn,signUp } from '../controller/user.js'
const router = express.Router();
import {auth} from '../middleware/auth.js'
router.get('/', getUser)
router.post('/', createUser)
router.post('/signup',signUp)
router.post('/signin',signIn)


export default router;
