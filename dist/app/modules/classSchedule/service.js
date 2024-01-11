"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.classScheduleService = void 0;
const client_1 = require("@prisma/client");
const paginationCalculate_1 = require("../../../helpers/paginationCalculate");
const constants_1 = __importStar(require("./constants"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const prisma = new client_1.PrismaClient();
const create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const checkIfRoomAvailable = yield prisma.offeredCourseClassSchedule.findFirst({
        where: {
            AND: [
                { roomId: payload.roomId },
                { dayOfWeek: payload.dayOfWeek },
                {
                    OR: [
                        {
                            AND: [
                                { startTime: { lte: payload.startTime } },
                                { endTime: { gte: payload.startTime } },
                            ],
                        },
                        {
                            AND: [
                                { startTime: { lte: payload.endTime } },
                                { endTime: { gte: payload.endTime } },
                            ],
                        },
                        {
                            AND: [
                                { startTime: { gte: payload.startTime } },
                                { endTime: { lte: payload.endTime } },
                            ],
                        },
                    ],
                },
            ],
        },
    });
    if (checkIfRoomAvailable) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, "Room is not available for this time period");
    }
    const checkIfFacultyAvailable = yield prisma.offeredCourseClassSchedule.findFirst({
        where: {
            AND: [
                { facultyId: payload.facultyId },
                { dayOfWeek: payload.dayOfWeek },
                {
                    OR: [
                        {
                            AND: [
                                { startTime: { lte: payload.startTime } },
                                { endTime: { gte: payload.startTime } },
                            ],
                        },
                        {
                            AND: [
                                { startTime: { lte: payload.endTime } },
                                { endTime: { gte: payload.endTime } },
                            ],
                        },
                        {
                            AND: [
                                { startTime: { gte: payload.startTime } },
                                { endTime: { lte: payload.endTime } },
                            ],
                        },
                    ],
                },
            ],
        },
    });
    if (checkIfFacultyAvailable) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, "Faculty is not available for this time period");
    }
    const response = yield prisma.offeredCourseClassSchedule.create({
        data: payload,
    });
    return response;
});
const classSchedules = (paginationOptions, filter) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, sortBy, sortOrder } = paginationOptions;
    const { searchTerm } = filter, filters = __rest(filter, ["searchTerm"]);
    const paginate = (0, paginationCalculate_1.calculatePagination)({ page, limit, sortBy, sortOrder });
    const andCondition = [];
    if (searchTerm) {
        andCondition.push({
            OR: constants_1.classScheduleSearchableFields.map((item) => {
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
    const response = yield prisma.offeredCourseClassSchedule.findMany({
        where: finalConditions,
        take: paginate.limit,
        skip: paginate.skip,
        orderBy: paginate.sortBy && paginate.sortOrder
            ? { [paginate.sortBy]: paginate.sortOrder }
            : { createdAt: "asc" }
    });
    const total = yield prisma.offeredCourseClassSchedule.count();
    const res = response.map((item) => (Object.assign(Object.assign({}, item), { startTime: (0, constants_1.default)(item.startTime), endTime: (0, constants_1.default)(item.endTime) })));
    return {
        meta: {
            page: paginate.page,
            limit: paginate.limit,
            total,
        },
        data: res,
    };
});
const classSchedule = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield prisma.offeredCourseClassSchedule.findFirst({
        where: {
            id: id,
        },
    });
    return response;
});
const classScheduleUpdate = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield prisma.offeredCourseClassSchedule.update({
        where: {
            id: id,
        },
        data: payload,
    });
    return response;
});
const classScheduleDelete = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield prisma.offeredCourseClassSchedule.delete({
        where: {
            id: id,
        },
    });
    return response;
});
exports.classScheduleService = {
    create,
    classSchedule,
    classSchedules,
    classScheduleUpdate,
    classScheduleDelete,
};
