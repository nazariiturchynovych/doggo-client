import React from 'react';
import { Loader } from '@/shared/ui';
import { useGetPageOfJobRequests } from '@/shared/hooks';
import InfiniteScroll from '@/shared/ui/infinite-scroll';
import JobRequestList from '@/widgets/job-request/job-request-list/ui/JobRequestList.tsx';
import { JobRequestListSkeleton } from '@/widgets/job-request/job-request-list/ui/JobRequestListSkeleton.tsx';

const JobRequestScroll: React.FC = () => {
  const {
    data: jobRequestsPage,
    fetchNextPage,
    isLoading,
  } = useGetPageOfJobRequests({ page: 1, pageCount: 10 });

  return (
    <div className={'flex flex-col'}>
      <div className={'border-b p-4 sm:p-8'}>h</div>
      {isLoading && <JobRequestListSkeleton />}
      {jobRequestsPage &&
        jobRequestsPage.pages &&
        jobRequestsPage.pages.map((page, index) => (
          <>
            <JobRequestList key={`page-${index}`} jobRequests={page.data.entities} />
            <InfiniteScroll
              hasMore={jobRequestsPage.pages[jobRequestsPage.pages.length - 1].data.hasNextPage}
              isLoading={isLoading}
              next={fetchNextPage}
              threshold={1}>
              {jobRequestsPage.pages[jobRequestsPage.pages.length - 1].data.hasNextPage && (
                <div className={'flex h-full w-full items-center justify-center'}>
                  <Loader size={100} />
                </div>
              )}
            </InfiniteScroll>
          </>
        ))}
    </div>
  );
};

export default JobRequestScroll;
