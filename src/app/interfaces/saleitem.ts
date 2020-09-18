export interface SaleItem {
    id: string;
    title: string;
    description?: string;
    price?: number;
    categoryId?: string;
    category: string;
    imageUrls : string[];
    tags : string[];
    userId? : string;
    created: Date;
    lastRevised?: Date;
    topImageIndex?: number;
    quantity:number 
  }
  