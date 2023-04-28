import { Component, OnInit } from '@angular/core';
import { ImagesService } from './services/images.service';
import { LocalstorageService } from './services/localstorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'memory-game-modyo';
  username = '';
  imagesData = [];

  constructor(
    private _imagesService: ImagesService,
    private _localStorageService: LocalstorageService
  ) {}

  ngOnInit(): void {
    this.username = this._localStorageService.getUser('MEMORYGAME');

    this._localStorageService.subjectObservable.subscribe((res: any) => {
      if (Object.keys(res).length !== 0) {
        this.username = res.username;
        this.getAnimalsImagesData();
      }
    });

    if (this.username) {
      this.getAnimalsImagesData();
    }
  }

  getAnimalsImagesData() {
    this._imagesService.getAnimalsImagesData().subscribe((res: any) => {
      if (res) {
        console.log(res);
        this.imagesData = res.entries.map((data: any) => data.fields.image);
      }
    });
  }
}
