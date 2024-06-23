"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.app = void 0;
var app_1 = require("firebase/app");
var auth_1 = require("firebase/auth");
//@ts-ignore
var firebase_app_config_1 = require("/firebase-app-config");
var app = (0, app_1.initializeApp)(firebase_app_config_1.firebaseConfig);
exports.app = app;
var auth = (0, auth_1.getAuth)(app);
exports.auth = auth;
