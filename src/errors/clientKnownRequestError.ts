import { Prisma } from "@prisma/client";
import { IGenericErrorResponse } from "../interfaces/error";
import IGenericErrorMessage from "./interface";

const prismaClientKnownRequestError = (
  err: Prisma.PrismaClientKnownRequestError
): IGenericErrorResponse => {
    let errors: IGenericErrorMessage[]=[]
    let message =""
    const statusCode = 400;

    if(err.code === 'P2025'){
        message= (err.meta?.cause as string) || 'Record not found' 
        errors =[
            {
                path:'',
                message
            }
        ]
    } else if(err.code === 'P2003'){
        if(err.message.includes('delete()` invocation:')){
            message = 'Delete failed'
            errors =[
                {
                    path:'',
                    message
                }
            ]
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

export default prismaClientKnownRequestError;