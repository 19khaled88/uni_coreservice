"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenVerify = exports.createRefreshToken = exports.createAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
// export const createAccessToken=async(data:ITokenData):Promise<IAccessTokenResponse>=>{
//    const res = jwt.sign({ data: data }, config.jwt.access_token as Secret, { expiresIn: config.jwt.access_token_expires_id });
//    return {
//     accessToken:res
//    }
// }
const createAccessToken = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const res = jsonwebtoken_1.default.sign({ id: data.id, role: data.role }, config_1.default.jwt.access_token, { expiresIn: config_1.default.jwt.access_token_expires_id });
    return res;
});
exports.createAccessToken = createAccessToken;
const createRefreshToken = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return jsonwebtoken_1.default.sign({ id: data.id, role: data.role }, config_1.default.jwt.refresh_token, { expiresIn: config_1.default.jwt.refresh_token_expires_id });
});
exports.createRefreshToken = createRefreshToken;
const tokenVerify = (token, secret) => __awaiter(void 0, void 0, void 0, function* () {
    return jsonwebtoken_1.default.verify(token, secret);
    //   const decoded =  jwt.verify(token,config.jwt.access_token as Secret) as JwtPayload 
});
exports.tokenVerify = tokenVerify;
