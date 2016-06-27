import rdb from 'rethinkdb';
import config from '../config';
import * as model from '../models/userturnModel';
import * as progressTypes from './progressTypes';

class UserturnController {

  static async finalizeSignup(req, res) {
    if (!req.body) {
      res.status(400);
      return res.send('Bad request.');
    }

    const {user_id, turn_id} = req.body;

    console.log(`finalizeSignup ${user_id} ${turn_id}`);

    try {
      const userturn = await model.setProgress(user_id, turn_id, progressTypes.SIGNUP_COMPLETED);

      return res.send(userturn);
    } catch (err) {
      console.log(err);
      res.status(500);
      return res.send(err);
    }

  }

  static async getCurrentTurn(req, res) {
    if (!req.body) {
      res.status(400);
      return res.send('Bad request.');
    }

    const {user_id}=req.params;

    console.log(`getCurrentTurn for ${user_id}`);

    try {
      const turn = await model.getUserCurrentTurn(user_id);

      return res.send(turn);

    } catch (err) {
      console.log(err);
      res.status(500);
      return res.send(err);
    }


  }

  static async getUserTurn(req, res) {
    if (!req.body) {
      res.status(400);
      return res.send('Bad request.');
    }

    const {user_id, turn_id}=req.params;

    console.log(`getUserTurn for ${user_id} ${turn_id}`);

    try {
      const userturn = await model.getUserTurn(user_id, turn_id);
      console.log('userturn:', userturn);
      return res.send(userturn);

    } catch (err) {
      console.log(err);
      res.status(500);
      return res.send(err);
    }


  }

  static async signUpToTurn(req, res) {

    if (!req.body) {
      res.status(400);
      return res.send('Bad request.');
    }

    const {user_id, turn_id}=req.body;

    try {
      const result = await model.insertUserturn(user_id,turn_id);

      return res.send('Ok');

    } catch (err) {
      console.log(err);
      res.status(500);
      return res.send(err);
    }


  }


}


export default UserturnController;
