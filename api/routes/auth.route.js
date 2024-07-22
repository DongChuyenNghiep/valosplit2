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
router.post('/findrespond', async (req, res) => {
  const { userId } = req.body;
  const response = await Response.findOne({ userId });
  res.json(response);
});
router.post('/findallrespond', async (req, res) => {
  const response = await Response.find();
  res.json(response);
});
router.post('/responses', async (req, res, next) => {
  try {
    const { userId, userresponse } = req.body;

    // Ensure userresponse is an array
    if (!Array.isArray(userresponse)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid data format: userresponse should be an array.',
        statusCode: 400
      });
    }

    // Find or create a user response document
    let userResponse = await Response.findOne({ userId });
    if (!userResponse) {
      userResponse = new Response({ userId, userresponse: [] });
    }

    userresponse.forEach(({ idquestionset, questionIndex, selectedOption }) => {
      // Check if the response already exists
      const responseIndex = userResponse.userresponse.findIndex(
        (resp) => resp.idquestionset === idquestionset && resp.questionIndex === questionIndex
      );

      if (responseIndex !== -1) {
        // Update existing response
        userResponse.userresponse[responseIndex].selectedOption = selectedOption;
      } else {
        // Add new response
        userResponse.userresponse.push({ idquestionset, questionIndex, selectedOption });
      }
    });

    // Save the updated document
    await userResponse.save();
    res.status(200).json(userResponse);
  } catch (error) {
    next(error); // Passes the error to the next middleware (error handler)
  }
});

export default router;
