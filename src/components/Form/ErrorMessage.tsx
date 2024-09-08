import { HTMLAttributes, forwardRef } from 'react';
import { useFormContext } from 'react-hook-form';

export type ErrorMessageProps = HTMLAttributes<HTMLDivElement> & {
  field: string;
};

const get = (obj: Record<any, any>, path: string) => {
  const travel = (regexp: RegExp) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce(
        (res, key) => (res !== null && res !== undefined ? res[key] : res),
        obj
      );

  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);

  return result;
};

export const ErrorMessage = forwardRef<HTMLDivElement, ErrorMessageProps>(
  ({ field, ...props }, ref) => {
    const {
      formState: { errors }
    } = useFormContext();

    const fieldError = get(errors, field);

    if (!fieldError) {
      return null;
    }

    return (
      <span ref={ref} {...props}>
        {fieldError.message?.toString()}
      </span>
    );
  }
);
ErrorMessage.displayName = 'ErrorMessage';
