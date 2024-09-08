import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from './components/ui/Button';
import { Input } from './components/ui/Input';

export const App = () => {
  const [value, setValue] = useState<
    CreateInvestmentSchema & { finalyValue: number }
  >();

  const createInvestmentSchema = z.object({
    initialValue: z.coerce
      .number()
      .nonnegative('O valor inicial deve ser positivo!'),
    incrementValue: z.coerce
      .number()
      .nonnegative('O valor incremental deve ser positivo!'),
    years: z.coerce.number().min(1, 'O período mínimo de 1 ano!'),
    interestRate: z.coerce
      .number()
      .min(1, 'Taxa de juros mínima de 1%!')
      .transform((value) => value / 100)
  });

  type CreateInvestmentSchema = z.infer<typeof createInvestmentSchema>;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<CreateInvestmentSchema>({
    resolver: zodResolver(createInvestmentSchema)
  });

  const handleCreateInvestment = ({
    initialValue,
    incrementValue,
    interestRate,
    years
  }: CreateInvestmentSchema) => {
    if (!initialValue && !incrementValue) {
      setError('root', {
        type: 'manual',
        message: 'Você deve fornecer pelo menos o valor inicial ou mensal!'
      });

      return;
    }

    let finalyValue = initialValue;
    for (let year = 1; year <= years; year++) {
      for (let month = 1; month <= 12; month++) {
        finalyValue += incrementValue;
        finalyValue *= Math.pow(1 + interestRate, 1 / 12);
      }
    }

    setValue({
      finalyValue,
      initialValue,
      incrementValue,
      interestRate,
      years
    });
  };

  return (
    <div>
      <div className="prose prose-invert mx-auto p-6">
        <section>
          <h1>Calculadora de Juros Compostos</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo aut
            distinctio provident numquam quo porro molestiae unde earum nulla
            culpa soluta, sequi exercitationem delectus aliquam labore nihil
            odit reiciendis harum?
          </p>
        </section>

        <section>
          <form
            onSubmit={handleSubmit(handleCreateInvestment)}
            className="flex-1 space-y-3"
          >
            <div className="flex flex-col gap-y-1">
              <label htmlFor="initialValue">Valor Inicial Aplicado</label>
              <Input
                type="number"
                placeholder="0,00"
                {...register('initialValue')}
              />
              {errors.initialValue && (
                <span className="text-red-500">
                  {errors.initialValue?.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-y-1">
              <label htmlFor="incrementValue">Valor Mensal Aplicado</label>
              <Input
                type="number"
                placeholder="0,00"
                {...register('incrementValue')}
              />
              {errors.incrementValue && (
                <span className="text-red-500">
                  {errors.incrementValue?.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-y-1">
              <label htmlFor="interestRate">Taxa de Juros Anual</label>
              <Input
                type="number"
                placeholder="0%"
                {...register('interestRate')}
              />
              {errors.interestRate && (
                <span className="text-red-500">
                  {errors.interestRate?.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-y-1">
              <label htmlFor="years">Tempo em Anos</label>
              <Input type="number" placeholder="0" {...register('years')} />
              {errors.years && (
                <span className="text-red-500">{errors.years?.message}</span>
              )}
            </div>

            <Button type="submit">Calcular</Button>
            {errors.root && (
              <div className="text-red-500">{errors.root.message}</div>
            )}
          </form>
        </section>

        {value !== undefined && (
          <section className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-gray-200 mt-3">
            <h2 className="my-6">Resultados:</h2>
            <span>
              {value.finalyValue.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })}
            </span>
          </section>
        )}
      </div>
    </div>
  );
};
