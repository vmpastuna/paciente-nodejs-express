"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.MONGODB_URI = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/pacientesdb";
exports.PORT = process.env.PORT || 3000;
