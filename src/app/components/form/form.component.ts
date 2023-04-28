import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent {
  name = new FormControl('', [Validators.required]);

  constructor(private _localStorageService: LocalstorageService) {}

  setUsername() {
    const data = {
      username: this.name.value,
    };
    this._localStorageService.setLocalStorage(
      'MEMORYGAME',
      JSON.stringify(data)
    );
    this._localStorageService.change(data);
  }
}
