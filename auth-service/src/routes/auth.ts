import { Router, Request, Response, NextFunction} from 'express'
import { Auth } from '../middleware/auth';
const dotenv = require('dotenv');
dotenv.config();

const RegisterController = require('../controllers/RegisterController');
const LoginController = require('../controllers/LoginController');
const EmailVerificationController = require('../controllers/EmailVerificationController');
const PasswordRecoveryController = require('../controllers/PasswordRecoveryController');
const ChangePasswordController = require('../controllers/ChangePasswordController');

const authRouter: Router = Router()


authRouter.post('/register', RegisterController.register)

authRouter.post('/login', LoginController.login)

authRouter.post('/email/verify/request-token', EmailVerificationController.requestToken)

authRouter.post('/email/verify',  EmailVerificationController.verifyEmail)

authRouter.post('/password/recovery/request-token', PasswordRecoveryController.requestToken)

authRouter.post('/password/reset', PasswordRecoveryController.recoverPassword)

authRouter.post('/password/change', Auth, ChangePasswordController.changePassword)



export default authRouter;