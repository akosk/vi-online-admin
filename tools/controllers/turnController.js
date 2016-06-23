import rdb from 'rethinkdb';
import config from '../config';
import * as model from '../models/turnModel';

class TurnController {

  static async getAllTurns(req, res) {

    try {
      const connection = await rdb.connect(config.db);
      const result = await rdb.table('turns')
                              .run(connection);

      const turns= await result.toArray();
      console.log(turns);


      return res.send(turns);

    } catch (err) {
      console.log(err);
      res.status(500);
      return res.send(err);
    }

  }

  static async saveTurn(req,res) {
    if (!req.body) {
      res.status(400);
      return res.send('Bad request.');
    }

    console.log(req.body);
    const turn=req.body.turn;

    if (turn.id === undefined || turn.id=='') {
      try {
        const result = await model.insertTurn(turn);
        return res.send(result.generated_keys);

      } catch (err) {
        console.log(err);
        res.status(500);
        return res.send(err);
      }

    } else {
      const result=await model.updateTurn(turn);
      return res.send({turn});
    }

  }

  static async deleteTurns(req, res) {
    try {
      if (!req.body) {
        return res.send('Bad request.');
      }

      console.log(req.body)
      const {ids}=req.body;

      for (var i = 0; i < ids.length; i++) {
        let result = await model.deleteTurn(ids[i]);
      }
      return res.send('Ok');
    } catch (err) {
      console.log(err);
      res.status(500);
      return res.send(err);
    }
  }


}

export default TurnController;
