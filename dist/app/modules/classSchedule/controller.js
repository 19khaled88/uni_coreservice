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
exports.classScheduleController = void 0;
const service_1 = require("./service");
const http_status_1 = __importDefault(require("http-status"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const constants_1 = require("../../../shared/constants");
const constants_2 = require("./constants");
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield service_1.classScheduleService.create(req.body);
        res.status(http_status_1.default.OK).json({
            success: true,
            message: 'Class schedule created successfully',
            result: response,
        });
    }
    catch (error) {
        next(error);
    }
});
const classSchedules = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paginationRes = (0, pick_1.default)(req.query, constants_1.paginationFields);
        const filter = (0, pick_1.default)(req.query, constants_2.filterFields);
        const response = yield service_1.classScheduleService.classSchedules(paginationRes, filter);
        res.status(http_status_1.default.OK).json({
            success: true,
            message: 'Class schedules retrieved successfully',
            result: response,
        });
    }
    catch (error) {
        next(error);
    }
});
const classSchedule = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield service_1.classScheduleService.classSchedule(req.params.id);
        res.status(http_status_1.default.OK).json({
            success: true,
            message: 'Class schedule retrieved successfully',
            result: response,
        });
    }
    catch (error) {
        next(error);
    }
});
const classScheduleUpdate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield service_1.classScheduleService.classScheduleUpdate(req.params.id, req.body);
        res.status(http_status_1.default.OK).json({
            success: true,
            message: 'Class schedule updated successfully',
            result: response,
        });
    }
    catch (error) {
        next(error);
    }
});
const classScheduleDelete = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield service_1.classScheduleService.classScheduleDelete(req.params.id);
        res.status(http_status_1.default.OK).json({
            success: true,
            message: 'Class schedule deleted successfully',
            result: response,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.classScheduleController = {
    create,
    classSchedules,
    classSchedule,
    classScheduleUpdate,
    classScheduleDelete
};
