import { ErrorRequestHandler } from "express"
import config from "../../config"
import ApiError from "../../errors/ApiError"
import handleValidationError from "../../errors/handleValidationError"
import IGenericErrorMessage from "../../errors/interface"
import { ZodError } from "zod"
import { handleZodError } from "../../errors/zodErrorValidation"
import castError from "../../errors/castError"

const GlobalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    let statusCode = 500
    let message = 'something wrong'
    let errorMessage: IGenericErrorMessage[] = []

    if (err?.name === 'ValidationError') {
        const simplifiedError = handleValidationError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessage = simplifiedError.errorMessages;

    } else if (err instanceof ApiError) {
        statusCode = err?.statusCode;
        message = err?.message;
        errorMessage = err?.stack ?
            [
                {
                    path: '',
                    message: err?.message
                }
            ] : [];
    } else if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err)
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessage = simplifiedError.errorMessage;
    } else if (err?.code === 11000) {
        message = 'Duplicate error happened. Document already exists!'
        errorMessage = [{
            path: '',
            message: "Document already exists!"
        }]
    } else if(err?.name === 'CastError'){
        const simplifiedError = castError(err)
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessage = simplifiedError.errorMessages;
    }
    else if (err instanceof Error) {
        message = err?.message;
        errorMessage = err?.message ?
            [
                { path: '', message: err?.message }
            ] : [];
    }

    res.status(statusCode).json({
        success: false,
        statusCode: statusCode,
        message,
        errorMessage,
        stack: config.env !== 'production' ? err?.stack : undefined
    })

    
}

export default GlobalErrorHandler;