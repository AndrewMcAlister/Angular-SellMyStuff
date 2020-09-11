import { InMemoryDbService } from 'angular-in-memory-web-api';
import { SaleItem } from '../interfaces/saleitem';
import { Category } from '../interfaces/category';
import { User } from '../interfaces/user';
import { SaleItemData } from './fakedata/saleitem-data';
import { CategoryData } from './fakedata/category-data';
import { UserData } from './fakedata/user-data';

export class AppDataService implements InMemoryDbService {

  createDb(): { saleitems: SaleItem[], categories: Category[], users: User[]} {
    const saleitems = SaleItemData.saleitems;
    const categories = CategoryData.categories;
    const users = UserData.users;
    return { saleitems, categories, users };
  }
}
