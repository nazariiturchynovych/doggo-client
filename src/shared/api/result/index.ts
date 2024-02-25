export type BaseResponse = {
  isSuccess: boolean;
  isFailure: boolean;
  errorMessage: string;
  exceptionMessage: string;
};

export type BaseResponseWithData<Data> = {
  isSuccess: boolean;
  isFailure: boolean;
  errorMessage: string;
  exceptionMessage: string;
  data: Data;
};