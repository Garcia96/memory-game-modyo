import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Image } from 'src/app/models/image.model';
import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnChanges {
  @Input() imagesData: Image[] = [];
  @Output() modalOpen = new EventEmitter<void>();
  username = '';
  animalsImageData: any = [];
  selected: number[] = [];

  success = 0;
  errors = 0;

  constructor(
    private _imagesService: ImagesService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('MEMORYGAME') ?? '';
  }

  ngOnChanges(): void {
    if (Object.keys(this.imagesData).length !== 0) {
      this.getAnimalImage(this.imagesData);
    }
  }

  async getAnimalImage(imagesData: Image[]): Promise<void> {
    (await this._imagesService.getAllAnimalImage(imagesData)).subscribe(
      (res: any) => {
        res.forEach((element: Blob | MediaSource) => {
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

  onSelectCard(id: number): void {
    let card = document.getElementById('card-' + id);

    if (card!.style.transform != 'rotateY(180deg)') {
      card!.style.transform = 'rotateY(180deg)';
      this.selected.push(id);
    }

    if (this.selected.length === 2) {
      this.compareCards(this.selected);
      this.selected = [];
    }
  }

  compareCards(selected: number[]): void {
    setTimeout(() => {
      const card1 = document.getElementById('card-' + selected[0]);
      const card2 = document.getElementById('card-' + selected[1]);
      if (card1!.innerHTML !== card2!.innerHTML) {
        card1!.style.transform = 'rotateY(0deg)';
        card2!.style.transform = 'rotateY(0deg)';
        this.errors++;
      } else {
        this.success++;
        if (this.success === 20) {
          this.onGameOver();
        }
      }
    }, 1000);
  }

  onGameOver(): void {
    this.modalOpen.emit();
  }

  onNewGame(): void {
    this.animalsImageData.forEach((element: any) => {
      document.getElementById('card-' + element.id)!.style.transform =
        'rotateY(0deg)';
    });
    this.animalsImageData.sort(() => Math.random() - 0.5);
    this.selected = [];
    this.success = 0;
    this.errors = 0;
  }

  completeImages(): void {
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
