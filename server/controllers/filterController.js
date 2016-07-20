import rdb from 'rethinkdb';
import config from '../config';
import * as model from '../models/filterModel';
import log from '../lib/nodelogger';
class FilterController {

  static getAllFilters(req, res) {

    model.getAllFilters()
         .then((filters)=> {
           return res.send(filters);
         })
         .catch((err)=> {
           log.debug(err);
           res.status(500);
           return res.send(err);
         });

  }

  static saveFilter(req, res) {
    if (!req.body) {
      res.status(400);
      return res.send('Bad request.');
    }

    log.debug(req.body);
    const filter = req.body.filter;

    let promise = null;

    if (filter.id === undefined || filter.id == '') {
      promise = model.insertFilter(filter);
    } else {
      promise = model.updateFilter(filter);
    }

    promise.then((filter)=> {
             log.debug('saveFilter :', filter);
             res.send(filter);
           })
           .catch((err)=> {
             log.debug(err);
             res.status(500);
             return res.send(err);
           });

  }

  static deleteFilter(req, res) {
    if (!req.body) {
      return res.send('Bad request.');
    }

    const {id}=req.params;
    log.debug('delete filter', id);


    model.deleteFilter(id)
         .then((value)=> {
           res.send('OK');
         })
         .catch((err)=> {
           log.debug(err);
           res.status(500);
           return res.send(err);
         });


  }

}

export default FilterController;
