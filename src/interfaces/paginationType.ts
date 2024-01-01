// import { SemesterCode, SemesterTitle } from "@prisma/client";
import { SortOrder } from "mongoose";

export type IPagination = {
    page?: number;
    limit?: number;
    sortBy?: string | number;
    sortOrder?: SortOrder;
}
export type IFilters ={
    searchTerm?:string 
    // searchTerm?:string |SemesterTitle | SemesterCode
}