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
Object.defineProperty(exports, "__esModule", { value: true });
exports.offeredCourseService = void 0;
const client_1 = require("@prisma/client");
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
exports.offeredCourseService = {
    insertOfferedCourse,
};
