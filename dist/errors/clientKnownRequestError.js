"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClientKnownRequestError = (err) => {
    var _a;
    let errors = [];
    let message = "";
    const statusCode = 400;
    if (err.code === 'P2025') {
        message = ((_a = err.meta) === null || _a === void 0 ? void 0 : _a.cause) || 'Record not found';
        errors = [
            {
                path: '',
                message
            }
        ];
    }
    else if (err.code === 'P2003') {
        if (err.message.includes('delete()` invocation:')) {
            message = 'Delete failed';
            errors = [
                {
                    path: '',
                    message
                }
            ];
        }
    }
    //   const errors = [
    //     {
    //       path: "",
    //       message: err.message,
    //     },
    //   ];
    return {
        statusCode,
        message: "Prisma client Known request error",
        errorMessages: errors,
    };
};
exports.default = prismaClientKnownRequestError;
