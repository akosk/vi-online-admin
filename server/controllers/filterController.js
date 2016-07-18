import rdb from 'rethinkdb';
import config from '../config';
import * as model from '../models/filterModel';

class FilterController {

  static getAllFilters(req, res) {

    model.getAllFilters()
         .then((filters)=> {
           return res.send(filters);
         })
         .catch((err)=> {
           console.log(err);
           res.status(500);
           return res.send(err);
         });

  }

  static saveFilter(req, res) {
    if (!req.body) {
      res.status(400);
      return res.send('Bad request.');
    }

    console.log(req.body);
    const filter = req.body.filter;

    let promise = null;

    if (filter.id === undefined || filter.id == '') {
      promise = model.insertFilter(filter);
    } else {
      promise = model.updateFilter(filter);
    }

    promise.then((filter)=> {
             console.log('saveFilter :', filter);
             res.send(filter);
           })
           .catch((err)=> {
             console.log(err);
             res.status(500);
             return res.send(err);
           });

  }

  static deleteFilter(req, res) {
    if (!req.body) {
      return res.send('Bad request.');
    }

    const {id}=req.params;
    console.log('delete filter', id);


    model.deleteFilter(id)
         .then((value)=> {
           res.send('OK');
         })
         .catch((err)=> {
           console.log(err);
           res.status(500);
           return res.send(err);
         });


  }

}

export default FilterController;
