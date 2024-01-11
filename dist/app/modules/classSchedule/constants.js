"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classScheduleSearchableFields = exports.filterFields = void 0;
exports.filterFields = [
    "searchTerm",
    "startTime",
    "endTime",
];
exports.classScheduleSearchableFields = [
    "startTime",
    "endTime",
    //   "offeredCourseId",
    //   "semesterRegistrationId",
];
function formatToHumanReadable(isoDateString) {
    const dateObject = new Date(isoDateString);
    // Extracting components
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1; // Months are zero-based
    const day = dateObject.getDate();
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();
    // Creating a human-readable date and time string
    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day} ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}
exports.default = formatToHumanReadable;
