"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.semesterUpdatingMapping = exports.registerdSemesterSearchableFields = exports.filterFields = void 0;
exports.filterFields = ['searchTerm', 'startDate', 'endDate', 'status', 'minCredit', 'maxCredit'];
exports.registerdSemesterSearchableFields = ['startDate', 'endDate', 'status', 'minCredit', 'maxCredit'];
exports.semesterUpdatingMapping = {
    UPCOMMING: 'ONGOING',
    ONGOING: 'ENDED'
};
