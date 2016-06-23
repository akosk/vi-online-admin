import express from 'express';
import path from 'path';
import multipart from 'connect-multiparty';

import UsersController from './controllers/usersController';
import AuthController from './controllers/authController';
import UserturnController from './controllers/userturnController';
import TurnController from './controllers/turnController';
import SignupDataController from './controllers/signupDataController';
import UsertestsController from './controllers/usertestsController';
import UploadController from './controllers/uploadController';
import {authorize} from './lib/auth';

const router = (app)=> {

  app.use('/images', express.static(path.join(__dirname, '../src/images')));
  app.use('/files', express.static(path.join(__dirname, '../src/files')));

  const statementsPath = path.join(__dirname, '../src/statements');
  app.use('/statements', express.static(statementsPath));

  const multipartMiddleware = multipart();
  app.use('/upload', multipartMiddleware, authorize, UploadController.uploadSignupStatement);

  app.post('/users', UsersController.saveUser);
  app.get('/users', authorize, UsersController.getAllUsers);
  app.post('/delete-users', authorize, UsersController.deleteUsers);
  app.post('/delete-turns', authorize, TurnController.deleteTurns);
  app.post('/login', AuthController.login);
  app.post('/loginWithToken', AuthController.loginWithToken);
  app.post('/signup-datas/:signup_data_id', authorize, SignupDataController.saveSignupData);
  app.post('/signup-datas', authorize, SignupDataController.saveSignupData);

  app.put('/userturns', authorize, UserturnController.signUpToTurn);
  app.get('/userturns/:user_id/:turn_id', authorize, UserturnController.getUserTurn);

  app.get('/turns', authorize, TurnController.getAllTurns);
  app.post('/turns', authorize, TurnController.saveTurn);

  app.get('/get-current-turn/:user_id', authorize, UserturnController.getCurrentTurn);
  app.get('/get-signup-data/:user_id', authorize, SignupDataController.getSignupDataByUserId);

  app.post('/finalize-signup', authorize, UserturnController.finalizeSignup);

  app.get('/usertests/:user_id/:test_id', authorize,UsertestsController.getUserTest);
  app.post('/usertests/:user_id/:usertest_id', authorize, UsertestsController.saveUserTest);

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/index.html'));
  });
};

export default router;
