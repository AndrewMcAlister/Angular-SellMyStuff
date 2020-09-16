export interface Category {
    id: string;
    name: string;
    parentId?: string,
    includedCategoryIds?: string[],
    categories?: Category[]
  }
  