import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { BoardComponent } from './board.component';
import { ImagesService } from 'src/app/services/images.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;
  let imagesService: jasmine.SpyObj<ImagesService>;

  const mockData = [new Blob()];

  beforeEach(async () => {
    const imagesServiceSpy = jasmine.createSpyObj('ImagesService', [
      'getAllAnimalImage',
    ]);
    await TestBed.configureTestingModule({
      declarations: [BoardComponent],
      providers: [{ provide: ImagesService, useValue: imagesServiceSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;

    imagesService = TestBed.inject(
      ImagesService
    ) as jasmine.SpyObj<ImagesService>;

    imagesService.getAllAnimalImage.and.returnValue(
      Promise.resolve(of(mockData))
    );

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get animalsImages when there are imagesData', () => {
    component.imagesData = [
      {
        alt_text: 'test',
        content_type: 'test',
        description: 'test',
        tags: [],
        title: 'Test',
        url: 'Testing.test',
        uuid: 'hgmopizxddnk',
      },
    ];
    component.ngOnChanges();
    fixture.detectChanges();

    expect(imagesService.getAllAnimalImage).toHaveBeenCalledWith(
      component.imagesData
    );
  });

  describe('tests for onSelectCard', () => {
    it('should select card', () => {
      component.animalsImageData = [{ id: 1, url: 'test' }];
      fixture.detectChanges();
      component.onSelectCard(1);
      expect(component.selected.length).toBeGreaterThan(0);
    });

    it('should card selected have a trasform style', () => {
      component.animalsImageData = [{ id: 1, url: 'test' }];
      fixture.detectChanges();

      const cardDebug = fixture.debugElement.query(
        By.css(`#card-${component.animalsImageData[0].id}`)
      );
      cardDebug.triggerEventHandler('click');
      expect(cardDebug.styles['transform']).toBe('rotateY(180deg)');
    });

    it('should selected be empty[] after click on two cards', () => {
      component.animalsImageData = [
        { id: 1, url: 'test' },
        { id: 2, url: 'test' },
      ];
      fixture.detectChanges();
      component.onSelectCard(1);
      component.onSelectCard(2);

      expect(component.selected).toEqual([]);
    });

    it('should success be 1 when two selected cards are equal', fakeAsync(() => {
      component.animalsImageData = [
        { id: 1, url: 'test' },
        { id: 2, url: 'test' },
      ];
      fixture.detectChanges();
      component.onSelectCard(1);
      component.onSelectCard(2);

      tick(1000);
      expect(component.success).toBe(1);
    }));

    it('should errors be 1 when two selected cards are not equal', fakeAsync(() => {
      component.animalsImageData = [
        { id: 1, url: 'test' },
        { id: 2, url: 'testing-url' },
      ];
      fixture.detectChanges();
      component.onSelectCard(1);
      component.onSelectCard(2);

      tick(1000);
      expect(component.errors).toBe(1);
    }));

    it('should modal displays when success = 20', fakeAsync(() => {
      let emmited = false;
      component.success = 19;
      component.animalsImageData = [
        { id: 1, url: 'test' },
        { id: 2, url: 'test' },
      ];
      component.modalOpen.subscribe(() => {
        emmited = true;
      });
      fixture.detectChanges();
      component.compareCards([1, 2]);

      tick(1000);

      expect(emmited).toBeTrue();
    }));
  });

  it('should variables reset when "New board" button is clicked', () => {
    component.animalsImageData = [
      { id: 1, url: 'test' },
      { id: 2, url: 'test' },
    ];
    fixture.detectChanges();
    const buttonDebug = fixture.debugElement.query(By.css('button'));
    buttonDebug.triggerEventHandler('click');
    fixture.detectChanges();

    expect(component.selected).toEqual([]);
    expect(component.success).toEqual(0);
    expect(component.errors).toEqual(0);
  });
});
