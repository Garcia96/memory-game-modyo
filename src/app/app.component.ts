import { Component, OnInit } from '@angular/core';
import { ImagesService } from './services/images.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  modalOpen: boolean = false;
  title = 'memory-game-modyo';
  username: string = '';
  imagesData = [];

  constructor(private _imagesService: ImagesService) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('MEMORYGAME') ?? '';
    if (this.username) {
      this.getAnimalsImagesData();
    }
  }

  onSetUsername(event: string): void {
    this.username = event;
    this.getAnimalsImagesData();
  }

  getAnimalsImagesData() {
    this._imagesService.getAnimalsImagesData().subscribe((res: any) => {
      if (res) {
        this.imagesData = res.entries.map((data: any) => data.fields.image);
      }
    });
  }

  modalOpenEvent() {
    this.modalOpen = true;
  }
}
