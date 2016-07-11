import uuid from 'uuid';
import fs from 'fs.extra';
import path from 'path';
import {updateSignupStatementFile} from '../models/userModel';
import {getUserCurrentTurn} from '../models/userturnModel';

import * as userturnModel from '../models/userturnModel';
import * as progressTypes from '../../common/progressTypes';

class UploadController {

  static uploadSignupStatement(req, res) {

    const statementsPath = path.join(__dirname, '../../client/statements');
    const sourceFilePath = req.files.file.path;
    console.log(req.files.file.originalFilename);
    const filename = `${uuid.v1()}_${req.files.file.originalFilename}`;
    const targetFilePath = `${statementsPath}/${filename}`;

    fs.unlink(targetFilePath, (err1)=> {
      fs.move(sourceFilePath, targetFilePath, (err) => {
        if (err) {
          console.log(err);
          res.status(400);
          res.send('A fájl mentése nem sikerült.');
          return;
        }

        const user_id = req.token.user.id;
        let _turn;

        getUserCurrentTurn(user_id)
          .then((turn)=> {
            _turn = turn;
            console.log('uploadSignupStatement turn', turn);
            return updateSignupStatementFile(user_id, turn.id, filename);
          })
          .then(()=> {
            return userturnModel.setProgress(user_id, _turn.id, progressTypes.SIGNUP_STATEMENT_UPLOADED);
          })
          .then(()=> {
              console.log('sending');
              res.send({ filename });
            }
          )

          .catch((err)=> {
            console.log(err);
            res.status(500);
            return res.send(err);
          });


      });
    });

  }
}

export default UploadController;
