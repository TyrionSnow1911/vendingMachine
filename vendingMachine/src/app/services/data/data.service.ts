import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private cokeQuantitySource = new BehaviorSubject<number>(0);
  currentCokeQuantity = this.cokeQuantitySource.asObservable();

  private pepsiQuantitySource = new BehaviorSubject<number>(0);
  currentPepsiQuantity = this.pepsiQuantitySource.asObservable();

  private sodaQuantitySource = new BehaviorSubject<number>(0);
  currentSodaQuantity = this.sodaQuantitySource.asObservable();

  private orderTotalSource = new BehaviorSubject<number>(0);
  currentOrderTotal = this.orderTotalSource.asObservable();

  private dialogStateSource = new BehaviorSubject<boolean>(false);
  currentDialogState = this.dialogStateSource.asObservable();

  constructor() {
    //pass
  }

  changeDialogState(dialogState: boolean) {
    this.dialogStateSource.next(dialogState);
  }

  getDialogState() {
    return this.currentDialogState;
  }

  changeCokeQuanity(quantity: number) {
    this.cokeQuantitySource.next(quantity);
  }

  getCokeQuantity() {
    return this.currentCokeQuantity;
  }

  changePepsiQuanity(quantity: number) {
    this.pepsiQuantitySource.next(quantity);
  }

  getPepsiQuantity() {
    return this.currentPepsiQuantity;
  }

  changeSodaQuanity(quantity: number) {
    this.sodaQuantitySource.next(quantity);
  }

  getSodaQuantity() {
    return this.currentSodaQuantity;
  }

  changeTotalCost(cost: number) {
    this.orderTotalSource.next(cost);
  }

  getOrderTotal() {
    return this.currentOrderTotal;
  }
}
