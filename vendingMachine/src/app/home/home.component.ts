import { DataService } from './../services/data/data.service';
import { ModalComponent } from './../modal/modal.component';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // dialog state
  dialogState: boolean = false;
  // button states
  getDrinksButtonState: boolean = false;

  // class variables
  cents: string = '';
  pennys: string = '';
  nickles: string = '';
  quarters: string = '';
  dimes: string = '';
  email: string = 'test@gmail.com';

  // available quanities
  cokeQuantityAvailable: number = 5;
  pepsiQuantityAvailable: number = 15;
  sodaQuantityAvailable: number = 3;

  // item costs
  cokeCost: number = 25;
  pepsiCost: number = 36;
  sodaCost: number = 45;
  orderTotal: number = 0;

  // order quantities
  cokeQuantityOrdered: number = 0;
  pepsiQuantityOrdered: number = 0;
  sodaQuantityOrdered: number = 0;

  // form variables
  centsForm = new FormGroup({
    cents: new FormControl(''),
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
    cokes: new FormControl(''),
  });
  pepsiQuantityForm = new FormGroup({
    pepsi: new FormControl(''),
  });

  constructor(
    private modalDialog: ModalComponent,
    private dataService: DataService
  ) {
    //this.dataService.changeTotalCost(50); test code, delete after testing
  }

  ngOnInit() {
    this.dataService.currentDialogState.subscribe(
      (dialogState) => (this.dialogState = dialogState)
    );

    this.dataService.currentCokeQuantity.subscribe(
      (cokeQuantityOrdered) => (this.cokeQuantityOrdered = cokeQuantityOrdered)
    );
    this.dataService.currentPepsiQuantity.subscribe(
      (pepsiQuantityOrdered) =>
        (this.pepsiQuantityOrdered = pepsiQuantityOrdered)
    );
    this.dataService.currentSodaQuantity.subscribe(
      (sodaQuantityOrdered) => (this.sodaQuantityOrdered = sodaQuantityOrdered)
    );
    this.dataService.currentOrderTotal.subscribe(
      (orderTotal) => (this.orderTotal = orderTotal)
    );
  }

  calculateRemainingCokeQuantity() {}
  calculateRemainingPepsiQuantity() {}
  calculateRemainingSodaQuantity() {}

  getCokeOrderQuantity() {}
  getPepsiOrderQuantity() {}
  getSodaOrderQuantity() {}

  getCents() {}
  getPennys() {}
  getNickles() {}
  getQuarters() {}
  calculateOrderTotal() {}

  getDrinks() {
    if (this.dialogState == true) {
      return;
    }
    this.modalDialog.open();
  }
}
