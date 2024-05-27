import { Button, Popover, PopoverContent, PopoverTrigger } from '@/shared/ui';
import { ChevronDown, ChevronsUpDown, ChevronUp } from 'lucide-react';
import React, { FC } from 'react';
import { useQueryClient } from '@tanstack/react-query';

const filterSet = [
  {
    filterValue: {
      sortColumn: 'salary',
      sortOrder: 'ascending',
    },
    element: (
      <>
        Salary <ChevronUp />
      </>
    ),
  },
  {
    filterValue: {
      sortColumn: 'salary',
      sortOrder: 'descending',
    },
    element: (
      <>
        Salary <ChevronDown />
      </>
    ),
  },
];

type FilterValue = {
  sortColumn: string;
  sortOrder: string;
};

interface JobRequestFilterProps {
  setFilterValue: (value: FilterValue) => void;
  filterValue: FilterValue;
}

export const JobRequestFilter: FC<JobRequestFilterProps> = ({ setFilterValue, filterValue }) => {
  const queryClient = useQueryClient();

  const [open, setOpen] = React.useState(false);

  const elementToDisplay = filterSet.find((x) => x.filterValue == filterValue);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button aria-expanded={open} className="w-[200px] justify-between" variant={'outline'}>
          {elementToDisplay?.element ?? (
            <>
              Filter by <ChevronsUpDown />
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        {filterSet.map((x, index) => (
          <div
            key={index}
            onClick={() => {
              setFilterValue(x.filterValue);
              queryClient.removeQueries({ queryKey: ['GetPageOfJobRequest'] });
            }}
            className={'flex justify-between gap-2 p-2'}>
            {x.element}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
};
