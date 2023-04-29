import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { FormComponent } from './form.component';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    const localStorageServiceSpy = jasmine.createSpyObj('LocalstorageService', [
      'setLocalStorage',
      'getUser',
    ]);

    await TestBed.configureTestingModule({
      declarations: [FormComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set username in localStorage', () => {
    component.name.setValue('test');

    component.setUsername();
    fixture.detectChanges();

    expect(localStorage.getItem('MEMORYGAME')).toBe(component.name.value);
  });

  it('should set empty username in localStorage', () => {
    component.name.setValue(null);

    component.setUsername();
    fixture.detectChanges();

    expect(localStorage.getItem('MEMORYGAME')).toBe('');
  });
});
