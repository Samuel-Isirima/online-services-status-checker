"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dotenv = require('dotenv');
dotenv.config();
const RequestController = require('../controllers/RequestController');
const requestRouter = (0, express_1.Router)();
// requestRouter.post('/create', Auth, RequestController.create)
// requestRouter.get('/', Auth, RequestController.index)
// requestRouter.get('/:identifier', Auth, RequestController.get)
// requestRouter.post('/:identifier/update', Auth, RequestController.update)
exports.default = requestRouter;
