import { Prisma } from "@prisma/client";
import { IGenericErrorResponse } from "../interfaces/error";

const prismaClientValidationError = (
  err: Prisma.PrismaClientValidationError
): IGenericErrorResponse => {
  const errors = [
    {
      path: "",
      message: err.message,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: "Prisma client vlidation error",
    errorMessages: errors,
  };
};

export default prismaClientValidationError;
