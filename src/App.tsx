import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { CreateInvestmentService } from './utils/CreateInvestmentService';

import { Button } from './components/ui/Button';
import { Input } from './components/ui/Input';
import { createInvestmentConfig } from './config/CreateInvestmentConfig';
import {
  CreateInvestmentSchema,
  createInvestmentSchema
} from './shemas/CreateInvestmentSchemas';

export const App = () => {
  const [value, setValue] = useState<number>();

  const { register, handleSubmit } = useForm<CreateInvestmentSchema>({
    resolver: zodResolver(createInvestmentSchema)
  });

  const handleCreateInvestment = (data: CreateInvestmentSchema) => {
    setValue(new CreateInvestmentService().execute(data).finalyValue);
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
            {createInvestmentConfig.map(({ id, label, placeholder, type }) => (
              <div className="flex flex-col" key={id}>
                <label htmlFor={id}>{label}</label>
                <Input
                  type={type}
                  placeholder={placeholder}
                  {...register(`${id}`)}
                  required
                />
              </div>
            ))}

            <Button type="submit">Calcular</Button>
          </form>
        </section>

        {value !== undefined && (
          <section className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-gray-200 mt-3">
            <h2 className="my-6">Resultados:</h2>
            <span>
              {value.toLocaleString('pt-BR', {
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
