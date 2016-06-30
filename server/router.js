import express from 'express';
import path from 'path';
import multipart from 'connect-multiparty';

import UsersController from './controllers/usersController';
import AuthController from './controllers/authController';
import UserturnController from './controllers/userturnController';
import TestController from './controllers/testController';
import TurnController from './controllers/turnController';
import SignupDataController from './controllers/signupDataController';
import UsertestsController from './controllers/usertestsController';
import UploadController from './controllers/uploadController';
import {authorize,blocked} from './lib/auth';

const router = (app)=> {

  app.use('/images', express.static(path.join(__dirname, '../client/images')));
  app.use('/files', express.static(path.join(__dirname, '../client/files')));

  const statementsPath = path.join(__dirname, '../client/statements');
  app.use('/statements', express.static(statementsPath));


  app.post('/login', AuthController.login);
  app.post('/loginWithToken', AuthController.loginWithToken);


  app.get('/get-current-turn/:user_id', authorize, blocked, UserturnController.getCurrentTurn);
  app.get('/userturns/:user_id/:turn_id', authorize, blocked, UserturnController.getUserTurn);

  app.get('/turns', authorize, blocked, TurnController.getAllTurns);
  app.put('/userturns', authorize, blocked, UserturnController.signUpToTurn);

  app.get('/get-signup-data/:user_id', authorize, blocked, SignupDataController.getSignupDataByUserId);
  app.post('/signup-datas', authorize, blocked, SignupDataController.saveSignupData);
  app.post('/signup-datas/:signup_data_id', authorize, blocked, SignupDataController.saveSignupData);

  app.get('/usertests/:user_id/:test_id', authorize, blocked, UsertestsController.getUserTest);

  app.get('/tests', authorize, blocked,  TestController.getAllTests);
  app.post('/turns', authorize, blocked,  TurnController.saveTurn);

  app.post('/usertests/:user_id/:usertest_id', authorize, blocked,  UsertestsController.saveUserTest);

  const multipartMiddleware = multipart();
  app.use('/upload', multipartMiddleware, authorize, blocked, UploadController.uploadSignupStatement);

  app.post('/finalize-signup', authorize, blocked,  UserturnController.finalizeSignup);

  app.get('/users', authorize, blocked, UsersController.getAllUsers);
  app.post('/users', UsersController.saveUser);

  app.post('/delete-users', authorize, blocked,  UsersController.deleteUsers);

  app.post('/delete-turns', authorize, blocked,  TurnController.deleteTurns);
  app.post('/set-progress/:userturn_id', authorize, blocked,  UserturnController.setProgress);




  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
  });
};

export default router;
