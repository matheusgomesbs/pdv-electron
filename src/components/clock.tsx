import { cn } from '@/lib/utils';
import React from 'react';

export default function Clock({className, ...props}: React.ComponentProps<'h1'>) {
  const date = new Date();
  const [dateTime, setDateTime] = React.useState({
    hours: date.getHours(),
    minutes: date.getMinutes(),
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
      setDateTime({
        hours: date.getHours(),
        minutes: date.getMinutes(),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [dateTime]);

  return (
    <h1 
      className={cn('text-5xl tracking-tight', className)} 
      {...props}
    >
     {`${dateTime.hours.toString().padStart(2, '0')}:${dateTime.minutes.toString().padStart(2, '0')}`}
    </h1>
  );
}