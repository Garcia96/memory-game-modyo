import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  name = new FormControl('', [Validators.required]);

  constructor(private _localStorageService: LocalstorageService) {}

  ngOnInit(): void {}

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
