import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ImagesService } from './images.service';
import { environment } from '../../environments/environment';
import { AnimalsImagesData } from '../models/animal-image.model';
import { Image } from '../models/image.model';

describe('ImagesService', () => {
  let service: ImagesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ImagesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('test for getAnimalsImagesData', () => {
    it('should return a imagesDataObject', (doneFn) => {
      const mock: AnimalsImagesData = {
        entries: [],
        meta: {
          current_page: 1,
          per_page: 2,
          total_entries: 1,
          total_pages: 1,
        },
      };
      service.getAnimalsImagesData().subscribe((data) => {
        expect(data).toEqual(mock);
        doneFn();
      });

      const req = httpTestingController.expectOne(`${environment.SERVICE_URL}`);
      req.flush(mock);
      httpTestingController.verify();
    });
  });

  describe('test for getAllAnimalImage', () => {
    it('should return BlobImage array', async () => {
      const param: Image[] = [
        {
          alt_text: null,
          content_type: 'image/jpeg',
          description: null,
          tags: [],
          title: 'Bear',
          url: 'test',
          uuid: '4a1b66ba',
        },
      ];
      const mock: Blob[] = [new Blob()];

      const res = await service.getAllAnimalImage(param);
      res.subscribe((data) => {
        expect(data).toEqual(mock);
      });
    });
  });
});
