"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../config"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const handleValidationError_1 = __importDefault(require("../../errors/handleValidationError"));
const zod_1 = require("zod");
const zodErrorValidation_1 = require("../../errors/zodErrorValidation");
const castError_1 = __importDefault(require("../../errors/castError"));
const clientValidationError_1 = __importDefault(require("../../errors/clientValidationError"));
const client_1 = require("@prisma/client");
const clientKnownRequestError_1 = __importDefault(require("../../errors/clientKnownRequestError"));
const GlobalErrorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = "something wrong";
    let errorMessage = [];
    if ((err === null || err === void 0 ? void 0 : err.name) === "ValidationError") {
        const simplifiedError = (0, handleValidationError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessage = simplifiedError.errorMessages;
    }
    else if (err instanceof client_1.Prisma.PrismaClientValidationError) {
        const simplifiedError = (0, clientValidationError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessage = simplifiedError.errorMessages;
    }
    else if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        const simplifiedError = (0, clientKnownRequestError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessage = simplifiedError.errorMessages;
    }
    else if (err instanceof ApiError_1.default) {
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
        message = err === null || err === void 0 ? void 0 : err.message;
        errorMessage = (err === null || err === void 0 ? void 0 : err.stack)
            ? [
                {
                    path: "",
                    message: err === null || err === void 0 ? void 0 : err.message,
                },
            ]
            : [];
    }
    else if (err instanceof zod_1.ZodError) {
        const simplifiedError = (0, zodErrorValidation_1.handleZodError)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessage = simplifiedError.errorMessage;
    }
    else if ((err === null || err === void 0 ? void 0 : err.code) === 11000) {
        message = "Duplicate error happened. Document already exists!";
        errorMessage = [
            {
                path: "",
                message: "Document already exists!",
            },
        ];
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "CastError") {
        const simplifiedError = (0, castError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessage = simplifiedError.errorMessages;
    }
    else if (err instanceof Error) {
        message = err === null || err === void 0 ? void 0 : err.message;
        errorMessage = (err === null || err === void 0 ? void 0 : err.message) ? [{ path: "", message: err === null || err === void 0 ? void 0 : err.message }] : [];
    }
    res.status(statusCode).json({
        success: false,
        statusCode: statusCode,
        message,
        errorMessage,
        stack: config_1.default.env !== "production" ? err === null || err === void 0 ? void 0 : err.stack : undefined,
    });
};
exports.default = GlobalErrorHandler;
