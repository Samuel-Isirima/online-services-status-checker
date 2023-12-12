import multer from 'multer';
import path from 'path';

declare global {
    namespace Express {
        interface Request {
            file?: any;
        }
    }
  }

/**
 * Separate uploads by day to avoid having too many files in one folder
 */

const storageProfilePicture = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + '/../../uploads/profile-pictures')
  },
  filename: (req, file, cb) => 
  {
    const extname = path.extname(file.originalname);
    cb(null, `${Date.now()}${extname}`) // Generate a unique filename
  },
});


const storageKYCID = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + '/../../uploads/kyc/id')
  },
  filename: (req, file, cb) => 
  {
    const extname = path.extname(file.originalname);
    cb(null, `${Date.now()}${extname}`) // Generate a unique filename
  },
});


const storageKYCPOR = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + '/../../uploads/kyc/por')
  },
  filename: (req, file, cb) => 
  {
    const extname = path.extname(file.originalname);
    cb(null, `${Date.now()}${extname}`) // Generate a unique filename
  },
});


export const uploadProfilePicture = multer({ storage: storageProfilePicture });
export const uploadKYCID = multer({ storage: storageKYCID });
export const uploadKYCPOR = multer({ storage: storageKYCPOR });

