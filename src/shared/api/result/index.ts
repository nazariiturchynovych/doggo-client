export interface BaseResponse {
  isSuccess: boolean;
  isFailure: boolean;
  errorMessage: string;
  exceptionMessage: string;
}

export interface BaseResponseWithData<Data> extends BaseResponse{
  data: Data;
}

export interface PageOf<TEntity>{
  entities: TEntity[],
  page: number
  pageSize: number,
  totalCount: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}