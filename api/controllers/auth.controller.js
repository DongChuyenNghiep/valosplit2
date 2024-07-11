import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
import Team from '../models/team.model.js';
import Match from '../models/match.model.js';
import mongoose from 'mongoose';
export const signup = async (req, res, next) => {
  const { riotID, username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ riotID, username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    next(error);
  }
};

export const addteam = async (req, res, next) => {
  const { team, logoURL, shortname, player1, player2, player3, player4, player5, player6, player7, player8, player9, player10 } = req.body;
  const newTeam = new Team({ team, logoURL, shortname, player1, player2, player3, player4, player5, player6, player7, player8, player9, player10 });
  try {
    await newTeam.save();
    res.status(201).json({ message: 'Team created successfully' });
  } catch (error) {
    next(error);
  }
};
export const findteam = async (req, res, next) => {
  const { player } = req.body;
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
  const { idmatch, teamNameleft, logoteamleft, logoteamright, scoreteamleft, teamNameright, scoreteamright, infoTeamleft, infoTeamright } = req.body;
  const newTeam = new Match({ idmatch, teamNameleft, teamNameright, infoTeamleft, scoreteamleft, infoTeamright, scoreteamright, logoteamleft, logoteamright });

  try {
    await newTeam.save();
    res.status(201).json({ message: 'Match added successfully' });
  } catch (error) {
    next(error);
  }
};


export const findMatch = async (req, res, next) => {
  const { idmatch, _id, ign } = req.body;
  try {
    const query = {};

    if (idmatch) {
      query.idmatch = idmatch;
    }

    if (_id) {
      query._id = _id;
    }

    if (ign) {
      query.$or = [
        { 'infoTeamleft': { $elemMatch: { IGN: ign } } },
        { 'infoTeamright': { $elemMatch: { IGN: ign } } }
      ];
    }

    const validMatches = await Match.find(query);

    if (validMatches.length === 0) {
      return next(errorHandler(404, 'User not found'));
    }

    const tokens = validMatches.map(validMatch => {
      const token = jwt.sign({ id: validMatch._id }, process.env.JWT_SECRET);
      return { ...validMatch._doc, token };
    });

    const expiryDate = new Date(Date.now() + 2629824000); // 1 hour

    res
      .cookie('access_token', tokens.map(tokenData => tokenData.token), { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(tokens.map(({ token, password: hashedPassword, ...rest }) => rest));
  } catch (error) {
    next(error);
  }
};
export const findMatchPlayoff = async (req, res, next) => {
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
export const getAllMatches = async (req, res, next) => {
  try {
    const allMatches = await Match.find();

    if (allMatches.length === 0) {
      return next(errorHandler(404, 'No matches found'));
    }

    const tokens = allMatches.map(match => {
      const token = jwt.sign({ id: match._id }, process.env.JWT_SECRET);
      return { ...match._doc, token };
    });

    const expiryDate = new Date(Date.now() + 2629824000); // 1 hour

    res
      .cookie('access_token', tokens.map(tokenData => tokenData.token), { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(tokens.map(({ token, password: hashedPassword, ...rest }) => rest));
  } catch (error) {
    next(error);
  }
};
export const signin = async (req, res, next) => {
  const { email, username, password } = req.body;
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
