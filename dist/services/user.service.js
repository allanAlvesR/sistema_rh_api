"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.getLoggedUser = exports.login = exports.createUser = void 0;
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var http_errors_1 = __importDefault(require("http-errors"));
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
var checkEmail = function (email) { return __awaiter(void 0, void 0, void 0, function () {
    var checkEmail;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.user.findUnique({
                    where: {
                        email: email
                    },
                    select: {
                        id: true
                    }
                })];
            case 1:
                checkEmail = _a.sent();
                if (checkEmail) {
                    throw (0, http_errors_1["default"])(422, { email: 'has already been taken' });
                }
                return [2 /*return*/];
        }
    });
}); };
var createUser = function (input) { return __awaiter(void 0, void 0, void 0, function () {
    var email, name, password, hashedPassword, user;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                email = (_a = input.email) === null || _a === void 0 ? void 0 : _a.trim();
                name = (_b = input.name) === null || _b === void 0 ? void 0 : _b.trim();
                password = (_c = input.password) === null || _c === void 0 ? void 0 : _c.trim();
                if (!email) {
                    throw (0, http_errors_1["default"])(422, { email: "can't be blank" });
                }
                if (!name) {
                    throw (0, http_errors_1["default"])(422, { name: "can't be blank" });
                }
                if (!password) {
                    throw (0, http_errors_1["default"])(422, { password: "can't be blank" });
                }
                return [4 /*yield*/, checkEmail(email)];
            case 1:
                _d.sent();
                return [4 /*yield*/, bcryptjs_1["default"].hash(password, 10)];
            case 2:
                hashedPassword = _d.sent();
                return [4 /*yield*/, prisma.user.create({
                        data: {
                            name: name,
                            email: email,
                            password: hashedPassword
                        },
                        select: {
                            email: true,
                            name: true
                        }
                    })];
            case 3:
                user = _d.sent();
                return [2 /*return*/, __assign({}, user)];
        }
    });
}); };
exports.createUser = createUser;
var login = function (userPayload) { return __awaiter(void 0, void 0, void 0, function () {
    var email, password, user, match;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                email = (_a = userPayload.email) === null || _a === void 0 ? void 0 : _a.trim();
                password = (_b = userPayload.password) === null || _b === void 0 ? void 0 : _b.trim();
                if (!email) {
                    throw (0, http_errors_1["default"])(422, { email: "can't be blank" });
                }
                if (!password) {
                    throw (0, http_errors_1["default"])(422, { password: "can't be blank" });
                }
                return [4 /*yield*/, prisma.user.findUnique({
                        where: {
                            email: email
                        },
                        select: {
                            email: true,
                            name: true,
                            password: true
                        }
                    })];
            case 1:
                user = _c.sent();
                if (!user) return [3 /*break*/, 3];
                return [4 /*yield*/, bcryptjs_1["default"].compare(password, user.password)];
            case 2:
                match = _c.sent();
                if (match) {
                    return [2 /*return*/, {
                            email: user.email,
                            name: user.name
                        }];
                }
                _c.label = 3;
            case 3: throw (0, http_errors_1["default"])(403, {
                'email or password': 'is invalid'
            });
        }
    });
}); };
exports.login = login;
var getLoggedUser = function (email) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.user.findUnique({
                    where: {
                        email: email
                    },
                    select: {
                        email: true,
                        name: true
                    }
                })];
            case 1:
                user = (_a.sent());
                return [2 /*return*/, __assign({}, user)];
        }
    });
}); };
exports.getLoggedUser = getLoggedUser;
//# sourceMappingURL=user.service.js.map