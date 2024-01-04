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
exports.academicDepartmentService = void 0;
const client_1 = require("@prisma/client");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationCalculate_1 = require("../../../helpers/paginationCalculate");
const constants_1 = require("./constants");
const prisma = new client_1.PrismaClient();
const createAcademicDepartment = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma.academicDepartment.create({
        data: data
    });
    if (!res) {
        throw new Error('Failed to create academic department');
    }
    return res;
});
const allDepartments = (paginationOptions, filter) => __awaiter(void 0, void 0, void 0, function* () {
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
            OR: constants_1.departmentSearchableFields.map((item) => {
                return {
                    [item]: {
                        contains: searchTerm,
                        mode: "insensitive",
                    },
                };
            }),
        });
    }
    if (Object.keys(filters).length) {
        andCondition.push({
            AND: Object.entries(filters).map(([field, value]) => ({
                [field]: value
            }))
        });
    }
    const finalConditions = andCondition.length > 0 ? { AND: andCondition } : {};
    const sortCondition = {};
    if (paginate.sortBy && paginate.sortOrder) {
        sortCondition[paginate.sortBy] = paginate.sortOrder;
    }
    const res = yield prisma.academicDepartment.findMany({
        where: finalConditions,
        take: paginate.limit,
        skip: paginate.skip,
        orderBy: paginate.sortBy && paginate.sortOrder
            ? { [paginate.sortBy]: paginate.sortOrder }
            : { createdAt: "asc" },
    });
    const total = yield prisma.academicDepartment.count();
    return {
        meta: {
            page: paginate.page,
            limit: paginate.limit,
            total,
        },
        data: res,
    };
});
const singleDepartment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield prisma.academicDepartment.findFirst({
        where: { id: id },
        select: {
            title: true,
            academicFaculty: true,
            academicFacultyId: true,
            faculties: true,
            students: true
        }
    });
    return response;
});
const updateDepartment = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma.academicDepartment.findFirst({
        where: {
            id: id
        }
    });
    if (!isExist) {
        throw new ApiError_1.default(400, 'This department not exist');
    }
    const response = yield prisma.academicDepartment.update({
        where: {
            id: id
        },
        data: payload
    });
    return response;
});
const deleteDepartment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma.academicDepartment.findFirst({
        where: {
            id: id
        }
    });
    if (!isExist) {
        throw new ApiError_1.default(400, 'This department not exist');
    }
    const response = yield prisma.academicDepartment.delete({
        where: {
            id: id
        }
    });
    return response;
});
exports.academicDepartmentService = {
    createAcademicDepartment,
    allDepartments,
    singleDepartment,
    updateDepartment,
    deleteDepartment
};
