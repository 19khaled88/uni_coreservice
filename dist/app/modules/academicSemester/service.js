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
exports.academicSemesterService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const client_1 = require("@prisma/client");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationCalculate_1 = require("../../../helpers/paginationCalculate");
const constants_1 = require("./constants");
// import { AcademicSemester } from './model'
const prisma = new client_1.PrismaClient();
const createAcademicSemester = (data) => __awaiter(void 0, void 0, void 0, function* () {
    if (constants_1.academicSemesterTitleCodeMapper[data.title] != data.code) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, "Semester code not match the semester title requirement");
    }
    const checkIfExist = yield prisma.academicSemester.findFirst({
        where: {
            AND: [{ title: data.title }, { year: data.year }],
        },
    });
    if (checkIfExist) {
        throw new ApiError_1.default(400, "Already posted same semester");
    }
    const res = yield prisma.academicSemester.create({ data });
    if (!res) {
        throw new Error("Failed to create academic semester");
    }
    return res;
});
const allSemesters = (paginationOptions, filter) => __awaiter(void 0, void 0, void 0, function* () {
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
            OR: constants_1.academicSearchableFields.map((item) => {
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
        // andCondition.push({
        //   AND: Object.keys(filters).map((field) => ({
        //     [field]: {
        //         equals:(filters as any)[field],
        //     },
        //   })),
        // });
        andCondition.push({
            AND: Object.keys(filters).map((field) => {
                let value = filters[field];
                if (field === "year") {
                    value = Number(value);
                }
                const condition = { [field]: { equals: value } };
                return condition;
            }),
        });
    }
    const finalConditions = andCondition.length > 0 ? { AND: andCondition } : {};
    const res = yield prisma.academicSemester.findMany({
        where: finalConditions,
        take: paginate.limit,
        skip: paginate.skip,
        orderBy: paginate.sortBy && paginate.sortOrder
            ? { [paginate.sortBy]: paginate.sortOrder }
            : { createdAt: "asc" },
    });
    const total = yield prisma.academicSemester.count();
    console.log(searchTerm, filters);
    return {
        meta: {
            page: paginate.page,
            limit: paginate.limit,
            total,
        },
        data: res,
    };
});
const singleSemester = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield prisma.academicSemester.findFirst({
        where: {
            id: id,
        },
        select: {
            year: true,
            title: true,
            code: true,
            startMonth: true,
            endMonth: true,
        },
    });
    return response;
});
const updateSemester = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma.academicSemester.findFirst({
        where: {
            id: id,
        },
    });
    if (!isExist) {
        throw new ApiError_1.default(400, "This Semester not exist");
    }
    if (payload.title != undefined &&
        payload.code != undefined &&
        constants_1.academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, "Semester code not match the semester year");
    }
    const response = yield prisma.academicSemester.update({
        where: {
            id: id,
        },
        data: payload,
    });
    return response;
});
const deleteSemester = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma.academicSemester.findFirst({
        where: {
            id: id,
        },
    });
    if (!isExist) {
        throw new ApiError_1.default(400, "This Semester not exist");
    }
    const response = yield prisma.academicSemester.delete({
        where: {
            id: id,
        },
    });
    return response;
});
exports.academicSemesterService = {
    createAcademicSemester,
    allSemesters,
    singleSemester,
    updateSemester,
    deleteSemester,
};
