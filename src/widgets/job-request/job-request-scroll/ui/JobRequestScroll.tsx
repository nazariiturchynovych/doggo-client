import React from 'react';
import { useGetPageOfJobRequests } from '@/widgets/job-request/job-request-scroll/lib/hooks';
import InfiniteScroll from '@/shared/ui/infinite-scroll.tsx';
import { Loader } from '@/shared/ui';
import JobRequestList from '@/widgets/job-request/job-request-scroll/ui/JobRequestList.tsx';

const JobRequestScroll: React.FC = () => {
  const { data, fetchNextPage, isFetching } = useGetPageOfJobRequests({ page: 1, pageCount: 10 });

  if (!data) {
    return <Loader />;
  }
  const hasNextPage = data.pages[data.pages.length - 1].data.hasNextPage;

  return (
    <div className="flex w-full flex-col items-center gap-3 px-10">
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
          <div className="flex w-full items-center justify-center">
            <Loader />
          </div>
        ) : (
          <div>That`s all job requests</div>
        )}
      </InfiniteScroll>
    </div>
  );
};

export default JobRequestScroll;
