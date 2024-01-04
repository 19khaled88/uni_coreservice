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
exports.semesterRegisterController = void 0;
const service_1 = require("./service");
const http_status_1 = __importDefault(require("http-status"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const constants_1 = require("../../../shared/constants");
const constants_2 = require("./constants");
const registerSemester = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield service_1.semesterRegistrationService.registerSemester(req.body);
        res.status(http_status_1.default.OK).json({
            success: true,
            message: 'Semester registered successfully',
            result: response,
        });
    }
    catch (error) {
        next(error);
    }
});
const allRegisteredSemester = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paginationRes = (0, pick_1.default)(req.query, constants_1.paginationFields);
        const filter = (0, pick_1.default)(req.query, constants_2.filterFields);
        const response = yield service_1.semesterRegistrationService.getAllRegisteredSemester(paginationRes, filter);
        res.status(http_status_1.default.OK).json({
            success: true,
            message: 'Successfully Retrieved all registerd semesters',
            meta: response === null || response === void 0 ? void 0 : response.meta,
            result: response === null || response === void 0 ? void 0 : response.data,
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteRegisteredSemester = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield service_1.semesterRegistrationService.deleteRegistedSemester(req.params.id);
        res.status(http_status_1.default.OK).json({
            success: true,
            message: 'Deleted registerd semester successfully',
            result: response,
        });
    }
    catch (error) {
        next(error);
    }
});
const updateRegisteredSemester = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield service_1.semesterRegistrationService.updateRegistedSemester(req.params.id, req.body);
        res.status(http_status_1.default.OK).json({
            success: true,
            message: 'Updated registerd semester successfully',
            result: response,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.semesterRegisterController = {
    registerSemester,
    allRegisteredSemester,
    deleteRegisteredSemester,
    updateRegisteredSemester
};
