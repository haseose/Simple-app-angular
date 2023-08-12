export class Order{
  customerName : string | null;
  customerEmail : string | null;
  lineItems : Array<LineItem>;
  constructor(
    customerName : string,
    customerEmail : string,
    lineItems : Array<LineItem>
  )
  {
    this.customerEmail = customerEmail,
    this.customerName = customerName,
    this.lineItems = lineItems
  }
}

export class LineItem{
  productId: string;
  quantity: number;
  constructor(
    productId :string,
    quantity :number
  )
  {
    this.productId = productId,
    this.quantity = quantity
  }
}
