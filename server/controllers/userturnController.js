import rdb from 'rethinkdb';
import config from '../config';
import _ from 'lodash';
import * as model from '../models/userturnModel';
import * as turnModel from '../models/turnModel';
import * as usertestModel from '../models/usertestModel';
import * as signupDataModel from '../models/signupDataModel';
import * as userModel from '../models/userModel';
import * as progressTypes from '../../common/progressTypes';
import {validateSignupFinalize} from '../../common/validation';
import log from '../lib/nodelogger';
import nodemailer from 'nodemailer';

class UserturnController {


  static getTurnMembers(req, res) {
    const { turn_id } =req.params;
    const { filter }=req.body;

    log.debug(`getTurnMembers ${turn_id} ${filter}`);

    model.getTurnMembers(turn_id, filter)
         .then((users)=> {
           return res.send(users);
         })
         .catch((err)=> {
           log.debug(err);
           res.status(500);
           return res.send(err);
         });


  }

  static setProgress(req, res) {
    if (!req.body) {
      res.status(400);
      return res.send('Bad request.');
    }

    const { userturn_id } =req.params;
    const { progress } = req.body;
    log.debug(`setProgress ${userturn_id} ${progress}`);

    let userturn = null;
    return model.setProgressById(userturn_id, progress)
                .then((ut)=> {
                  userturn = ut;
                  log.debug('UserturnController/setProgressById', userturn);
                  return userModel.getUser(userturn.user_id);
                })
                .then((user)=> {
                  if (progress === progressTypes.SIGNUP_COMPLETED) {
                    const transporter = nodemailer.createTransport(config.smtp);
                    transporter.sendMail({
                      from: 'admin@vallalkozzitthon.hu',
                      to: user.email,
                      subject: 'Jelentkezés elfogadása',
                      html: `
                     Kedves Jelentkező!<br/>
                     <br/>
                     A Vállalkozz Itthon Junior (GINOP-5.2.2.) programra történő jelentkezésedet örömmel fogadtuk.<br/>
                     <br/> 
Kérjük, kísérd figyelemmel a www.vallalkozzitthonjunior.hu oldalunkat, illetve figyeld a megadott e-mail címedet!
Előfordulhat, hogy leveleink a Spam/Levélszemét mappába érkeznek.<br/>
<br/>
Ha kérdésed van, írj az ugyfelszolgalat@vallalkozzitthon.hu e-mail címre, vagy hívd a korlátozottan elérhető 1-794-4545-ös telefonszámot!<br/>
<br/> 
Bízunk benne, hogy rövidesen személyesen találkozunk a vállalkozói képzésen!<br/>
<br/>
Üdvözlettel:<br/>
Vállalkozz Itthon Junior projekt csapata

                     `
                    }, (err, info)=> {
                      log.debug('Email sent.', info);
                    });
                  }
                })
                .then(()=> {
                  res.send(userturn);
                })
                .catch((err)=> {
                  if (err.errors) {
                    return res.send({ errors: err.errors });
                  }
                  log.debug(err);
                  res.status(500);

                  return res.send(err);
                });

  }

  static setAgreementNote(req, res) {
    if (!req.body) {
      res.status(400);
      return res.send('Bad request.');
    }

    const { userturn_id } =req.params;
    const { note } = req.body;
    log.debug(`setAgreementNote ${userturn_id} ${note}`);

    return model.setAgreementNoteById(userturn_id, note)
                .then((userturn)=> {
                  log.debug('UserturnController/setAgreementNote success', userturn);
                  res.send(userturn);
                })
                .catch((err)=> {
                  if (err.errors) {
                    return res.send({ errors: err.errors });
                  }
                  log.debug(err);
                  res.status(500);
                  return res.send(err);
                });
  }

  static removeProgress(req, res) {
    if (!req.body) {
      res.status(400);
      return res.send('Bad request.');
    }

    const { userturn_id } =req.params;
    const { progress } = req.body;
    log.debug(`removeProgress ${userturn_id} ${progress}`);

    return model.removeProgressById(userturn_id, progress)
                .then((userturn)=> {
                  log.debug('UserturnController/removeProgressById', userturn);
                  res.send(userturn);
                })
                .catch((err)=> {
                  if (err.errors) {
                    return res.send({ errors: err.errors });
                  }
                  log.debug(err);
                  res.status(500);

                  return res.send(err);
                });

  }

  static sendMessage(req, res) {
    if (!req.body) {
      res.status(400);
      return res.send('Bad request.');
    }

    const { userturn_id, category, message, from } =req.body;
    log.debug(`sendMessage ${userturn_id} ${message}`);

    return model.sendMessage(userturn_id, {category,message,from})
                .then((userturn)=> {
                  res.send(userturn);
                })
                .catch((err)=> {
                  if (err.errors) {
                    return res.send({ errors: err.errors });
                  }
                  log.debug(err);
                  res.status(500);

                  return res.send(err);
                });

  }

  static validateSignup(user_id, turn_id) {
    return model.getUserTurn(user_id, turn_id)
                .then((userturn)=> {
                  return (userturn.progress);
                });
  }


  static finalizeSignup(req, res) {
    if (!req.body) {
      res.status(400);
      return res.send('Bad request.');
    }

    const { user_id, turn_id } = req.body;
    log.debug(`finalizeSignup ${user_id} ${turn_id}`);


    UserturnController.validateSignup(user_id, turn_id)
                      .then((errors)=> {
                          if (errors.length > 0) {
                            return Promise.reject({ errors });
                          }
                          return model.setProgress(user_id, turn_id, progressTypes.SIGNUP_FINALIZED);
                        }
                      )
                      .then((userturn)=> {
                        return model.removeProgress(user_id, turn_id, progressTypes.SIGNUP_REJECTED);
                      })

                      .then((userturn)=> {
                        log.debug('userturn>>>>>>>', userturn);
                        res.send(userturn);
                      })
                      .catch((err)=> {
                        if (err.errors) {
                          return res.send({ errors: err.errors });
                        }
                        log.debug(err);
                        res.status(500);

                        return res.send(err);
                      });


  }

  static getCurrentTurn(req, res) {

    if (!req.body) {
      res.status(400);
      return res.send('Bad request.');
    }

    const { user_id }=req.params;
    log.debug(`getCurrentTurn for ${user_id}`);


    model.getUserCurrentTurn(user_id)
         .then((turn)=> {
           log.debug('getCurrentTurn turn:', turn);
           res.send(turn);
         })
         .catch((err)=> {
           log.debug(err);
           res.status(500);
           return res.send(err);
         });


  }

  static getUserTurn(req, res) {
    if (!req.body) {
      res.status(400);
      return res.send('Bad request.');
    }

    const { user_id, turn_id }=req.params;

    log.debug(`getUserTurn for ${user_id} ${turn_id}`);

    model.getUserTurn(user_id, turn_id)
         .then((turn)=> {
           log.debug('getUserTurn turn:', turn);
           res.send(turn);
         })
         .catch((err)=> {
           log.debug(err);
           res.status(500);
           return res.send(err);
         });


  }

  static signUpToTurn(req, res) {

    if (!req.body) {
      res.status(400);
      return res.send('Bad request.');
    }

    const { user_id, turn_id }=req.body;

    model.insertUserturn(user_id, turn_id)
         .then(()=> {
           return res.send('Ok');
         })
         .catch((err)=> {
           log.debug(err);
           res.status(500);
           return res.send(err);
         });


  }


}


export default UserturnController;
