"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var user_controller_1 = __importDefault(require("../controllers/user.controller"));
var api = (0, express_1.Router)()
    .use(user_controller_1["default"]);
exports["default"] = (0, express_1.Router)().use('/api', api);
