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
exports.courseController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const service_1 = require("./service");
const createCourse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield service_1.courseService.createCourse(req.body);
        res.status(http_status_1.default.OK).json({
            success: true,
            message: "Successfully created Corse",
            result: response,
        });
    }
    catch (error) {
        next(error);
    }
});
const courseAssignToFaculty = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield service_1.courseService.courseAssignToFaculty(req.params.courseId, req.body.faculties);
        res.status(http_status_1.default.OK).json({
            success: true,
            message: "Successfully assigned course to faculty or faculties",
            result: response,
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteAssignedCourse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield service_1.courseService.deleteAssignedCourse(req.params.courseId, req.body.faculties);
        res.status(http_status_1.default.OK).json({
            success: true,
            message: "Successfully deleted assigned course",
            result: response,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.courseController = {
    createCourse,
    courseAssignToFaculty,
    deleteAssignedCourse,
};
