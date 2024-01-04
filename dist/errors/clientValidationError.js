"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClientValidationError = (err) => {
    const errors = [
        {
            path: "",
            message: err.message,
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: "Prisma client vlidation error",
        errorMessages: errors,
    };
};
exports.default = prismaClientValidationError;
