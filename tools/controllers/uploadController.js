import uuid from 'uuid';
import fs from 'fs.extra';
import path from 'path';
import {updateSignupStatementFile} from '../models/userModel';
import {getUserCurrentTurn} from '../models/userturnModel';

class UploadController {

  static uploadSignupStatement(req, res) {

    const statementsPath = path.join(__dirname, '../../src/statements');
    const sourceFilePath = req.files.file.path;
    console.log(req.files.file.originalFilename);
    const filename = `${uuid.v1()}_${req.files.file.originalFilename}`;
    const targetFilePath = `${statementsPath}/${filename}`;
    fs.move(sourceFilePath, targetFilePath, (err) => {
      if (err) {
        res.status(400);
        res.send('A fájl mentése nem sikerült.');
        return;
      }

      const user_id = req.token.user.id;

      getUserCurrentTurn(user_id)
        .then((turn)=> {
          console.log('uploadSignupStatement turn', turn)
          return updateSignupStatementFile(user_id, turn.id, filename)
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
  }
}

export default UploadController;
