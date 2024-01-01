import mongoose from "mongoose";
import { IGenericErrorResponse } from "../interfaces/error";


const castError = (err: mongoose.Error.CastError): IGenericErrorResponse => {
    const statusCode = 400;
    return {
        statusCode,
        message: 'Cast Error',
        errorMessages: [
            { path: '', message: 'Id is not valid' }
        ],
    };

};

export default castError;