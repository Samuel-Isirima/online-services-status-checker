"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const dotenv = require('dotenv');
dotenv.config();
const RegisterController = require('../controllers/RegisterController');
const LoginController = require('../controllers/LoginController');
const EmailVerificationController = require('../controllers/EmailVerificationController');
const PasswordRecoveryController = require('../controllers/PasswordRecoveryController');
const ChangePasswordController = require('../controllers/ChangePasswordController');
const authRouter = (0, express_1.Router)();
authRouter.post('/register', RegisterController.register);
authRouter.post('/login', LoginController.login);
authRouter.post('/email/verify/request-token', EmailVerificationController.requestToken);
authRouter.post('/email/verify', EmailVerificationController.verifyEmail);
authRouter.post('/password/recovery/request-token', PasswordRecoveryController.requestToken);
authRouter.post('/password/reset', PasswordRecoveryController.recoverPassword);
authRouter.post('/password/change', auth_1.Auth, ChangePasswordController.changePassword);
exports.default = authRouter;
