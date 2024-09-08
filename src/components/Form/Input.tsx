import { InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
};

export const Input = ({ name, ...props }: InputProps) => {
  const { register } = useFormContext();

  return (
    <input
      id={name}
      className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition"
      {...register(name)}
      {...props}
    />
  );
};
