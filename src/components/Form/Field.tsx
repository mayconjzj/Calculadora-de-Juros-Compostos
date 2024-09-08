import { HTMLAttributes, forwardRef } from 'react';

export type FieldProps = HTMLAttributes<HTMLDivElement>;

export const Field = forwardRef<HTMLDivElement, FieldProps>(
  ({ children, ...props }, ref) => {
    return (
      <div ref={ref} className="flex flex-col gap-y-1" {...props}>
        {children}
      </div>
    );
  }
);
Field.displayName = 'FIeld';
