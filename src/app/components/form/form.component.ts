import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent {
  @Output() username = new EventEmitter<any>();

  name = new FormControl('', [Validators.required]);

  setUsername() {
    localStorage.setItem('MEMORYGAME', this.name.value ?? '');
    this.username.emit(this.name.value);
  }
}
