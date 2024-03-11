import { Router, Request, Response, NextFunction} from 'express'
import { Auth } from '../middleware/auth';
const dotenv = require('dotenv');
dotenv.config();

const RegisterController = require('../controllers/RegisterController');
const LoginController = require('../controllers/LoginController');
const EmailVerificationController = require('../controllers/EmailVerificationController');
const PasswordRecoveryController = require('../controllers/PasswordRecoveryController');
const ChangePasswordController = require('../controllers/ChangePasswordController');
const PasswordRecoveryRequest = require('../requests/PasswordRecoveryRequest');
const EmailVerificationRequest = require('../requests/EmailVerificationRequest');
const ChangePasswordRequest = require('../requests/ChangePasswordRequest');
const LoginRequest = require('../requests/LoginRequest');
const RegisterRequest = require('../requests/RegisterRequest');

const authRouter: Router = Router()


authRouter.post('/register', RegisterRequest.register, RegisterController.register)

authRouter.post('/login', LoginRequest.login, LoginController.login)

authRouter.post('/email/verify/request-token', EmailVerificationRequest.requestToken, EmailVerificationController.requestToken)

authRouter.post('/email/verify', EmailVerificationRequest.verifyEmail,  EmailVerificationController.verifyEmail)

authRouter.post('/password/recovery/request-token', PasswordRecoveryRequest.requestToken, PasswordRecoveryController.requestToken)

authRouter.post('/password/reset', PasswordRecoveryRequest.resetPassword, PasswordRecoveryController.recoverPassword)

authRouter.post('/password/change', Auth, ChangePasswordRequest.changePassword, ChangePasswordController.changePassword)



export default authRouter;