import express from 'express';
import { signin, signup, signout, addteam,findteam, addMatch, findMatch, getAllMatches, findMatchPlayoff, findPlayer } from '../controllers/auth.controller.js';
import QuestionPickem from '../models/question.model.js';
import Response from '../models/response.model.js';
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
router.post('/findplayer',findPlayer)
router.post('/addquestion',async(req,res,next)=>{
    const { question, choice } = req.body;
    
  const newTeam = new QuestionPickem({ question, choice });

  try {
    await newTeam.save();
    res.status(201).json({ message: 'Question added successfully' });
  } catch (error) {
    next(error);
  }
})
router.post('/findquestions',async (req, res) => {
    const questions = await QuestionPickem.find();
    res.status(200).json(questions);
});
router.post('/findrespond', async (req, res) => {
  const { userId } = req.body;
  const response = await Response.findOne({ userId });
  res.json(response);
});
router.post('/findallrespond', async (req, res) => {
  const response = await Response.find();
  res.json(response);
});
router.post('/responses', async (req, res) => {
  const { userId, responses } = req.body;

  let userResponse = await Response.findOne({ userId });
  if (!userResponse) {
      userResponse = new Response({ userId, userresponse: [] });
  }

  responses.forEach(({ questionId, selectedOption }) => {
      const responseIndex = userResponse.userresponse.findIndex((resp) => resp.questionId.toString() === questionId);
      if (responseIndex !== -1) {
          userResponse.userresponse[responseIndex].selectedOption = selectedOption;
      } else {
          userResponse.userresponse.push({ questionId, selectedOption });
      }
  });

  await userResponse.save();
  res.status(200).json(userResponse);
});

export default router;
