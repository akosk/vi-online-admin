import rdb from 'rethinkdb';
import config from '../config';
import * as model from '../models/turnModel';

class TurnController {

  static getAllTurns(req, res) {

    model.getAllTurns()
         .then((turns)=> {
           return res.send(turns);
         })
         .catch((err)=> {
           console.log(err);
           res.status(500);
           return res.send(err);
         });

  }

  static saveTurn(req, res) {
    if (!req.body) {
      res.status(400);
      return res.send('Bad request.');
    }

    console.log(req.body);
    const turn = req.body.turn;

    let promise = null;

    if (turn.id === undefined || turn.id == '') {
      promise = model.insertTurn(turn);
    } else {
      promise = model.updateTurn(turn);
    }

    promise.then((turn)=> {
             console.log('saveTurn :', turn);
             res.send(turn);
           })
           .catch((err)=> {
             console.log(err);
             res.status(500);
             return res.send(err);
           });

  }

  static deleteTurns(req, res) {
    if (!req.body) {
      return res.send('Bad request.');
    }

    console.log(req.body)
    const {ids}=req.body;

    const promises = []
    for (var i = 0; i < ids.length; i++) {
      promises.push(model.deleteTurn(ids[i]));
    }

    Promise.all(promises)
           .then((values)=> {
             res.send('OK');
           })
           .catch((err)=> {
             console.log(err);
             res.status(500);
             return res.send(err);
           });


  }


}

export default TurnController;
