import { cn } from '@/util';
import React from 'react';

interface Props {
  className?: string;
  isLoading?: boolean
}

export const LionfishLoadding = ({
  className,
  isLoading
}: Props) => {

  if (!isLoading) {
    return null
  }

  return (
    <div className={cn(
      'loader',
      className
    )}>
      <div className="l" />
      <div className="l" />
      <div className="l" />
      <div className="l" />
      <div className="l" />
      <div className="l" />
      <div className="l" />
      <div className="l" />
      <div className="l" />
    </div>
  );
}


