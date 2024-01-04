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
exports.facultyService = void 0;
const client_1 = require("@prisma/client");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationCalculate_1 = require("../../../helpers/paginationCalculate");
const constants_1 = require("./constants");
const prisma = new client_1.PrismaClient();
const createFaculty = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const checkIfExist = yield prisma.faculty.findFirst({
        where: {
            facultyId: data.facultyId,
        },
    });
    if (checkIfExist) {
        throw new ApiError_1.default(400, "Already posted same faculty");
    }
    const res = yield prisma.faculty.create({ data });
    if (!res) {
        throw new Error("Failed to create faculty");
    }
    return res;
});
const allFaculties = (paginationOptions, filter) => __awaiter(void 0, void 0, void 0, function* () {
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
            OR: constants_1.facultySearchableFields.map((item) => {
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
    const res = yield prisma.faculty.findMany({
        where: finalConditions,
        take: paginate.limit,
        skip: paginate.skip,
        orderBy: paginate.sortBy && paginate.sortOrder
            ? { [paginate.sortBy]: paginate.sortOrder }
            : { createdAt: "asc" },
    });
    const total = yield prisma.academicSemester.count();
    return {
        meta: {
            page: paginate.page,
            limit: paginate.limit,
            total,
        },
        data: res,
    };
});
const singleFaculty = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield prisma.faculty.findFirst({
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
            designation: true,
            facultyId: true,
            academicDepartment: true,
            academicFaculty: true,
        },
    });
    return response;
});
const updateFaculty = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma.faculty.findFirst({
        where: {
            facultyId: payload.facultyId
        },
    });
    if (!isExist) {
        throw new ApiError_1.default(400, "This Faculty not exist");
    }
    const response = yield prisma.faculty.update({
        where: {
            id: id,
        },
        data: payload,
    });
    return response;
});
const deleteFaculty = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma.faculty.findFirst({
        where: {
            id: id,
        },
    });
    if (!isExist) {
        throw new ApiError_1.default(400, "This Faculty not exist");
    }
    const response = yield prisma.faculty.delete({
        where: {
            id: id,
        },
    });
    return response;
});
const assignFacultyToCourse = (facultyId, courses) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = courses.map((courseId) => ({
            courseId,
            facultyId,
        }));
        // Use createMany to insert records
        yield prisma.courseFaculty.createMany({
            data,
        });
        // Fetch the created records based on the courseId and facultyIds
        const createdRecords = yield prisma.courseFaculty.findMany({
            where: {
                facultyId,
                courseId: {
                    in: courses,
                },
            },
            include: {
                faculty: true,
                course: true
            }
        });
        return createdRecords;
    }
    catch (error) {
        throw error;
    }
});
const deleteAssignedfaculty = (facultyId, courses) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Use createMany to insert records
        const deleteManyResponse = yield prisma.courseFaculty.deleteMany({
            where: {
                facultyId,
                courseId: {
                    in: courses
                }
            }
        });
        // Fetch the created records based on the courseId and facultyIds
        const remaningRecords = yield prisma.courseFaculty.findMany({
            where: {
                facultyId,
                courseId: {
                    notIn: courses,
                },
            },
            include: {
                faculty: true,
                course: true
            }
        });
        return remaningRecords;
    }
    catch (error) {
        throw error;
    }
});
exports.facultyService = {
    createFaculty,
    allFaculties,
    singleFaculty,
    updateFaculty,
    deleteFaculty,
    assignFacultyToCourse,
    deleteAssignedfaculty
};
