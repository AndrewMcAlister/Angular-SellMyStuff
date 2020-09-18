export class Category {
    id: string;
    name: string;
    parentId?: string;
    includedCategoryIds?: string[];
    categories?: Category[];
  
    constructor(id: string, name: string, parentId?: string,includedCategoryIds?: string[], categories?: Category[]) {
      this.id=id;
      this.name=name;
      this.parentId=parentId;
      this.includedCategoryIds=includedCategoryIds;
      this.categories=categories;
    }
  }
  