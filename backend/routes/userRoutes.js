import express from 'express';
import { handleLogin, handleSignup, getUsers } from '../controllers/userController.js';
import  auth  from '../middlewares/authorise.js';

const router = express.Router();

router.route('/').post(handleSignup).get(auth,getUsers);
router.post('/login',handleLogin);

export default router;