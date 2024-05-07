import React from 'react';
import { cn } from '@/shared/lib/utils.ts';

type DividerHorizontalProps = {
  className?: string;
};
export const DividerHorizontal: React.FC<DividerHorizontalProps> = ({ className }) => {
  return <div className={cn('flex h-full border-t', className)} />;
};
