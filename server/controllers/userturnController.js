import rdb from 'rethinkdb';
import config from '../config';
import _ from 'lodash';
import * as model from '../models/userturnModel';
import * as turnModel from '../models/turnModel';
import * as usertestModel from '../models/usertestModel';
import * as signupDataModel from '../models/signupDataModel';
import * as progressTypes from '../../common/progressTypes';


class UserturnController {


  static getTurnMembers(req, res) {
    const {turn_id} =req.params;
    const {filter}=req.body;

    console.log(`getTurnMembers ${turn_id} ${filter}`);

    model.getTurnMembers(turn_id,filter)
         .then((users)=> {
           return res.send(users);
         })
         .catch((err)=> {
           console.log(err);
           res.status(500);
           return res.send(err);
         });


  }

  static setProgress(req, res) {
    if (!req.body) {
      res.status(400);
      return res.send('Bad request.');
    }

    const {userturn_id} =req.params;
    const {progress} = req.body;
    console.log(`setProgress ${userturn_id} ${progress}`);

    return model.setProgressById(userturn_id, progress)
                .then((userturn)=> {
                  console.log('UserturnController/setProgressById', userturn);
                  res.send(userturn);
                })
                .catch((err)=> {
                  if (err.errors) {
                    return res.send({ errors: err.errors });
                  }
                  console.log(err);
                  res.status(500);

                  return res.send(err);
                });

  }

  static removeProgress(req, res) {
    if (!req.body) {
      res.status(400);
      return res.send('Bad request.');
    }

    const {userturn_id} =req.params;
    const {progress} = req.body;
    console.log(`removeProgress ${userturn_id} ${progress}`);

    return model.removeProgressById(userturn_id, progress)
                .then((userturn)=> {
                  console.log('UserturnController/removeProgressById', userturn);
                  res.send(userturn);
                })
                .catch((err)=> {
                  if (err.errors) {
                    return res.send({ errors: err.errors });
                  }
                  console.log(err);
                  res.status(500);

                  return res.send(err);
                });

  }


  static validateSignup(user_id, turn_id) {
    console.log('validateSignup',user_id,turn_id);
    return model.getUserTurn(user_id, turn_id)
                .then((ut)=> {
                  return { userturn: ut };
                })
                .then((o)=> {
                  return turnModel.getTurn(o.userturn.turn_id)
                                  .then((turn)=> {
                                    o.turn = turn;
                                    return o;
                                  });
                })
                .then((o)=> {
                    return usertestModel.getUserTest(user_id, o.turn.competency_test.id, o.turn.id)
                                        .then((usertest)=> {
                                          o.usertest = usertest;
                                          return o;
                                        });

                  }
                )
                .then((o)=> {
                  return signupDataModel.getSignupDataByUserId(user_id)
                                        .then((signupData)=> {
                                          o.signupData = signupData;
                                          return o;
                                        });

                })
                .then((o)=> {
                  const errors = [];
                  const {userturn,usertest,signupData}=o;
                  console.log(usertest);
                  if (userturn.signup_statement_file === undefined) {
                    errors.push('Az aláírt nyilatkozat nincs feltöltve.');
                  }
                  if (usertest.id === undefined) {
                    errors.push('A kérdőív nincs elmentve');
                  } else {
                    const emptyItem = _.find(usertest.questions, (item)=> {
                      return item.value === '' || item.value === undefined || item.value === null;
                    });
                    if (emptyItem !== undefined) {
                      errors.push('A kérdőív minden kérdésére válaszolnia kell.');
                    }
                  }

                  if (signupData.id === undefined) {
                    errors.push('A jelentkezési lap nincs elmentve');
                  } else {
                    if (!signupData.adoazonosito_jel) {
                      errors.push('Az adóazonosító jel megadása kötelező');
                    }
                    if (!signupData.taj) {
                      errors.push('A TAJ szám megadása kötelező');
                    }
                    if (!signupData.birth_date) {
                      errors.push('Az születés dátumának megadása kötelező');
                    }
                    if (!signupData.vallalkozas_szekhelye) {
                      errors.push('A vállalkozás székhelyének megadása kötelező');
                    }
                  }

                  if (!_.has(userturn, `progress.${progressTypes.SIGNUP_AGREEMENTS_ACCEPTED}`)) {
                    errors.push('A nyilatkozatok nincsennek elfogadva.');
                  }

                  return errors;
                });


  }


  static finalizeSignup(req, res) {
    if (!req.body) {
      res.status(400);
      return res.send('Bad request.');
    }

    const {user_id, turn_id} = req.body;
    console.log(`finalizeSignup ${user_id} ${turn_id}`);


    UserturnController.validateSignup(user_id, turn_id)
                      .then((errors)=> {
                          if (errors.length > 0) {
                            return Promise.reject({ errors });
                          }
                          return model.setProgress(user_id, turn_id, progressTypes.SIGNUP_FINALIZED);
                        }
                      )

                      .then((userturn)=> {
                        console.log('userturn', userturn);
                        res.send(userturn);
                      })
                      .catch((err)=> {
                        if (err.errors) {
                          return res.send({ errors: err.errors });
                        }
                        console.log(err);
                        res.status(500);

                        return res.send(err);
                      });


  }

  static getCurrentTurn(req, res) {

    if (!req.body) {
      res.status(400);
      return res.send('Bad request.');
    }

    const {user_id}=req.params;
    console.log(`getCurrentTurn for ${user_id}`);


    model.getUserCurrentTurn(user_id)
         .then((turn)=> {
           console.log('getCurrentTurn turn:', turn);
           res.send(turn);
         })
         .catch((err)=> {
           console.log(err);
           res.status(500);
           return res.send(err);
         });


  }

  static getUserTurn(req, res) {
    if (!req.body) {
      res.status(400);
      return res.send('Bad request.');
    }

    const {user_id, turn_id}=req.params;

    console.log(`getUserTurn for ${user_id} ${turn_id}`);

    model.getUserTurn(user_id, turn_id)
         .then((turn)=> {
           console.log('getUserTurn turn:', turn);
           res.send(turn);
         })
         .catch((err)=> {
           console.log(err);
           res.status(500);
           return res.send(err);
         });


  }

  static signUpToTurn(req, res) {

    if (!req.body) {
      res.status(400);
      return res.send('Bad request.');
    }

    const {user_id, turn_id}=req.body;

    model.insertUserturn(user_id, turn_id)
         .then(()=> {
           return res.send('Ok');
         })
         .catch((err)=> {
           console.log(err);
           res.status(500);
           return res.send(err);
         });


  }


}


export default UserturnController;
