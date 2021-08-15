import { Component, Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalContent } from '../modal-content/modal-content.component';
import { DataService } from '../services/data/data.service';
@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  dialogState: boolean = false;
  cokeQuantityOrdered: number = 0;
  pepsiQuantityOrdered: number = 0;
  sodaQuantityOrdered: number = 0;
  orderTotal: number = 0;

  constructor(
    private modalService: NgbModal,
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
  open() {
    this.dialogState = !this.dialogState;
    this.dataService.changeDialogState(this.dialogState);
    const modalRef = this.modalService.open(ModalContent);
  }
}
