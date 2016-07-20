import uuid from 'uuid';
import fs from 'fs.extra';
import path from 'path';
import {updateSignupStatementFile} from '../models/userModel';

import * as userturnModel from '../models/userturnModel';
import * as progressTypes from '../../common/progressTypes';
import log from '../lib/nodelogger';

class UploadController {

  static uploadSignupStatement(req, res) {

    const statementsPath = path.join(__dirname, '../../client/statements');
    const sourceFilePath = req.files.file.path;
    log.debug(req.files.file.originalFilename);
    const filename = `${uuid.v1()}_${req.files.file.originalFilename}`;
    const targetFilePath = `${statementsPath}/${filename}`;

    fs.unlink(targetFilePath, (err1)=> {
      fs.move(sourceFilePath, targetFilePath, (err) => {
        if (err) {
          log.debug(err);
          res.status(400);
          res.send('A fájl mentése nem sikerült.');
          return;
        }

        const user_id = req.token.user.id;
        let _turn;

        userturnModel.getUserCurrentTurn(user_id)
          .then((turn)=> {
            _turn = turn;
            log.debug('uploadSignupStatement turn', turn);
            return updateSignupStatementFile(user_id, turn.id, filename);
          })
          .then(()=> {
            return userturnModel.setProgress(user_id, _turn.id, progressTypes.SIGNUP_STATEMENT_UPLOADED);
          })
          .then(()=> {
              log.debug('sending');
              res.send({ filename });
            }
          )

          .catch((err)=> {
            log.debug(err);
            res.status(500);
            return res.send(err);
          });


      });
    });

  }
}

export default UploadController;
