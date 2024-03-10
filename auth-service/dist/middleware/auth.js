"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Middleware to verify and decode JWT
const Auth = (req, res, next) => {
    const token = req.header('authorization'); // or wherever you store your JWT in the request headers
    //strip out the bearer part of the token
    const tokenParts = token === null || token === void 0 ? void 0 : token.split(' ');
    const tokenValue = (tokenParts === null || tokenParts === void 0 ? void 0 : tokenParts.length) === 2 ? tokenParts[1] : token;
    if (!tokenValue) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(tokenValue, 'myjwtsecretneedtoputitin.envfile');
        req.user = decoded; // This will make the user details available in the request object
        next();
    }
    catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};
exports.Auth = Auth;
