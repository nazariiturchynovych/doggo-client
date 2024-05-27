import React, { useState } from 'react';
import { Button, Loader } from '@/shared/ui';
import { useGetPageOfJobRequests } from '@/shared/hooks';
import InfiniteScroll from '@/shared/ui/infinite-scroll';
import JobRequestList from '@/widgets/job-request/job-request-list/ui/JobRequestList.tsx';
import { Link } from 'react-router-dom';
import { JobRequestScrollSkeleton } from '@/widgets/job-request/job-request-scroll/ui/JobRequestScrollSkeleton.tsx';
import { JobRequestFilter } from '@/widgets/job-request/job-request-scroll/ui/JobRequestFilter.tsx';

const JobRequestScroll: React.FC = () => {
  const [filterValue, setFilterValue] = useState({
    sortColumn: '',
    sortOrder: '',
  });

  const {
    data: jobRequestsPageData,
    fetchNextPage,
    isLoading,
  } = useGetPageOfJobRequests({
    page: 1,
    pageCount: 10,
    nameSearchTerm: '',
    sortOrder: filterValue.sortOrder,
    sortColumn: filterValue.sortColumn,
  });

  if (!jobRequestsPageData || !jobRequestsPageData?.pages || isLoading) {
    return <JobRequestScrollSkeleton />;
  }

  const pages = jobRequestsPageData.pages;
  const hasMore = pages[jobRequestsPageData.pages.length - 1].data.hasNextPage;

  return (
    <div className={'flex flex-1 flex-col'}>
      <div className={'flex justify-between border-b p-4 sm:p-8'}>
        <Link to={'/add-job-request'}>
          <Button>Add request</Button>
        </Link>
        <JobRequestFilter setFilterValue={setFilterValue} filterValue={filterValue} />
      </div>
      {pages.map((page, index) => (
        <React.Fragment key={`page-${index}`}>
          <JobRequestList jobRequests={page.data.entities} />
        </React.Fragment>
      ))}
      <InfiniteScroll hasMore={hasMore} isLoading={isLoading} next={fetchNextPage} threshold={1}>
        {hasMore ? (
          <div className={'flex h-full w-full items-center justify-center'}>
            <Loader size={100} />
          </div>
        ) : (
          <div className={'text-center'}>That's all</div>
        )}
      </InfiniteScroll>
    </div>
  );
};

export default JobRequestScroll;
