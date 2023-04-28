import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';

const SERVICE_URL = environment.SERVICE_URL;

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  constructor(private http: HttpClient) {}

  getAnimalsImagesData() {
    return this.http.get(SERVICE_URL);
  }

  async getAllAnimalImage(imagesData: any) {
    const observables = imagesData.map((element: any) =>
      this.http.get(element.url, {
        responseType: 'blob',
      })
    );

    return forkJoin(observables);
  }
}
