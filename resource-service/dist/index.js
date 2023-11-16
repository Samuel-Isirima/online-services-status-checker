"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const DatabaseConnection_1 = __importDefault(require("./database/DatabaseConnection"));
const app = (0, express_1.default)();
const port = process.env.PROFILE_SERVICE_PORT || 3100;
// Body parsing Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//connect to database
(0, DatabaseConnection_1.default)();
app.use('/api/v1', routes_1.default);
try {
    app.listen(port, () => {
        console.log(`Profile service running on http://localhost:${port}`);
    });
}
catch (error) {
    console.log(`An error occurred while trying to initialize profile service: ${error.message}`);
}
