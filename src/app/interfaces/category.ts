import { Guid } from 'guid-typescript';

export class Category {
    id: Guid;
    idStr: string; //so array of Category can be searched with .find
    name: string;
    parentId?: Guid;
    includedCategoryIds?: Guid[];
    categories?: Category[];
  
    constructor(id: Guid, name: string, parentId?: Guid,includedCategoryIds?: Guid[], categories?: Category[]) {
      this.id=id;
      this.name=name;
      this.parentId=parentId;
      this.includedCategoryIds=includedCategoryIds;
      this.categories=categories;
      this.idStr=id.toString();
    }
  }
  