import React from 'react';
import InfiniteScroll from '@/shared/ui/infinite-scroll.tsx';
import { Loader } from '@/shared/ui';
import JobRequestList from '@/widgets/job-request/job-request-list/ui/JobRequestList.tsx';
import { useGetPageOfJobRequests } from '@/shared/hooks';

const JobRequestScroll: React.FC = () => {
  const { data, fetchNextPage, isFetching } = useGetPageOfJobRequests({ page: 1, pageCount: 10 });

  if (!data) {
    return (
      <div className="flex items-center justify-center">
        <Loader size={200} />
      </div>
    );
  }
  const hasNextPage = data.pages[data.pages.length - 1].data.hasNextPage;

  return (
    <div className={'flex flex-col'}>
      <div className={'border-b p-4 sm:p-8'}>h</div>
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
        {hasNextPage && (
          <div>
            <Loader size={100} />
          </div>
        )}
      </InfiniteScroll>
    </div>
  );
};

export default JobRequestScroll;
