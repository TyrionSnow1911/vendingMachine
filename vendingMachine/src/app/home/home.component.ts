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
      this.dimesQuantity += this.dimes;
    }
    if (this.pennys > 0) {
      totalCoins += 1 * this.pennys;
      this.pennysQuantity += this.pennys;
    }
    if (this.nickles > 0) {
      totalCoins += 5 * this.nickles;
      this.nicklesQuantity += this.nickles;
    }
    if (this.quarters > 0) {
      totalCoins += 25 * this.quarters;
      this.quartersQuantity += this.quarters;
    }

    if (totalCoins <= 0) {
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

    this.dataService.changeCokeOrderQuantity(this.cokeQuantityOrdered);
    this.dataService.changePepsiOrderQuantity(this.pepsiQuantityOrdered);
    this.dataService.changeSodaOrderQuantity(this.sodaQuantityOrdered);

    // check if at least one drink is ordered
    let totalDrinksOrdered =
      this.cokeQuantityOrdered +
      this.pepsiQuantityOrdered +
      this.sodaQuantityOrdered;

    if (totalDrinksOrdered <= 0) {
      this.sendAlert('Please order at least 1 drink.');
      return;
    }

    // make sure that we have enough drinks to make the purchase
    if (this.cokeQuantityOrdered > this.cokeQuantityAvailable) {
      this.sendAlert(
        'Coke, Drink is sold out, your purchase cannot be processed'
      );
      return;
    }

    if (this.pepsiQuantityOrdered > this.pepsiQuantityAvailable) {
      this.sendAlert(
        'Pepsi, Drink is sold out, your purchase cannot be processed'
      );
      return;
    }
    if (this.sodaQuantityOrdered > this.sodaQuantityAvailable) {
      this.sendAlert(
        'Soda, Drink is sold out, your purchase cannot be processed'
      );
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

    // check if we can make change
    let totalAvailableChange = 0;
    totalAvailableChange += this.quartersQuantity * 25;
    totalAvailableChange += this.pennysQuantity * 1;
    totalAvailableChange += this.nickles * 5;
    totalAvailableChange += this.dimes * 10;

    if (totalAvailableChange < change) {
      this.sendAlert('Not sufficient change in the inventory');
      return;
    } else {
      this.sendAlert(
        `Returning ${this.cokeQuantityOrdered} Cokes, ${this.pepsiQuantityOrdered} Pepsis, and ${this.sodaQuantityOrdered} Sodas. Remaining change is: ${change} Cents.`
      );
    }

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

    // check if we are out of drinks, disable get drinks button if we dont.
    let totalDrinksRemaining =
      this.cokeQuantityAvailable +
      this.pepsiQuantityAvailable +
      this.sodaQuantityAvailable;
    if (totalDrinksRemaining == 0) {
      //@ts-ignore
      document.getElementById('get-drinks').disabled = true;
      this.sendAlert('No drinks left in inventory. Sold out.');
    }
  }
}
