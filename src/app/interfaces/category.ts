export interface Category {
    id: string;
    name: string;
    parentId?: string,
    categories?: Category[]
  }
  