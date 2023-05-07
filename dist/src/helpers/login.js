"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const axios_1 = __importDefault(require("axios"));
const login = async (email = "user@hardhatchainlink.io", password = "strongpassword777") => {
    try {
        console.info(`\nAuthenticating User ${email} using password ${password}\n`);
        const authResponse = await axios_1.default.post("http://127.0.0.1:6688/sessions", { email, password }, {
            headers: {
                accept: "application/json",
                "content-type": "application/json",
                referer: "http://127.0.0.1:6688/signin",
            },
        });
        if (authResponse.status === 429) {
            throw new Error("Too Many Requests");
        }
        const regex = /clsession=[a-zA-Z0-9=\-_]+/g; // Grab the session token
        const cookies = authResponse.headers["set-cookie"];
        const sessionCookie = cookies?.find((cookie) => cookie.match("clsession"));
        const session = sessionCookie?.match(regex);
        if (session !== null && session !== undefined) {
            return session[0];
        }
        else {
            throw new Error("Authentication cookie not found");
        }
    }
    catch (err) {
        console.error("Failed to authenticate user with error: ", err);
        return "";
    }
};
exports.login = login;
//# sourceMappingURL=login.js.map