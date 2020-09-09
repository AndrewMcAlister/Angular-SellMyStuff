import { Guid } from 'guid-typescript';

export interface SaleItem {
    id: Guid;
    title: string;
    description?: string;
    price?: number;
    categoryId?: Guid;
    category: string;
    imageUrls : string[];
    tags : string[];
    userId? : Guid;
    created: Date;
    lastRevised?: Date;
    topImageIndex?: number;
    quantity:number 
  }
  