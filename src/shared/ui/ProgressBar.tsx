import { cn } from '@/shared/style';

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  progressPercentage: number;
}

export function ProgressBar({ progressPercentage, ...props }: ProgressBarProps) {
  return (
    <div
      className={cn(
        'flex-1 bg-gray-200 rounded-[16px]  h-2 overflow-hidden -translate-x-1/2 -translate-y-1/2',
        props.className,
      )}
      {...props}
    >
      <div
        className="h-full bg-blue-500 transition-all duration-300 rounded-full"
        style={{ width: `${progressPercentage}%` }}
      />
    </div>
  );
}
