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
exports.offeredCourseController = void 0;
const service_1 = require("./service");
const http_status_1 = __importDefault(require("http-status"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const constants_1 = require("../../../shared/constants");
const constants_2 = require("./constants");
const insertOfferedCourse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield service_1.offeredCourseService.insertOfferedCourse(req.body);
        res.status(http_status_1.default.OK).json({
            success: true,
            message: 'Offered course created successfully',
            result: response,
        });
    }
    catch (error) {
        next(error);
    }
});
const offeredCourses = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paginationRes = (0, pick_1.default)(req.query, constants_1.paginationFields);
        const filter = (0, pick_1.default)(req.query, constants_2.filterFields);
        const response = yield service_1.offeredCourseService.offeredCourses(paginationRes, filter);
        res.status(http_status_1.default.OK).json({
            success: true,
            message: 'Offered courses retrieved successfully',
            result: response,
        });
    }
    catch (error) {
        next(error);
    }
});
const offeredCourse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield service_1.offeredCourseService.offeredCourse(req.params.id);
        res.status(http_status_1.default.OK).json({
            success: true,
            message: 'Offered course retrieved successfully',
            result: response,
        });
    }
    catch (error) {
        next(error);
    }
});
const offeredCourseUpdate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield service_1.offeredCourseService.offeredCourseUpdate(req.params.id, req.body);
        res.status(http_status_1.default.OK).json({
            success: true,
            message: 'Offered course updated successfully',
            result: response,
        });
    }
    catch (error) {
        next(error);
    }
});
const offeredCourseDelete = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield service_1.offeredCourseService.offeredCourseDelete(req.params.id);
        res.status(http_status_1.default.OK).json({
            success: true,
            message: 'Offered course deleted successfully',
            result: response,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.offeredCourseController = {
    insertOfferedCourse,
    offeredCourses,
    offeredCourse,
    offeredCourseUpdate,
    offeredCourseDelete
};
