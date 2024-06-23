"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileButton = exports.EmailSignUpButton = exports.EmailSignInButton = exports.GoogleSignInButton = exports.LogoutButton = void 0;
require("./ProfileButtonStyle.css");
var auth_actions_1 = require("../../auth-actions");
var auth_1 = require("firebase/auth");
var nextfirejs_firebase_1 = require("../../nextfirejs-firebase");
var auth_2 = require("./auth");
var getFirebaseErrors_1 = require("./getFirebaseErrors");
var react_1 = __importStar(require("react"));
var react_tiny_popover_1 = require("react-tiny-popover");
function LogoutButton(_a) {
    var children = _a.children;
    return react_1.default.createElement("div", { onClick: auth_actions_1.doSignOut }, children);
}
exports.LogoutButton = LogoutButton;
function GoogleSignInButton(_a) {
    var _this = this;
    var children = _a.children, className = _a.className;
    var doSignInWithGoogle = function () { return __awaiter(_this, void 0, void 0, function () {
        var provider, resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    provider = new auth_1.GoogleAuthProvider();
                    return [4 /*yield*/, (0, auth_1.signInWithPopup)(nextfirejs_firebase_1.auth, provider)];
                case 1:
                    resp = _a.sent();
                    if (resp) {
                        setTimeout(function () {
                            window.location.reload();
                        }, 1000);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    return react_1.default.createElement("div", { onClick: doSignInWithGoogle, className: className }, children);
}
exports.GoogleSignInButton = GoogleSignInButton;
function EmailSignInButton(_a) {
    var children = _a.children, email = _a.email, password = _a.password, setErrorMessage = _a.setErrorMessage, className = _a.className, setLoading = _a.setLoading;
    function doSignInWithEmailAndPassword() {
        return __awaiter(this, void 0, void 0, function () {
            var userCredential, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (setLoading)
                            setLoading(true);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, (0, auth_1.signInWithEmailAndPassword)(nextfirejs_firebase_1.auth, email, password)];
                    case 2:
                        userCredential = _a.sent();
                        if (userCredential) {
                            setTimeout(function () {
                                window.location.reload();
                            }, 1000);
                        }
                        if (setLoading)
                            setLoading(false);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        setErrorMessage((0, getFirebaseErrors_1.decodeFirebaseError)({ errorCode: error_1.code }));
                        if (setLoading)
                            setLoading(false);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    return react_1.default.createElement("div", { onClick: doSignInWithEmailAndPassword, className: className }, children);
}
exports.EmailSignInButton = EmailSignInButton;
function EmailSignUpButton(_a) {
    var children = _a.children, email = _a.email, password = _a.password, setErrorMessage = _a.setErrorMessage, className = _a.className, setLoading = _a.setLoading;
    function doCreateUserWithEmailAndPassword() {
        return __awaiter(this, void 0, void 0, function () {
            var userCredential, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (setLoading)
                            setLoading(true);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, (0, auth_1.createUserWithEmailAndPassword)(nextfirejs_firebase_1.auth, email, password)];
                    case 2:
                        userCredential = _a.sent();
                        if (userCredential) {
                            setTimeout(function () {
                                window.location.reload();
                            }, 1000);
                        }
                        if (setLoading)
                            setLoading(false);
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        setErrorMessage((0, getFirebaseErrors_1.decodeFirebaseError)({ errorCode: error_2.code }));
                        if (setLoading)
                            setLoading(false);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    return react_1.default.createElement("div", { onClick: doCreateUserWithEmailAndPassword, className: className }, children);
}
exports.EmailSignUpButton = EmailSignUpButton;
function ProfileButton(_a) {
    var _b = _a.size, size = _b === void 0 ? 30 : _b;
    var _c = (0, react_1.useState)(false), isPopoverOpen = _c[0], setIsPopoverOpen = _c[1];
    var currentUser = (0, auth_2.getUserCS)().currentUser;
    if (!currentUser)
        return null;
    return react_1.default.createElement(react_tiny_popover_1.Popover, { isOpen: isPopoverOpen, positions: ["bottom", "left", "right", "top"], onClickOutside: function () { return setIsPopoverOpen(false); }, content: react_1.default.createElement(ProfilePopup, { user: currentUser }) },
        react_1.default.createElement("div", { onClick: function () { return setIsPopoverOpen(!isPopoverOpen); } },
            react_1.default.createElement(ProfileButtonTrigger, { user: currentUser, size: size })));
}
exports.ProfileButton = ProfileButton;
function LogoutLogo(_a) {
    var _b = _a.height, height = _b === void 0 ? 20 : _b, _c = _a.width, width = _c === void 0 ? 20 : _c, props = __rest(_a, ["height", "width"]);
    return react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", height: height, width: width, id: "logout" },
        react_1.default.createElement("g", null,
            react_1.default.createElement("path", { d: "M7 6a1 1 0 0 0 0-2H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h2a1 1 0 0 0 0-2H6V6zm13.82 5.42-2.82-4a1 1 0 0 0-1.39-.24 1 1 0 0 0-.24 1.4L18.09 11H10a1 1 0 0 0 0 2h8l-1.8 2.4a1 1 0 0 0 .2 1.4 1 1 0 0 0 .6.2 1 1 0 0 0 .8-.4l3-4a1 1 0 0 0 .02-1.18z" })));
}
function ProfileButtonTrigger(_a) {
    var _b, _c;
    var user = _a.user, size = _a.size;
    var imageUrl = (_b = user === null || user === void 0 ? void 0 : user.photoURL) !== null && _b !== void 0 ? _b : "https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=" + ((_c = user === null || user === void 0 ? void 0 : user.displayName) !== null && _c !== void 0 ? _c : user === null || user === void 0 ? void 0 : user.email);
    return (react_1.default.createElement("img", { src: imageUrl, alt: "profile", height: size, width: size, className: "rounded-full", id: "profileImage", style: { cursor: "pointer" } }));
}
;
function ProfilePopup(_a) {
    var _b, _c;
    var user = _a.user;
    var imageUrl = (_b = user === null || user === void 0 ? void 0 : user.photoURL) !== null && _b !== void 0 ? _b : "https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=" + ((_c = user === null || user === void 0 ? void 0 : user.displayName) !== null && _c !== void 0 ? _c : user === null || user === void 0 ? void 0 : user.email);
    var popupStyle = {
        width: "calc(-40px + min(100vw, 370px))",
        backgroundColor: '#fff',
        border: '1px solid #00000022',
        borderRadius: 8,
        color: "#000",
        padding: 0,
        paddingTop: 10,
        margin: 10,
    };
    var profilePopupImageStyle = {
        borderRadius: 9999,
        height: 30,
        width: 30,
        margin: 5,
        marginLeft: 13,
        marginTop: 8,
    };
    return react_1.default.createElement("div", { style: popupStyle },
        react_1.default.createElement("div", { style: { display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 10 } },
            react_1.default.createElement("img", { src: imageUrl, alt: "profile", height: 30, width: 30, style: profilePopupImageStyle }),
            react_1.default.createElement("div", { style: { display: "flex", flexDirection: "column" } },
                (user === null || user === void 0 ? void 0 : user.displayName) && react_1.default.createElement("div", { style: {
                        fontSize: 15,
                        fontWeight: 500,
                        marginLeft: 8,
                        marginRight: 13,
                        marginBottom: 0,
                    } }, user === null || user === void 0 ? void 0 : user.displayName),
                react_1.default.createElement("div", { style: { fontSize: 14, color: "#00000088", marginLeft: 8, marginRight: 13 } }, user === null || user === void 0 ? void 0 : user.email))),
        react_1.default.createElement("hr", null),
        react_1.default.createElement(LogoutButton, null,
            react_1.default.createElement("div", { className: "profileLogout" },
                react_1.default.createElement(LogoutLogo, null),
                "Log Out")));
}
;
