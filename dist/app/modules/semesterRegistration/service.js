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
exports.semesterRegistrationService = void 0;
const client_1 = require("@prisma/client");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationCalculate_1 = require("../../../helpers/paginationCalculate");
const constants_1 = require("./constants");
const moment_1 = __importDefault(require("moment"));
const prisma = new client_1.PrismaClient();
const registerSemester = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isAnySemesterUpcomingOrOngoing = yield prisma.semesterRegistration.findFirst({
        where: {
            OR: [
                { status: client_1.SemesterRegistrationStatus.ONGOING },
                { status: client_1.SemesterRegistrationStatus.UPCOMMING }
            ]
        }
    });
    if (isAnySemesterUpcomingOrOngoing) {
        throw new ApiError_1.default(400, `This semester already with ${isAnySemesterUpcomingOrOngoing.status} status`);
    }
    const response = yield prisma.semesterRegistration.create({
        data: payload
    });
    return response;
});
const getAllRegisteredSemester = (paginationOptions, filter) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, sortBy, sortOrder } = paginationOptions;
    const { searchTerm } = filter, filters = __rest(filter, ["searchTerm"]);
    const paginate = (0, paginationCalculate_1.calculatePagination)({ page, limit, sortBy, sortOrder });
    const andCondition = [];
    if (searchTerm) {
        andCondition.push({
            OR: constants_1.registerdSemesterSearchableFields.map((item) => {
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
    const res = yield prisma.semesterRegistration.findMany({
        where: finalConditions,
        include: {
            academicSemester: true
        },
        take: paginate.limit,
        skip: paginate.skip,
        orderBy: paginate.sortBy && paginate.sortOrder
            ? { [paginate.sortBy]: paginate.sortOrder }
            : { createdAt: "asc" },
    });
    const total = yield prisma.semesterRegistration.count();
    const formattedResult = res.map(item => (Object.assign(Object.assign({}, item), { 
        // startDate: new Date(item.startDate).toLocaleDateString(), // Adjust the formatting as needed
        // endDate:new Date(item.endDate).toLocaleString(),
        // createdAt:new Date(item.createdAt).toLocaleString(),
        // updatedAt:new Date(item.updatedAt).toLocaleString()
        startDate: (0, moment_1.default)(item.startDate).format('MMMM Do YYYY, h:mm:ss a'), endDate: (0, moment_1.default)(item.endDate).format('MMMM Do YYYY, h:mm:ss a'), createdAt: (0, moment_1.default)(item.createdAt).format('MMMM Do YYYY, h:mm:ss a'), updatedAt: (0, moment_1.default)(item.updatedAt).format('MMMM Do YYYY, h:mm:ss a') })));
    return {
        meta: {
            page: paginate.page,
            limit: paginate.limit,
            total,
        },
        data: formattedResult,
    };
});
const deleteRegistedSemester = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const ifExist = yield prisma.semesterRegistration.findFirst({
        where: {
            id: id
        }
    });
    if (!ifExist) {
        throw new ApiError_1.default(400, 'This semester not registerd yet');
    }
    const response = yield prisma.semesterRegistration.delete({
        where: {
            id: id
        }
    });
    return response;
});
const updateRegistedSemester = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const ifExist = yield prisma.semesterRegistration.findFirst({
        where: {
            id: id
        }
    });
    if (!ifExist) {
        throw new ApiError_1.default(400, 'This semester not registerd yet');
    }
    if (payload.status && constants_1.semesterUpdatingMapping[ifExist.status] !== payload.status) {
        throw new ApiError_1.default(400, 'Semester status must be consistant, Like: UPCOMMING >> ONGOING >> ENDED');
    }
    // const isAnySemesterUpcomingOrOngoing = await prisma.semesterRegistration.findFirst({
    //     where:{
    //         AND:[
    //             {
    //                 id:id
    //             }
    //         ],
    //         OR:[
    //             {status:SemesterRegistrationStatus.ONGOING},
    //             {status:SemesterRegistrationStatus.UPCOMMING}
    //         ]
    //     }
    // });
    // if(isAnySemesterUpcomingOrOngoing){
    //     throw new ApiError(400,`Semester cannot be updted with ${isAnySemesterUpcomingOrOngoing.status} status`)
    // }
    const response = yield prisma.semesterRegistration.update({
        where: {
            id: id
        },
        data: payload,
        include: {
            academicSemester: true
        }
    });
    return response;
});
exports.semesterRegistrationService = {
    registerSemester,
    getAllRegisteredSemester,
    deleteRegistedSemester,
    updateRegistedSemester
};
