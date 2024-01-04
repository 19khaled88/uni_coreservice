"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const route_1 = __importDefault(require("./app/modules/academicSemester/route"));
const route_2 = __importDefault(require("./app/modules/academicFaculty/route"));
const route_3 = __importDefault(require("./app/modules/academicDepartment/route"));
const route_4 = __importDefault(require("./app/modules/student/route"));
const route_5 = __importDefault(require("./app/modules/room/route"));
const route_6 = __importDefault(require("./app/modules/faculty/route"));
const route_7 = __importDefault(require("./app/modules/building/route"));
const route_8 = __importDefault(require("./app/modules/course/route"));
const route_9 = __importDefault(require("./app/modules/semesterRegistration/route"));
const route_10 = __importDefault(require("./app/modules/offeredCourse/route"));
const http_status_1 = __importDefault(require("http-status"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
//parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
//routes
app.use('/api/v1/academicSemester', route_1.default);
app.use('/api/v1/academicFaculty', route_2.default);
app.use('/api/v1/academicDepartment', route_3.default);
app.use('/api/v1/student', route_4.default);
app.use('/api/v1/room', route_5.default);
app.use('/api/v1/faculty', route_6.default);
app.use('/api/v1/building', route_7.default);
app.use('/api/v1/course', route_8.default);
app.use('/api/v1/registerSemester', route_9.default);
app.use('/api/v1/offeredCourse', route_10.default);
app.get('/', (req, res) => {
    res.json({ message: 'Core service for university management' });
});
//global error handler
app.use(globalErrorHandler_1.default);
//handle not found
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: 'Not found',
        errorMessage: [{
                path: req.originalUrl,
                message: 'This Page not found'
            }]
    });
    next();
});
exports.default = app;
