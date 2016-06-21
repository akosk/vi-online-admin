import rdb from 'rethinkdb';
import config from '../config';


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
}

export default TurnController;
