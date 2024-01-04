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
exports.courseService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createCourse = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { preRequisiteCourses } = payload, courses = __rest(payload, ["preRequisiteCourses"]);
    const response = yield prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield transactionClient.course.create({
            data: courses
        });
        if (preRequisiteCourses && preRequisiteCourses.length > 0) {
            for (let index = 0; index < preRequisiteCourses.length; index++) {
                const createPrerequisite = yield transactionClient.courseToPrerequisite.create({
                    data: {
                        courseId: res.id,
                        preRequisiteId: preRequisiteCourses[index].courseId
                    }
                });
            }
        }
        return res;
    }));
    if (response) {
        const course = yield prisma.course.findUnique({
            where: {
                id: response.id
            },
            include: {
                preRequisite: {
                    include: {
                        preRequisite: true
                    }
                },
                preRequisiteFor: {
                    include: {
                        course: true,
                    }
                }
            }
        });
        return course;
    }
});
const courseAssignToFaculty = (courseId, faculties) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = faculties.map((facultyId) => ({
            courseId,
            facultyId,
        }));
        // Use createMany to insert records
        const createManyResponse = yield prisma.courseFaculty.createMany({
            data,
        });
        // Fetch the created records based on the courseId and facultyIds
        const createdRecords = yield prisma.courseFaculty.findMany({
            where: {
                courseId,
                facultyId: {
                    in: faculties,
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
const deleteAssignedCourse = (courseId, faculties) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Use createMany to insert records
        const deleteManyResponse = yield prisma.courseFaculty.deleteMany({
            where: {
                courseId,
                facultyId: {
                    in: faculties
                }
            }
        });
        // Fetch the created records based on the courseId and facultyIds
        const remaningRecords = yield prisma.courseFaculty.findMany({
            where: {
                courseId,
                facultyId: {
                    notIn: faculties,
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
exports.courseService = {
    createCourse,
    courseAssignToFaculty,
    deleteAssignedCourse
};
