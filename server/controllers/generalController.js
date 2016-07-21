import * as model from '../models/generalModel';
import log from '../lib/nodelogger';

class GeneralController {

  static findAll(req, res) {
    const { table }=req.params;

    model.findAll(table)
         .then((data)=> {
           return res.send(data);
         })
         .catch((err)=> {
           log.debug(err);
           res.status(500);
           return res.send(err);
         });

  }

  static insert(req, res) {
    if (!req.body) {
      res.status(400);
      return res.send('Bad request.');
    }

    const { table }=req.params;
    const { doc } = req.body;

    model.insert(table, doc)
         .then((newDoc)=> {
           res.send(newDoc);
         })
         .catch((err)=> {
           log.debug(err);
           res.status(500);
           return res.send(err);
         });
  }

  static update(req, res) {
    if (!req.body) {
      res.status(400);
      return res.send('Bad request.');
    }

    const { table }=req.params;
    const { doc } = req.body;

    model.update(table, doc)
         .then((updatedDoc)=> {
           res.send(updatedDoc);
         })
         .catch((err)=> {
           log.debug(err);
           res.status(500);
           return res.send(err);
         });
  }

  static remove(req, res) {
    if (!req.body) {
      return res.send('Bad request.');
    }

    const { table, id }=req.params;

    model.remove(table, id)
         .then(()=> {
           res.send('OK');
         })
         .catch((err)=> {
           log.debug(err);
           res.status(500);
           return res.send(err);
         });
  }

  static find(req, res) {
    if (!req.body) {
      return res.send('Bad request.');
    }

    const { table, id }=req.params;

    model.find(table, id)
         .then((data)=> {
           res.send(data);
         })
         .catch((err)=> {
           log.debug(err);
           res.status(500);
           return res.send(err);
         });
  }


}

export default GeneralController;
