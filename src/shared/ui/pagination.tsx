import React from 'react';
import { cn } from '@/shared/lib/utils.ts';

type PaginationProps = {
  pagesCount: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  pagesCount,
  setCurrentPage,
}) => {
  const onClickPrevious = () => {
    setCurrentPage(currentPage - 1);
  };
  const onClickNext = () => {
    setCurrentPage(currentPage + 1);
  };
  const onClickPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <nav role="navigation" aria-label="pagination" className="mx-auto mt-2 flex w-full sm:p-2">
      <ul className="flex flex-row items-center gap-1">
        <li className="">
          <button
            disabled={currentPage == 1}
            type={'button'}
            onClick={onClickPrevious}
            className={cn(
              'inline-flex h-10 items-center justify-center gap-1 whitespace-nowrap rounded-md px-4 py-2 pl-2.5 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
            )}
            aria-label="Go to previous page">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-left h-4 w-4">
              <path d="m15 18-6-6 6-6"></path>
            </svg>
            <span>Previous</span>
          </button>
        </li>
        {currentPage != 1 && (
          <li className="">
            <button
              type="button"
              onClick={() => onClickPage(currentPage - 1)}
              aria-current="page"
              className="inline-flex h-10 w-10 items-center justify-center whitespace-nowrap rounded-md border-input bg-background text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
              {currentPage - 1}
            </button>
          </li>
        )}
        <li className="">
          <button
            type="button"
            onClick={() => onClickPage(currentPage)}
            aria-current="page"
            className="inline-flex h-10 w-10 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
            {currentPage}
          </button>
        </li>
        {currentPage != pagesCount && (
          <li className="">
            <button
              type="button"
              onClick={() => onClickPage(currentPage + 1)}
              aria-current="page"
              className="inline-flex h-10 w-10 items-center justify-center whitespace-nowrap rounded-md border-input bg-background text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
              {currentPage + 1}
            </button>
          </li>
        )}
        {/*{currentPage != pagesCount && <MorePages />}*/}
        <li className="">
          <button
            type={'button'}
            onClick={onClickNext}
            disabled={currentPage == pagesCount}
            className="inline-flex h-10 items-center justify-center gap-1 whitespace-nowrap rounded-md py-2 pr-2.5 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 sm:px-4"
            aria-label="Go to next page">
            <span>Next</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-right h-4 w-4">
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
};

// const MorePages: React.FC = () => {
//   return (
//     <li className="">
//       <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="24"
//           height="24"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           className="lucide lucide-more-horizontal h-4 w-4">
//           <circle cx="12" cy="12" r="1"></circle>
//           <circle cx="19" cy="12" r="1"></circle>
//           <circle cx="5" cy="12" r="1"></circle>
//         </svg>
//         <span className="sr-only">More pages</span>
//       </span>
//     </li>
//   );
// };
