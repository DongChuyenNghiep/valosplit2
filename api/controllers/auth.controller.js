import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
import Team from '../models/team.model.js';
import Match from '../models/match.model.js';
import mongoose from 'mongoose';
export const signup = async (req, res, next) => {
  const { riotID,username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ riotID,username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    next(error);
  }
};

export const addteam = async (req, res, next) => {
  const { team,shortname,player1,player2,player3,player4,player5,player6} = req.body;
  const newTeam = new Team({ team,shortname,player1,player2,player3,player4,player5,player6 });
  try {
    await newTeam.save();
    res.status(201).json({ message: 'Team created successfully' });
  } catch (error) {
    next(error);
  }
};
export const findteam = async (req, res, next) => {
  const { player} = req.body;
  try {
    const validUser = await Team.findOne({
      $or: [
        { player1: player },
        { player2: player },
        { player3: player },
        { player4: player },
        { player5: player },
        { player6: player },
        { player7: player },
        { player8: player },
        { player9: player },
        { player10: player }
      ]
    });
    if (!validUser) return next(errorHandler(404, 'User not found'));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { ...rest } = validUser._doc;
    const expiryDate = new Date(Date.now() + 2629824000); // 1 hour
    res
      .cookie('access_token', token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
export const addMatch = async (req, res, next) => {
  const {idmatch,teamNameleft,logoteamleft,logoteamright,scoreteamleft,teamNameright,scoreteamright, infoTeamleft,infoTeamright} = req.body;
  const newTeam = new Match({idmatch,teamNameleft,teamNameright,infoTeamleft,scoreteamleft,infoTeamright,scoreteamright,logoteamleft,logoteamright});

  try {
    await newTeam.save();
    res.status(201).json({ message: 'Match added successfully' });
  } catch (error) {
    next(error);
  }
};


export const findMatch = async (req, res, next) => {
  const { idmatch,_id} = req.body;
  try {
    const validMatch = await Match.findOne({
      $or: [
        { idmatch: idmatch },
        {_id:_id}
      ]
    });
    if (!validMatch) return next(errorHandler(404, 'User not found'));
    const token = jwt.sign({ id: validMatch._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = validMatch._doc;
    const expiryDate = new Date(Date.now() + 2629824000); // 1 hour
    res
      .cookie('access_token', token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email,username, password } = req.body;
  try {
    const validUser = await User.findOne({
      $or: [
        { email: email },
        { username: username }
      ]
    });
    if (!validUser) return next(errorHandler(404, 'User not found'));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'wrong credentials'));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = validUser._doc;
    const expiryDate = new Date(Date.now() + 2629824000); // 1 hour
    res
      .cookie('access_token', token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};



export const signout = (req, res) => {
  res.clearCookie('access_token').status(200).json('Signout success!');
};
