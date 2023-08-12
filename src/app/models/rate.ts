export class Rate
{
  sourceCurrency : string;
  targetCurrency : string;
  rate  : number;
  constructor(
    sourceCurrency : string,
    targetCurrency : string,
    rate  : number
  )
  {
    this.rate = rate;
    this.sourceCurrency = sourceCurrency;
    this.targetCurrency = targetCurrency;
  }
}
