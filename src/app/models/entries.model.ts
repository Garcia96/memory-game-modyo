import { Image } from './image.model';

export interface Entry {
  meta?: Meta;
  fields: Fields;
}

export interface Meta {
  name: string;
  slug: string;
  tags: any[];
  type: string;
  uuid: string;
  space: string;
  author: any;
  locale: string;
  excerpt: string;
  private: boolean;
  targets: any[];
  category: any;
  created_at: string;
  updated_at: string;
  published_at: string;
  version_type: string;
  category_name: any;
  category_slug: any;
  unpublished_at: any;
  available_locales: string[];
}

export interface Fields {
  image: Image;
}
