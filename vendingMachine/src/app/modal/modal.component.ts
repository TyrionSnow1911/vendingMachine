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
  open() {
    this.dialogState = !this.dialogState;
    this.dataService.changeDialogState(this.dialogState);

    const modalRef = this.modalService.open(ModalContent);

    // modalRef.componentInstance.cokeQuantityOrdered = this.cokeQuantityOrdered;
    // modalRef.componentInstance.pepsiQuantityOrdered = this.pepsiQuantityOrdered;
    // modalRef.componentInstance.sodaQuantityOrdered = this.sodaQuantityOrdered;
    // modalRef.componentInstance.orderTotal = this.orderTotal;
  }
}
