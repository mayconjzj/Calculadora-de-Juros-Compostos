import { LabelHTMLAttributes, forwardRef } from 'react';

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ children, ...props }, ref) => {
    return (
      <label ref={ref} {...props}>
        {children}
      </label>
    );
  }
);
Label.displayName = 'Label';
