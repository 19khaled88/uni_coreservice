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
Object.defineProperty(exports, "__esModule", { value: true });
exports.offeredCourseService = void 0;
const client_1 = require("@prisma/client");
const paginationCalculate_1 = require("../../../helpers/paginationCalculate");
const constants_1 = require("./constants");
const prisma = new client_1.PrismaClient();
const insertOfferedCourse = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { academicDepartmentId, semesterRegistrationId, courseIds } = payload;
    const notexistants = yield prisma.offeredCourse.findMany({
        where: {
            courseId: {
                in: [...courseIds],
            },
        },
        select: {
            courseId: true,
        },
    });
    const existingCourseIdSet = new Set(notexistants.map((item) => item.courseId));
    const courseIdToInsertFiltered = courseIds.filter((name) => !existingCourseIdSet.has(name));
    if (courseIdToInsertFiltered.length > 0) {
        const createManyData = courseIdToInsertFiltered.map((courseId) => ({
            academicDepartmentId: academicDepartmentId,
            semesterRegistrationId: semesterRegistrationId,
            courseId: courseId,
        }));
        const response = yield prisma.offeredCourse.createMany({
            data: createManyData,
        });
        const foundRecords = yield prisma.offeredCourse.findMany({
            where: {
                AND: [
                    {
                        academicDepartmentId: {
                            in: [academicDepartmentId, semesterRegistrationId],
                        }
                    }, {
                        semesterRegistrationId: {
                            in: [academicDepartmentId, semesterRegistrationId]
                        }
                    }
                ]
            },
            include: {
                course: true,
                academicDepartment: true,
                semesterRegistration: true
            }
        });
        return foundRecords;
    }
    else {
        return null;
    }
    //   const isExist = await prisma.offeredCourse.findFirst({
    //     where:{
    //         academicDepartmentId:academicDepartmentId,
    //         semesterRegistrationId:semesterRegistrationId,
    //         courseId:{
    //             in:[...courseIds]
    //         }
    //     }
    //   })
    //   if(isExist){
    //     throw new ApiError(400, 'This course already offered')
    //   }
    //   const createManyData = courseIds.map((courseId: string) => ({
    //     academicDepartmentId: academicDepartmentId,
    //     semesterRegistrationId: semesterRegistrationId,
    //     courseId: courseId,
    //   }));
    //  const response =  await prisma.offeredCourse.createMany({
    //     data: createManyData,
    //   });
    //   const foundRecords = await prisma.offeredCourse.findMany({
    //     where: {
    //         AND:[
    //             {
    //                 academicDepartmentId:{
    //                     in:[academicDepartmentId,semesterRegistrationId],
    //                 }
    //             },{
    //                 semesterRegistrationId:{
    //                     in:[academicDepartmentId,semesterRegistrationId]
    //                 }
    //             }
    //         ]
    //     },
    //     include:{
    //         course:true,
    //         academicDepartment:true,
    //         semesterRegistration:true
    //     }
    //   });
    //   return foundRecords
});
const offeredCourses = (paginationOptions, filter) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, sortBy, sortOrder } = paginationOptions;
    const { searchTerm } = filter, filters = __rest(filter, ["searchTerm"]);
    const paginate = (0, paginationCalculate_1.calculatePagination)({ page, limit, sortBy, sortOrder });
    const andCondition = [];
    if (searchTerm) {
        andCondition.push({
            OR: constants_1.offeredCourseSearchableFields.map((item) => {
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
    const response = yield prisma.offeredCourse.findMany({
        where: finalConditions,
        take: paginate.limit,
        skip: paginate.skip,
        orderBy: paginate.sortBy && paginate.sortOrder
            ? { [paginate.sortBy]: paginate.sortOrder }
            : { createdAt: "asc" },
    });
    const total = yield prisma.offeredCourse.count();
    return {
        meta: {
            page: paginate.page,
            limit: paginate.limit,
            total,
        },
        data: response,
    };
});
const offeredCourse = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield prisma.offeredCourse.findFirst({
        where: {
            id: id
        }
    });
    return response;
});
const offeredCourseUpdate = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield prisma.offeredCourse.update({
        where: {
            id: id
        },
        data: payload
    });
    return response;
});
const offeredCourseDelete = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield prisma.offeredCourse.delete({
        where: {
            id: id
        }
    });
    return response;
});
exports.offeredCourseService = {
    insertOfferedCourse,
    offeredCourses,
    offeredCourse,
    offeredCourseUpdate,
    offeredCourseDelete
};
