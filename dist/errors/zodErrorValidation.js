"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleZodError = void 0;
const handleZodError = (err) => {
    const errors = err.issues.map((er) => {
        return {
            path: er === null || er === void 0 ? void 0 : er.path[er.path.length - 1],
            message: er.message
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: 'Zod Validation error',
        errorMessage: errors
    };
};
exports.handleZodError = handleZodError;
