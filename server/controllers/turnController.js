import rdb from 'rethinkdb';
import config from '../config';
import * as model from '../models/turnModel';
import log from '../lib/nodelogger';

class TurnController {

  static getAllTurns(req, res) {

    model.getAllTurns()
         .then((turns)=> {
           return res.send(turns);
         })
         .catch((err)=> {
           log.debug(err);
           res.status(500);
           return res.send(err);
         });

  }

  static saveTurn(req, res) {
    if (!req.body) {
      res.status(400);
      return res.send('Bad request.');
    }

    log.debug(req.body);
    const turn = req.body.turn;

    let promise = null;

    if (turn.id === undefined || turn.id == '') {
      promise = model.insertTurn(turn);
    } else {
      promise = model.updateTurn(turn);
    }

    promise.then((turn)=> {
             log.debug('saveTurn :', turn);
             res.send(turn);
           })
           .catch((err)=> {
             log.debug(err);
             res.status(500);
             return res.send(err);
           });

  }

  static deleteTurns(req, res) {
    if (!req.body) {
      return res.send('Bad request.');
    }

    log.debug(req.body);
    const {ids}=req.body;

    const promises = [];
    for (let i = 0; i < ids.length; i++) {
      promises.push(model.deleteTurn(ids[i]));
    }

    Promise.all(promises)
           .then((values)=> {
             res.send('OK');
           })
           .catch((err)=> {
             log.debug(err);
             res.status(500);
             return res.send(err);
           });


  }


}

export default TurnController;
