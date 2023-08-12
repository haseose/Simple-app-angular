export class Product
{
  productId : string;
  name : string;
  description : string;
  unitPrice : number;
  currency : string;
  exceedQuantity : boolean;
  maximumQuantity? : number;
  constructor(
    productId : string,
    name : string,
    description : string,
    unitPrice : number,
    currency : string,
    exceedQuantity : boolean,
    maximumQuantity? : number,
  )
  {
    this.description = description;
    this.productId = productId;
    this.name = name;
    this.unitPrice = unitPrice;
    this.maximumQuantity = maximumQuantity;
    this.currency = currency;
    this.exceedQuantity = exceedQuantity;
  }
}
