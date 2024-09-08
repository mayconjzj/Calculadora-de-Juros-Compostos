import { HTMLAttributes, forwardRef } from 'react';
import {
  FieldError,
  FieldErrors,
  FieldValues,
  useFormContext
} from 'react-hook-form';

export type ErrorMessageProps = HTMLAttributes<HTMLDivElement> & {
  field: string;
};

const get = (obj: FieldErrors<FieldValues>, path: string) => {
  const travel = (regexp: RegExp) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce(
        (res: FieldErrors | FieldError | undefined, key: string) =>
          res !== null && res !== undefined
            ? (res as FieldErrors)[key as keyof FieldErrors]
            : undefined,
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
      <span ref={ref} {...props} className="text-red-500">
        {fieldError.message?.toString()}
      </span>
    );
  }
);
ErrorMessage.displayName = 'ErrorMessage';
