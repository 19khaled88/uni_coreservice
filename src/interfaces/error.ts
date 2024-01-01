import IGenericErrorMessage from "../errors/interface";

export type IGenericErrorResponse = {
    statusCode: number;
    message: string;
    errorMessages: IGenericErrorMessage[];
  };
  