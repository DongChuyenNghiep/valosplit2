import express from 'express';
import { signin, signup, signout, addteam,findteam } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/addteam', addteam)
router.get('/signout', signout);
router.post('/findteam',findteam)
export default router;
