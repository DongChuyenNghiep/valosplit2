import express from 'express';
import { signin, signup, signout, addteam, findteam, addMatch, findMatch, getAllMatches, findMatchPlayoff, findPlayer } from '../controllers/auth.controller.js';
import QuestionPickem from '../models/question.model.js';
import Response from '../models/response.model.js';
const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/addteam', addteam)
router.get('/signout', signout);
router.post('/findteam', findteam)
router.post('/addmatchid', addMatch);
router.post('/findmatchid', findMatch);
router.post('/findallmatch', getAllMatches);
router.post('/findallmatchplayoff', findMatchPlayoff)
router.post('/findplayer', findPlayer)
router.post('/addquestions', async (req, res, next) => {
  const { idquestionset, questionSet } = req.body;
  const newTeam = new QuestionPickem({idquestionset, questionSet });

  try {
    await newTeam.save();
    res.status(201).json({ message: 'Question added successfully' });
  } catch (error) {
    next(error);
  }
});

router.post('/findquestions', async (req, res) => {
  const questions = await QuestionPickem.find();
  res.status(200).json(questions);
});
router.post('/responses', async (req, res) => {
  const { userId, userresponse } = req.body;

  try {
      // Find the existing user response document
      let userDoc = await Response.findOne({ userId });

      // Create a new document if no existing one
          userDoc = new Response({
              userId,
              userresponse
          });

      // Save the document
      await userDoc.save();
      res.status(200).json({ message: 'Responses submitted successfully.' });
  } catch (error) {
      console.error('Error submitting responses:', error);
      res.status(500).json({ message: 'Failed to submit responses.' });
  }
});


export default router;
