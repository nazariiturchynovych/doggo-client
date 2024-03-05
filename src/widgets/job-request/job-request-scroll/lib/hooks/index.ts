import { useInfiniteQuery } from '@tanstack/react-query';
import { GetPageOfJobRequestsRequestProps, jobRequestApi } from '@/shared/api/job-request-api';
import { BaseResponseWithData, PageOf } from '@/shared/api/result';
import { JobRequest } from '@/entities/jobRequest/model/models.ts';

export const useGetPageOfJobRequests = (initialProps: GetPageOfJobRequestsRequestProps) => {
  return useInfiniteQuery<BaseResponseWithData<PageOf<JobRequest>>, unknown>({
    queryKey: ['GetPageOfJobRequest'],
    queryFn: async ({ pageParam = initialProps }) => await jobRequestApi.getPageOfJobRequests(pageParam as GetPageOfJobRequestsRequestProps),
    getNextPageParam: (lastPageData: BaseResponseWithData<PageOf<JobRequest>>) => {
      const nextPage: GetPageOfJobRequestsRequestProps = {
        nameSearchTerm: initialProps.nameSearchTerm,
        sortColumn: initialProps.sortColumn,
        sortOrder: initialProps.sortOrder,
        pageCount: initialProps.pageCount,
        page: lastPageData.data.page + 1,
      };

      return lastPageData.data.hasNextPage ? nextPage : false;
    },
    initialPageParam: {
      ...initialProps,
      page: 1,
    },
    refetchInterval: () => false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};