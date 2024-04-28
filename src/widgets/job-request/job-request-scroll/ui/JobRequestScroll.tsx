import React from 'react';
import { useGetPageOfJobRequests } from '@/widgets/job-request/job-request-scroll/lib/hooks';
import InfiniteScroll from '@/shared/ui/infinite-scroll.tsx';
import { Loader } from '@/shared/ui';
import JobRequestList from '@/widgets/job-request/job-request-list/ui/JobRequestList.tsx';

const JobRequestScroll: React.FC = () => {
  const { data, fetchNextPage, isFetching } = useGetPageOfJobRequests({ page: 1, pageCount: 10 });

  if (!data) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader size={200} />
      </div>
    );
  }
  const hasNextPage = data.pages[data.pages.length - 1].data.hasNextPage;

  return (
    <>
      {data &&
        data.pages &&
        data.pages.map((page, index) => (
          <JobRequestList key={`page-${index}`} jobRequests={page.data.entities} />
        ))}
      <InfiniteScroll
        hasMore={hasNextPage}
        isLoading={isFetching}
        next={fetchNextPage}
        threshold={1}>
        {hasNextPage ? (
          <div>
            <Loader size={100} />
          </div>
        ) : (
          <div className={'m-4 text-center text-lg font-bold'}>That`s all job requests</div>
        )}
      </InfiniteScroll>
    </>
  );
};

export default JobRequestScroll;
