import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // order quantities
  private cokeOrderQuantitySource = new BehaviorSubject<number>(0);
  currentCokeOrderQuantity = this.cokeOrderQuantitySource.asObservable();

  private pepsiOrderQuantitySource = new BehaviorSubject<number>(0);
  currentPepsiOrderQuantity = this.pepsiOrderQuantitySource.asObservable();

  private sodaOrderQuantitySource = new BehaviorSubject<number>(0);
  currentSodaOrderQuantity = this.sodaOrderQuantitySource.asObservable();

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

  changeCokeOrderQuantity(quantity: number) {
    this.cokeOrderQuantitySource.next(quantity);
  }

  changePepsiOrderQuantity(quantity: number) {
    this.pepsiOrderQuantitySource.next(quantity);
  }

  changeSodaOrderQuantity(quantity: number) {
    this.sodaOrderQuantitySource.next(quantity);
  }

  changeTotalCost(cost: number) {
    this.orderTotalSource.next(cost);
  }
}
