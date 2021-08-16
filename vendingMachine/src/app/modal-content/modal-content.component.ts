import { DataService } from './../services/data/data.service';
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.css'],
})
export class ModalContent {
  dialogState: boolean = true;

  cokeQuantityOrdered: number = 0;
  pepsiQuantityOrdered: number = 0;
  sodaQuantityOrdered: number = 0;
  orderTotal: number = 0;

  constructor(
    public activeModal: NgbActiveModal,
    private dataService: DataService
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

  closeDialog() {
    this.activeModal.close('Close click');
    this.dialogState = false;
    this.dataService.changeDialogState(this.dialogState);
    this.dataService.changeTotalCost(0);
  }
}
