import express from 'express';
import { signin, signup, signout, addteam,findteam, addMatch, findMatch, getAllMatches, findMatchPlayoff } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/addteam', addteam)
router.get('/signout', signout);
router.post('/findteam',findteam)
router.post('/addmatchid',addMatch);
router.post('/findmatchid',findMatch);
router.post('/findallmatch',getAllMatches);
router.post('/findallmatchplayoff',findMatchPlayoff)
export default router;
