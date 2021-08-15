import { DataService } from './../services/data/data.service';
import { ModalComponent } from './../modal/modal.component';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { AlertService } from '../services/alert/alert.service';
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // coin quantities
  dimesQuantity: number = 5;
  pennysQuantity: number = 100;
  quartersQuantity: number = 25;
  nicklesQuantity: number = 10;

  // dialog state
  dialogState: boolean = false;

  // coin inputs
  pennys: number = 0;
  nickles: number = 0;
  quarters: number = 0;
  dimes: number = 0;

  // available quanities
  cokeQuantityAvailable: number = 5;
  pepsiQuantityAvailable: number = 15;
  sodaQuantityAvailable: number = 3;

  // item costs
  cokeCost: number = 25;
  pepsiCost: number = 36;
  sodaCost: number = 45;

  // order total
  orderTotal: number = 0;

  // order quantities
  cokeQuantityOrdered: number = 0;
  pepsiQuantityOrdered: number = 0;
  sodaQuantityOrdered: number = 0;

  // form variables
  dimesForm = new FormGroup({
    dimes: new FormControl(''),
  });
  pennysForm = new FormGroup({
    pennys: new FormControl(''),
  });
  nicklesForm = new FormGroup({
    nickles: new FormControl(''),
  });
  quartersForm = new FormGroup({
    quarters: new FormControl(''),
  });

  cokeQuantityForm = new FormGroup({
    coke: new FormControl(''),
  });
  pepsiQuantityForm = new FormGroup({
    pepsi: new FormControl(''),
  });
  sodaQuantityForm = new FormGroup({
    soda: new FormControl(''),
  });

  alertOptions = {
    autoClose: true,
    keepAfterRouteChange: true,
  };

  constructor(
    private modalDialog: ModalComponent,
    private dataService: DataService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.dataService.currentDialogState.subscribe(
      (dialogState) => (this.dialogState = dialogState)
    );

    this.dataService.currentCokeOrderQuantity.subscribe(
      (cokeQuantityOrdered) => (this.cokeQuantityOrdered = cokeQuantityOrdered)
    );
    this.dataService.currentPepsiOrderQuantity.subscribe(
      (pepsiQuantityOrdered) =>
        (this.pepsiQuantityOrdered = pepsiQuantityOrdered)
    );
    this.dataService.currentSodaOrderQuantity.subscribe(
      (sodaQuantityOrdered) => (this.sodaQuantityOrdered = sodaQuantityOrdered)
    );
    this.dataService.currentOrderTotal.subscribe(
      (orderTotal) => (this.orderTotal = orderTotal)
    );
  }

  sendAlert(message = '') {
    this.alertService.info(message, this.alertOptions);
  }
  getDrinks() {
    let totalCoins = 0;
    // get all inputs for coins
    this.dimes = this.dimesForm.value['dimes'];
    this.pennys = this.pennysForm.value['pennys'];
    this.nickles = this.nicklesForm.value['nickles'];
    this.quarters = this.quartersForm.value['quarters'];
    // validate all inputs for coins
    if (this.dimes > 0) {
      totalCoins += 10 * this.dimes;
    }
    if (this.pennys > 0) {
      totalCoins += 1 * this.pennys;
    }
    if (this.nickles > 0) {
      totalCoins += 5 * this.nickles;
    }
    if (this.quarters > 0) {
      totalCoins += 25 * this.quarters;
    }

    if (totalCoins <= 0) {
      console.log('Insufficient funds to complete order.');
      this.sendAlert('Insufficient funds to complete order.');
      return;
    }

    // get all inputs for drinks
    this.cokeQuantityOrdered = this.cokeQuantityForm.value['coke'];
    this.pepsiQuantityOrdered = this.pepsiQuantityForm.value['pepsi'];
    this.sodaQuantityOrdered = this.sodaQuantityForm.value['soda'];
    if (String(this.cokeQuantityOrdered) == '') {
      this.cokeQuantityOrdered = 0;
    }
    if (String(this.pepsiQuantityOrdered) == '') {
      this.pepsiQuantityOrdered = 0;
    }
    if (String(this.sodaQuantityOrdered) == '') {
      this.sodaQuantityOrdered = 0;
    }

    console.log(this.cokeQuantityOrdered);
    console.log(this.pepsiQuantityOrdered);
    console.log(this.sodaQuantityOrdered);
    this.dataService.changeCokeOrderQuantity(this.cokeQuantityOrdered);
    this.dataService.changePepsiOrderQuantity(this.pepsiQuantityOrdered);
    this.dataService.changeSodaOrderQuantity(this.sodaQuantityOrdered);

    // check if at least one drink is ordered
    let totalDrinksOrdered =
      this.cokeQuantityOrdered +
      this.pepsiQuantityOrdered +
      this.sodaQuantityOrdered;

    if (totalDrinksOrdered <= 0) {
      console.log('Please order at least 1 drink.');
      return;
    }

    // make sure that we have enough drinks to make the purchase
    if (
      this.cokeQuantityOrdered > this.cokeQuantityAvailable ||
      this.pepsiQuantityOrdered > this.pepsiQuantityAvailable ||
      this.sodaQuantityOrdered > this.sodaQuantityAvailable
    ) {
      console.log('Insufficient drinks, unable to complete order.');
      this.sendAlert('Drink is sold out, your purchase cannot be processed”');
      return;
    }

    // calculate remaning drinks
    this.cokeQuantityAvailable -= this.cokeQuantityOrdered;
    this.pepsiQuantityAvailable -= this.pepsiQuantityOrdered;
    this.sodaQuantityAvailable -= this.sodaQuantityOrdered;

    // calculate the remaining change if any
    let change = totalCoins;
    change -= this.cokeQuantityOrdered * this.cokeCost;
    change -= this.pepsiQuantityOrdered * this.pepsiCost;
    change -= this.sodaQuantityOrdered * this.sodaCost;
    console.log('Remaining change is: %s Cents.', String(change));

    // calculate order total
    this.orderTotal =
      this.cokeQuantityOrdered * this.cokeCost +
      this.pepsiQuantityOrdered * this.pepsiCost +
      this.sodaQuantityOrdered * this.sodaCost;

    this.dataService.changeTotalCost(this.orderTotal);

    this.modalDialog.open();

    // clear all form fields
    this.dimesForm.reset();
    this.pennysForm.reset();
    this.nicklesForm.reset();
    this.quartersForm.reset();
    this.cokeQuantityForm.reset();
    this.pepsiQuantityForm.reset();
    this.sodaQuantityForm.reset();
  }
}
