import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AnimalsImagesData } from '../models/animal-image.model';
import { Image } from '../models/image.model';

const SERVICE_URL = environment.SERVICE_URL;

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  constructor(private http: HttpClient) {}

  getAnimalsImagesData() {
    return this.http.get<AnimalsImagesData>(SERVICE_URL);
  }

  async getAllAnimalImage(imagesData: Image[]) {
    const observables = imagesData.map((element: Image) =>
      this.http.get(element.url, {
        responseType: 'blob',
      })
    );

    return forkJoin(observables);
  }
}
