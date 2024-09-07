import { CreateInvestmentConfig } from '../interfaces/CreateInvestmentConfig';

export const createInvestmentConfig: CreateInvestmentConfig[] = [
  {
    id: 'initialValue',
    type: 'number',
    label: 'Valor inicial',
    placeholder: 'R$ 0,00'
  },
  {
    id: 'incrementValue',
    type: 'number',
    label: 'Incremento',
    placeholder: 'R$ 0,00'
  },
  {
    id: 'years',
    type: 'number',
    label: 'Anos',
    placeholder: '0'
  },
  {
    id: 'interestRate',
    type: 'number',
    label: 'Taxa de juros',
    placeholder: '0,00%'
  }
];
