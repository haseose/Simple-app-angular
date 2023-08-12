import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LineItem, Order } from 'src/app/models/order';
import { Rate } from 'src/app/models/rate';
import { OrderService } from 'src/app/services/order/order.service';
import { ProductService } from 'src/app/services/product/product.service';
import { RateService } from 'src/app/services/rate/rate.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})

export class OrderComponent implements OnInit {
  loading$ = this.loader.loading$;
  nameFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  products: Array<Product> | undefined;
  fxRates: Array<Rate> | undefined;
  lineOfItems: LineItem[] = [];
  currencies!: string[] | undefined;
  selected!: Rate;
  currentCurrency: string | undefined;
  constructor(
    public loader: LoadingService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private productService: ProductService,
    private orderService: OrderService,
    private rateService: RateService) { }

  ngOnInit() {
    this.getRateList();
    this.getProductList();
    this.getCurrencyList();
  }

  getProductList() {
    this.productService.getProductList().subscribe((data: Array<Product>) => {
      this.products = data;
      this.currentCurrency = this.products[0].currency
    });
  }

  getCurrencyList() {
    this.rateService.getCurrencyList().subscribe((data: any) => {
      this.currencies = data;
    })
  }

  getRateList() {
    this.rateService.getRateList().subscribe((data: Array<Rate>) => {
      this.fxRates = data;
    })
  }

  changeProductPrice(event: any) {
    this.convertProductPrice(this.currentCurrency, event.value);
  }

  addIntoCart(product: any, inputQuantity: number) {
    if (inputQuantity > 0) {
      var lineOfItem: LineItem = {
        productId: product.productId,
        quantity: inputQuantity
      };
      let item = this.lineOfItems.find(x => x.productId === product.productId)
      if (item !== undefined) {
        this.lineOfItems = this.lineOfItems.map(x => (x.productId === lineOfItem.productId) ? lineOfItem : x);
      } else {
        this.lineOfItems?.push(lineOfItem)
      }
    }
    else {
      this.removeLineItem(product.productId);
    }
  }

  validateMaximumQuantity(event: any, product: any) {
    let inputValue = event.target.value;
    if (product.maximumQuantity !== null) {
      if (inputValue > product.maximumQuantity) {
        const dialogRef = this.dialog.open(DialogExceedMessageDialog);
        event.target.value = "";
        this.removeLineItem(product.productId);
        product.exceedQuantity = true;
      }
      else {
        product.exceedQuantity = false;
        this.addIntoCart(product, inputValue);
      }
    }
    else {
      product.orderQuantity = event.target.value;
      this.addIntoCart(product, inputValue);
    }
  }


  private removeLineItem(productId: string) {
    let index = this.lineOfItems.findIndex(x => x.productId === productId);
    if (index > 0) {
      this.lineOfItems?.splice(index, 1);
    }
  }

  private convertProductPrice(current: string | undefined, target: string): void {
    let rate = 0;
    //same currency should be 1 : 1
    if (current === target) {
      rate = 1
    } else {
      rate = this.fxRates?.find(x => x.targetCurrency === target
        && x.sourceCurrency == current)?.rate ?? 0
    }

    this.products?.map(product => {
      product.unitPrice = product.unitPrice * rate
      product.currency = target;
    })
    let availableCurrencies = this.fxRates?.filter(x => x.sourceCurrency == target);
    this.currencies = availableCurrencies?.map(value => value.targetCurrency);
    this.currentCurrency = target
  }

  checkFormStatus(): boolean {
    if (this.nameFormControl.valid && this.emailFormControl.valid) {
      return true;
    }
    else {
      return false;
    }
  }

  submitOrder() {
    let formValid = this.checkFormStatus();
    console.log(formValid);
    if (formValid) {
      const dialogRef = this.dialog.open(DialogConfirmDialog);
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          let email = this.emailFormControl.value;
          var order: Order = {
            customerEmail: this.emailFormControl.value,
            customerName: this.nameFormControl.value,
            lineItems: this.lineOfItems
          }
          this.orderService.submitOrder(order).subscribe(response => {
            this.snackBar.open(response.message, 'ok');
          })
        }
      })
    }
  }
}

//Declare the dialog that will be using in this component
@Component({
  selector: 'dialog-confirm-dialog',
  templateUrl: '../dialog/dialog-confirm.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DialogConfirmDialog {
}

@Component({
  selector: 'dialog-exceed-message-dialog',
  templateUrl: '../dialog/dialog-exceed-message.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DialogExceedMessageDialog { }
