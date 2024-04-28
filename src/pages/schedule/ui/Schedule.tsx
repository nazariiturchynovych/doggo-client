import React from 'react';
import { Calendar, Loader } from '@/shared/ui';
import JobCard from '@/widgets/job/job-card/ui/JobCard.tsx';
import { useUserStore } from '@/entities/user';
import { useGetWalkerJobs } from '@/pages/walker-profile/lib/hooks';

export const Schedule: React.FC = () => {
  const user = useUserStore((state) => state.user);

  const { data } = useGetWalkerJobs({ id: user.walkerId || '' });

  console.log(data);

  if (!data) {
    return <Loader />;
  }
  return (
    <div className="m-5 flex h-full flex-col rounded-xl border bg-white">
      <header className="flex items-center justify-between border-b border-gray-300 px-6 py-4">
        <div>
          <p className=" font-semibold leading-6">January 22, 2022</p>
          <p className="mt-1 text-sm leading-tight text-gray-500">Saturday</p>
        </div>
        <div>
          <div></div>
          <div></div>
        </div>
      </header>
      <div className="isolate flex flex-1 flex-col">
        <div className="border-b p-5 drop-shadow-sm">
          <Calendar />
        </div>
        <div className="flex max-h-[620px] w-full flex-col gap-3 overflow-scroll p-5">
          {data.data.map((job) => (
            <JobCard job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};
