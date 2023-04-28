import { Component, Input, OnChanges } from '@angular/core';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent implements OnChanges {
  @Input() modalOpen: boolean = false;
  @Input() username: any;

  ngOnChanges() {
    if (this.modalOpen) {
      const myModal = new bootstrap.Modal('#myModal');
      myModal.show();
    }
  }
}
