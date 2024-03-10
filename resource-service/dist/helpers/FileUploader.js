"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadKYCPOR = exports.uploadKYCID = exports.uploadProfilePicture = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
/**
 * Separate uploads by day to avoid having too many files in one folder
 */
const storageProfilePicture = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + '/../../uploads/profile-pictures');
    },
    filename: (req, file, cb) => {
        const extname = path_1.default.extname(file.originalname);
        cb(null, `${Date.now()}${extname}`); // Generate a unique filename
    },
});
const storageKYCID = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + '/../../uploads/kyc/id');
    },
    filename: (req, file, cb) => {
        const extname = path_1.default.extname(file.originalname);
        cb(null, `${Date.now()}${extname}`); // Generate a unique filename
    },
});
const storageKYCPOR = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + '/../../uploads/kyc/por');
    },
    filename: (req, file, cb) => {
        const extname = path_1.default.extname(file.originalname);
        cb(null, `${Date.now()}${extname}`); // Generate a unique filename
    },
});
exports.uploadProfilePicture = (0, multer_1.default)({ storage: storageProfilePicture });
exports.uploadKYCID = (0, multer_1.default)({ storage: storageKYCID });
exports.uploadKYCPOR = (0, multer_1.default)({ storage: storageKYCPOR });
