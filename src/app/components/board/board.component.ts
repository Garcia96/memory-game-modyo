import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ImagesService } from 'src/app/services/images.service';
import * as bootstrap from 'bootstrap';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnChanges {
  @Input() imagesData: any;
  username = '';
  animalsImageData: any = [];
  selected: number[] = [];

  success = 0;
  errors = 0;

  constructor(
    private _imagesService: ImagesService,
    private _localStorageService: LocalstorageService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.username = this._localStorageService.getUser('MEMORYGAME');
  }

  ngOnChanges(): void {
    if (Object.keys(this.imagesData).length !== 0) {
      this.getAnimalImage(this.imagesData);
    }
  }

  async getAnimalImage(imagesData: any) {
    (await this._imagesService.getAllAnimalImage(imagesData)).subscribe(
      (res: any) => {
        res.forEach((element: Blob | MediaSource, id: number) => {
          this.animalsImageData.push({
            url: this.sanitizer.bypassSecurityTrustUrl(
              window.URL.createObjectURL(element)
            ),
          });
        });
        this.completeImages();
      }
    );
  }

  onSelectCard(id: number) {
    let card = document.getElementById('card-' + id);

    if (card!.style.transform != 'rotateY(180deg)') {
      card!.style.transform = 'rotateY(180deg)';
      this.selected.push(id);
    }

    if (this.selected.length === 2) {
      this.deselectCards(this.selected);
      this.selected = [];
    }
  }

  deselectCards(selected: number[]) {
    setTimeout(() => {
      const card1 = document.getElementById('card-' + selected[0]);
      const card2 = document.getElementById('card-' + selected[1]);
      if (card1!.innerHTML !== card2!.innerHTML) {
        card1!.style.transform = 'rotateY(0deg)';
        card2!.style.transform = 'rotateY(0deg)';
        this.errors++;
      } else {
        this.success++;
        if (this.success === 1) {
          this.onGameOver();
        }
      }
    }, 1000);
  }

  onGameOver() {
    const myModal = new bootstrap.Modal('#myModal');
    myModal.show();
  }

  onNewGame() {
    this.animalsImageData.forEach((element: any) => {
      document.getElementById('card-' + element.id)!.style.transform =
        'rotateY(0deg)';
    });
    this.animalsImageData.sort(() => Math.random() - 0.5);
    this.selected = [];
    this.success = 0;
    this.errors = 0;
  }

  completeImages() {
    const duplicatedImages = this.animalsImageData.slice(0);
    this.animalsImageData = this.animalsImageData.concat(duplicatedImages);

    this.animalsImageData = this.animalsImageData.map(
      (element: any, id: number) => ({
        id: id + 1,
        url: element.url,
      })
    );
    this.animalsImageData.sort(() => Math.random() - 0.5);
  }
}
