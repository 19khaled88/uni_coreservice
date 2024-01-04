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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentService = void 0;
const client_1 = require("@prisma/client");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationCalculate_1 = require("../../../helpers/paginationCalculate");
const constants_1 = require("./constants");
// import { AcademicSemester } from './model'
const prisma = new client_1.PrismaClient();
const createStudent = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const ifExist = yield prisma.student.findFirst({
        where: {
            studentId: data.studentId,
        },
    });
    if (ifExist) {
        throw new ApiError_1.default(400, "This student already exist");
    }
    const res = yield prisma.student.create({ data });
    if (!res) {
        throw new Error("Failed to create student");
    }
    return res;
});
const allStudents = (paginationOptions, filter) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, sortBy, sortOrder } = paginationOptions;
    const { searchTerm } = filter, filters = __rest(filter, ["searchTerm"]);
    const paginate = (0, paginationCalculate_1.calculatePagination)({ page, limit, sortBy, sortOrder });
    //   const andCondition = [
    //     {
    //       $or: [
    //         {
    //           title: {
    //             $regex: searchTerm,
    //             $options: 'i',
    //           },
    //         },
    //       ],
    //     },
    //   ]
    const andCondition = [];
    if (searchTerm) {
        andCondition.push({
            OR: constants_1.studentSearchableFields.map((item) => {
                return {
                    [item]: {
                        contains: searchTerm,
                        mode: "insensitive",
                    },
                };
            }),
        });
    }
    if (Object.keys(filters).length > 0) {
        andCondition.push({
            AND: Object.keys(filters).map((field) => ({
                [field]: {
                    equals: filters[field],
                },
            })),
        });
    }
    const finalConditions = andCondition.length > 0 ? { AND: andCondition } : {};
    const res = yield prisma.student.findMany({
        where: finalConditions,
        take: paginate.limit,
        skip: paginate.skip,
        orderBy: paginate.sortBy && paginate.sortOrder
            ? { [paginate.sortBy]: paginate.sortOrder }
            : { createdAt: "asc" },
    });
    const total = yield prisma.student.count();
    return {
        meta: {
            page: paginate.page,
            limit: paginate.limit,
            total,
        },
        data: res,
    };
});
const singleStudent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield prisma.student.findFirst({
        where: {
            id: id,
        },
        select: {
            firstName: true,
            lastName: true,
            middleName: true,
            email: true,
            gender: true,
            bloodGroup: true,
            profileImage: true,
            contactNo: true,
            academicDepartmentId: true,
            academicFacultyId: true,
            academicSemesterId: true,
            academicDepartment: true,
            academicFaculty: true,
            academicSemester: true,
        },
    });
    return response;
});
const updatStudent = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma.student.findFirst({
        where: {
            studentId: payload.studentId,
        },
    });
    if (isExist) {
        throw new ApiError_1.default(400, "This Student already exist");
    }
    const response = yield prisma.student.update({
        where: {
            id: id,
        },
        data: payload,
    });
    return response;
});
const deleteStudent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma.student.findFirst({
        where: {
            id: id,
        },
    });
    if (!isExist) {
        throw new ApiError_1.default(400, "This Student not exist");
    }
    const response = yield prisma.student.delete({
        where: {
            id: id,
        },
    });
    return response;
});
exports.studentService = {
    createStudent,
    allStudents,
    singleStudent,
    updatStudent,
    deleteStudent,
};
