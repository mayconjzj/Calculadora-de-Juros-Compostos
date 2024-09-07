export type CreateInvestmentProps = {
  initialValue: number;
  incrementValue: number;
  years: number;
  interestRate: number;
};

export interface ICreateInvestmentService {
  execute({
    initialValue,
    incrementValue,
    years,
    interestRate
  }: CreateInvestmentProps): CreateInvestmentProps & { finalyValue: number };
}
