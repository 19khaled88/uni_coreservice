"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicSearchableFields = exports.filterFields = exports.academicSemesterTitleCodeMapper = void 0;
exports.academicSemesterTitleCodeMapper = {
    Autumn: '01',
    Summer: '02',
    Fall: '03',
};
exports.filterFields = ['searchTerm', 'title', 'code', 'year'];
exports.academicSearchableFields = ['title', 'code', 'startMonth', 'endMonth'];
