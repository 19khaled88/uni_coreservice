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
exports.studentController = void 0;
const constants_1 = require("../../../shared/constants");
const pick_1 = __importDefault(require("../../../shared/pick"));
const service_1 = require("./service");
const constants_2 = require("./constants");
const http_status_1 = __importDefault(require("http-status"));
const createStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield service_1.studentService.createStudent(req.body);
        res.status(http_status_1.default.OK).json({
            success: true,
            message: 'Successfully created student',
            result: response,
        });
        // next()
    }
    catch (error) {
        next(error);
    }
});
const allStudents = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paginationRes = (0, pick_1.default)(req.query, constants_1.paginationFields);
        const filter = (0, pick_1.default)(req.query, constants_2.filterFields);
        const response = yield service_1.studentService.allStudents(paginationRes, filter);
        res.status(http_status_1.default.OK).json({
            success: true,
            message: 'Successfully Retrieved students',
            meta: response === null || response === void 0 ? void 0 : response.meta,
            result: response === null || response === void 0 ? void 0 : response.data,
        });
        // next()
    }
    catch (error) {
        next(error);
    }
});
const singleStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield service_1.studentService.singleStudent(req.params.id);
        if (response != null) {
            res.status(200).json({
                success: true,
                message: 'Single student retrieved',
                data: response,
            });
        }
        res.status(http_status_1.default.NOT_FOUND).json({
            success: false,
            message: 'Data not found',
            data: null,
        });
    }
    catch (error) {
        next(error);
    }
});
const updateStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield service_1.studentService.updatStudent(req.params.id, req.body);
        if (response != null) {
            res.status(200).json({
                success: true,
                message: 'Student updated successfully for given ID',
                data: response,
            });
        }
        res.status(http_status_1.default.NOT_FOUND).json({
            success: false,
            message: 'Student not updated!!',
            data: null,
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield service_1.studentService.deleteStudent(req.params.id);
        if (response != null) {
            res.status(200).json({
                success: true,
                message: 'Student deleted successfully for given ID',
                data: response,
            });
        }
        else {
            res.status(http_status_1.default.NOT_FOUND).json({
                success: false,
                message: 'Student not deleted',
                data: null,
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.studentController = {
    createStudent,
    allStudents,
    singleStudent,
    updateStudent,
    deleteStudent,
};
