import { cn } from '@/lib/utils';
import React from 'react';

export default function Clock({className, ...props}: React.ComponentProps<'h1'>) {
  const date = new Date();
  const [dateTime, setDateTime] = React.useState({
    hours: date.getHours(),
    minutes: date.getMinutes(),
  });

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }

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
    <div className="select-none flex flex-col items-center">
      <h1 
      className={cn('text-5xl tracking-tight', className)} 
      {...props}
    >
        {`${dateTime.hours.toString().padStart(2, '0')}:${dateTime.minutes.toString().padStart(2, '0')}`}
      </h1>
      <span className="mt-4 text-xl font-thin capitalize">
        {new Date().toLocaleDateString('pt-BR', dateOptions)}
      </span>
    </div>
  );
}