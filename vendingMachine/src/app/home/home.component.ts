import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Injector } from '@angular/core';
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // class variables
  cents: string = '';
  pennys: string = '';
  nickles: string = '';
  quarters: string = '';
  dimes: string = '';

  cokeQuantityAvailable: number = 5;
  pepsiQuantityAvailable: number = 15;
  sodaQuantityAvailable: number = 3;
  cokeCost: number = 25;
  pepsiCost: number = 36;
  sodaCost: number = 45;
  ordetTotalCost: number = 0;

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

  constructor(private injector: Injector) {}

  ngOnInit(): void {}

  getDrinks() {}
  getCokeQuantityAvailable() {
    document.getElementsByClassName('coke-quantity');
  }
  getPepsiQuantityAvailable() {}
  getSodaQuantityAvailable() {}

  getCokeOrder() {}
  getPepsiOrder() {}
  getSodaOrder() {}

  getCents() {}
  getPennys() {}
  getNickles() {}
  getQuarters() {}
  calculateOrderTotal() {}
}
