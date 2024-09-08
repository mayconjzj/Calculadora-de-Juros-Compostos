import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from './components/Button';
import { Form } from './components/Form';

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
    years: z.coerce
      .number()
      .min(1, 'O período mínimo de 1 ano!')
      .transform((value) => value * 12),
    interestRate: z.coerce
      .number()
      .min(1, 'Taxa de juros mínima de 1%!')
      .transform((value) => value / 100)
  });

  type CreateInvestmentSchema = z.infer<typeof createInvestmentSchema>;

  const createInvestment = useForm<CreateInvestmentSchema>({
    resolver: zodResolver(createInvestmentSchema)
  });

  const {
    handleSubmit,
    setError,
    formState: { errors }
  } = createInvestment;

  const handleCreateInvestment = ({
    initialValue,
    incrementValue,
    interestRate,
    years: months
  }: CreateInvestmentSchema) => {
    if (!initialValue && !incrementValue) {
      setError('root', {
        type: 'manual',
        message: 'Você deve fornecer pelo menos o valor inicial ou mensal!'
      });

      return;
    }

    let finalyValue = initialValue;
    for (let month = 1; month <= months; month++) {
      finalyValue += incrementValue;
      finalyValue *= Math.pow(1 + interestRate, 1 / 12);
    }

    setValue({
      finalyValue,
      initialValue,
      incrementValue,
      interestRate,
      years: months / 12
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
          <FormProvider {...createInvestment}>
            <form
              onSubmit={handleSubmit(handleCreateInvestment)}
              className="flex-1 space-y-3"
            >
              <Form.Field>
                <Form.Label htmlFor="initialValue">
                  Valor Inicial Aplicado
                </Form.Label>
                <Form.Input
                  type="number"
                  placeholder="0,00"
                  name="initialValue"
                />
                <Form.ErrorMessage field="initialValue" />
              </Form.Field>

              <Form.Field>
                <Form.Label htmlFor="incrementValue">
                  Valor Mensal Aplicado
                </Form.Label>
                <Form.Input
                  type="number"
                  placeholder="0,00"
                  name="incrementValue"
                />
                <Form.ErrorMessage field="incrementValue" />
              </Form.Field>

              <Form.Field>
                <Form.Label htmlFor="interestRate">
                  Taxa de Juros Anual
                </Form.Label>
                <Form.Input
                  type="number"
                  placeholder="0%"
                  name="interestRate"
                />
                <Form.ErrorMessage field="interestRate" />
              </Form.Field>

              <Form.Field>
                <Form.Label htmlFor="years">Tempo em Anos</Form.Label>
                <Form.Input type="number" placeholder="0" name="years" />
                <Form.ErrorMessage field="years" />
              </Form.Field>

              <Button type="submit">Calcular</Button>
              {errors.root && (
                <div className="text-red-500">{errors.root.message}</div>
              )}
            </form>
          </FormProvider>
        </section>

        {value !== undefined && (
          <section className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-gray-200 mt-3">
            <h2>Resultados:</h2>

            <div>
              <h3>Patrimônio Final:</h3>
              <span className="text-green-400 font-semibold">
                {value.finalyValue.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </span>
            </div>

            <div>
              <h3>Outras Informações</h3>
              <ul>
                <li>
                  Valor total Aplicado:{' '}
                  <strong>
                    {value.years * 12 * value.incrementValue +
                      value.initialValue}
                  </strong>
                </li>
                <li>
                  Meses: <strong>{value.years * 12}</strong>
                </li>
                <li>
                  Retorno em Porcentagem:{' '}
                  <strong>
                    {Math.round(
                      (value.finalyValue /
                        (value.years * 12 * value.incrementValue +
                          value.initialValue) -
                        1) *
                        100
                    )}
                    %
                  </strong>
                </li>
              </ul>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
