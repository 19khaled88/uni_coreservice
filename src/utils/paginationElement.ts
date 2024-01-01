import { Request } from "express";

export const pagenationElement = async (req: Request) => {
    const paginationOptions = {
        page: Number(req.query.page),
        limit: Number(req.query.limit),
        sortBy: req.query.sortBy?.toString(),
        sortOrder: req.query.sortOrder?.toString(),
    }

    return paginationOptions
}