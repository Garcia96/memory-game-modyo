import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { ImagesService } from './services/images.service';
import { AnimalsImagesData } from './models/animal-image.model';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let imagesServiceSpy: jasmine.SpyObj<ImagesService>;

  const mockData: AnimalsImagesData = {
    entries: [
      {
        fields: {
          image: {
            url: 'test',
            tags: [],
            uuid: '1awdasd',
            title: 'image',
            alt_text: null,
            description: 'test',
            content_type: '',
          },
        },
      },
    ],
    meta: {
      total_entries: 1,
      per_page: 1,
      current_page: 1,
      total_pages: 1,
    },
  };

  beforeEach(async () => {
    imagesServiceSpy = jasmine.createSpyObj('ImagesService', [
      'getAnimalsImagesData',
    ]);

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [{ provide: ImagesService, useValue: imagesServiceSpy }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    imagesServiceSpy = TestBed.inject(
      ImagesService
    ) as jasmine.SpyObj<ImagesService>;
    imagesServiceSpy.getAnimalsImagesData.and.returnValue(of(mockData));
    fixture.detectChanges(); // ngOnInit
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'memory-game-modyo'`, () => {
    expect(component.title).toEqual('memory-game-modyo');
  });

  it('should username set on onSetUsername', () => {
    component.onSetUsername('test');
    fixture.detectChanges();
    expect(component.username).toBe('test');
  });

  it('should set to true opeModal on modalOpenEvent', () => {
    component.modalOpenEvent();
    fixture.detectChanges();
    expect(component.modalOpen).toBeTrue();
  });

  it('should get a list of imagesData from service', () => {
    component.getAnimalsImagesData();
    fixture.detectChanges();
    expect(component.imagesData.length).toBeGreaterThanOrEqual(1);
  });
});
