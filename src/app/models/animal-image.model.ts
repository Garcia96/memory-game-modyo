import { Entry } from './entries.model';

export interface AnimalsImagesData {
  entries: Entry[];
  meta?: Meta2;
}

export interface Meta2 {
  total_entries: number;
  per_page: number;
  current_page: number;
  total_pages: number;
}
