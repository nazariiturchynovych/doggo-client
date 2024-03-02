export interface BaseResponse {
  isSuccess: boolean;
  isFailure: boolean;
  errorMessage: string;
  exceptionMessage: string;
}

export interface BaseResponseWithData<Data> extends BaseResponse{
  data: Data;
}