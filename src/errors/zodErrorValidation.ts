import { ZodError, ZodIssue } from "zod";
import IGenericErrorMessage from "./interface";

export const handleZodError = (err: ZodError) => {
    const errors: IGenericErrorMessage[] = err.issues.map((er:ZodIssue) => {
        return {
            path: er?.path[er.path.length - 1],
            message: er.message
        }
    })

    const statusCode = 400
    return {
        statusCode,
        message: 'Zod Validation error',
        errorMessage: errors
    }
}