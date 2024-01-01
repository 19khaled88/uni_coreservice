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
exports.academicDepartmentController = void 0;
const constants_1 = require("../../../shared/constants");
const pick_1 = __importDefault(require("../../../shared/pick"));
const service_1 = require("./service");
const http_status_1 = __importDefault(require("http-status"));
const constants_2 = require("./constants");
const createAcademicDepartment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield service_1.academicDepartmentService.createAcademicDepartment(req.body);
        res.status(200).json({
            success: true,
            message: 'Successfully created Academic faculty',
            result: response,
        });
        // next()
    }
    catch (error) {
        next(error);
    }
});
const allDepartments = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const paginationOptions = {
        //     page: Number(req.query.page),
        //     limit: Number(req.query.limit),
        //     sortBy: req.query.sortBy?.toString(),
        //     sortOrder: req.query.sortOrder?.toString(),
        // }
        // const paginationRes = await pagenationElement(req)
        const paginationRes = (0, pick_1.default)(req.query, constants_1.paginationFields);
        const filter = (0, pick_1.default)(req.query, constants_2.filterFields);
        const response = yield service_1.academicDepartmentService.allDepartments(paginationRes, filter);
        res.status(200).json({
            success: true,
            message: 'Successfully Retrieved Academic departments',
            meta: response === null || response === void 0 ? void 0 : response.meta,
            result: response === null || response === void 0 ? void 0 : response.data,
        });
        // next()
    }
    catch (error) {
        next(error);
    }
});
const singleDepartment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield service_1.academicDepartmentService.singleDepartment(req.params.id);
        if (response != null) {
            res.status(200).json({
                success: true,
                message: 'Single department retrieved',
                data: response,
            });
        }
        else {
            res.status(http_status_1.default.NOT_FOUND).json({
                success: false,
                message: 'Data not found',
                data: null,
            });
        }
    }
    catch (error) {
        next(error);
    }
});
const updateDepartment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield service_1.academicDepartmentService.updateDepartment(req.params.id, req.body);
        if (response != null) {
            res.status(200).json({
                success: true,
                message: 'Department updated successfully for given ID',
                data: response,
            });
        }
        else {
            res.status(http_status_1.default.NOT_FOUND).json({
                success: false,
                message: 'Department not updated!!',
                data: null,
            });
        }
    }
    catch (error) {
        next(error);
    }
});
const deleteDepartment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield service_1.academicDepartmentService.deleteDepartment(req.params.id);
        if (response != null) {
            res.status(200).json({
                success: true,
                message: 'Department deleted successfully for given ID',
                data: response,
            });
        }
        else {
            res.status(http_status_1.default.NOT_FOUND).json({
                success: false,
                message: 'Department not deleted',
                data: null,
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.academicDepartmentController = {
    createAcademicDepartment,
    allDepartments,
    singleDepartment,
    updateDepartment,
    deleteDepartment,
};
