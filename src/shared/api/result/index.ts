export type BaseResult = {
  isSuccess: boolean;
  isFailure: boolean;
  errorMessage: string;
  exceptionMessage: string;
};

export type BaseResultWithData<Data> = {
  isSuccess: boolean;
  isFailure: boolean;
  errorMessage: string;
  exceptionMessage: string;
  data: Data;
};