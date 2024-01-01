"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const castError = (err) => {
    const statusCode = 400;
    return {
        statusCode,
        message: 'Cast Error',
        errorMessages: [
            { path: '', message: 'Id is not valid' }
        ],
    };
};
exports.default = castError;
