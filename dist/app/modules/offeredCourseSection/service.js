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
exports.offeredCourseSectionService = void 0;
const client_1 = require("@prisma/client");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationCalculate_1 = require("../../../helpers/paginationCalculate");
const constants_1 = require("./constants");
const prisma = new client_1.PrismaClient();
const create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const ifOfferedCourseExist = yield prisma.offeredCourse.findFirst({
        where: {
            id: payload.offeredCourseId
        }
    });
    if (!ifOfferedCourseExist) {
        throw new ApiError_1.default(400, 'Selected offered course not exist');
    }
    payload.semesterRegistrationId = ifOfferedCourseExist.semesterRegistrationId;
    const response = yield prisma.offeredCourseSetion.create({
        data: payload
    });
    return response;
});
const offeredCourseSections = (paginationOptions, filter) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, sortBy, sortOrder } = paginationOptions;
    const { searchTerm } = filter, filters = __rest(filter, ["searchTerm"]);
    const paginate = (0, paginationCalculate_1.calculatePagination)({ page, limit, sortBy, sortOrder });
    const andCondition = [];
    // if (searchTerm) {
    //   andCondition.push({
    //     OR: offeredCourseSectionSearchableFields.map((item) => {
    //       return {
    //         [item]: {
    //           contains: searchTerm,
    //           mode: "insensitive",
    //         },
    //       };
    //     }),
    //   });
    // }
    //   if (searchTerm) {
    //   andCondition.push({
    //     OR: offeredCourseSectionSearchableFields.map((item) => {
    //       return {
    //         [item]: {
    //             ...(typeof searchTerm === 'string'
    //               ? { contains: searchTerm, mode: 'insensitive' }
    //               : { equalTo: searchTerm }),
    //           },
    //       };
    //     }),
    //   });
    // }
    if (searchTerm) {
        andCondition.push({
            OR: constants_1.offeredCourseSectionSearchableFields.map((item) => {
                const condition = {};
                if (item != 'maxCapacity') {
                    condition[item] = {
                        contains: searchTerm,
                        mode: 'insensitive',
                    };
                }
                else if (item === 'maxCapacity' && isNaN(parseInt(searchTerm))) {
                    condition[item] = {
                        equals: parseInt('0000000000000000000'),
                    };
                }
                else {
                    condition[item] = {
                        equals: parseInt(searchTerm),
                    };
                }
                return condition;
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
    const response = yield prisma.offeredCourseSetion.findMany({
        where: finalConditions,
        take: paginate.limit,
        skip: paginate.skip,
        orderBy: paginate.sortBy && paginate.sortOrder
            ? { [paginate.sortBy]: paginate.sortOrder }
            : { createdAt: "asc" },
    });
    const total = yield prisma.offeredCourseSetion.count();
    return {
        meta: {
            page: paginate.page,
            limit: paginate.limit,
            total,
        },
        data: response,
    };
});
const offeredCourseSection = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield prisma.offeredCourseSetion.findFirst({
        where: {
            id: id
        }
    });
    return response;
});
const offeredCourseSectionUpdate = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield prisma.offeredCourseSetion.update({
        where: {
            id: id
        },
        data: payload
    });
    return response;
});
const offeredCourseSectionDelete = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield prisma.offeredCourseSetion.delete({
        where: {
            id: id
        }
    });
    return response;
});
exports.offeredCourseSectionService = {
    create,
    offeredCourseSection,
    offeredCourseSections,
    offeredCourseSectionUpdate,
    offeredCourseSectionDelete
};
