import React from 'react';
import { cn } from '@/shared/lib/utils';

type DividerVerticalProps = {
  className?: string;
};
export const DividerVertical: React.FC<DividerVerticalProps> = ({ className }) => {
  return <div className={cn('flex h-full border-l', className)} />;
};
