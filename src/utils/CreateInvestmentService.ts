import {
  CreateInvestmentProps,
  ICreateInvestmentService
} from '../interfaces/ICreateInvestment';

export class CreateInvestmentService implements ICreateInvestmentService {
  execute({
    initialValue,
    incrementValue,
    years,
    interestRate
  }: CreateInvestmentProps): CreateInvestmentProps & { finalyValue: number } {
    let finalyValue = initialValue;
    for (let year = 1; year <= years; year++) {
      for (let month = 1; month <= 12; month++) {
        finalyValue += incrementValue;
        finalyValue *= Math.pow(1 + interestRate, 1 / 12);
      }
    }

    return {
      finalyValue,
      initialValue,
      incrementValue,
      years,
      interestRate
    };
  }
}
