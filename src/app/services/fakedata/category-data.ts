import { Category } from '../../components/category/category';
import { Guid } from 'guid-typescript';

export class CategoryData {
    static categories: Category[] = [
        {
            id: Guid.parse("5FDE9193-D55D-4571-A3A0-E916A807F299"),
            name: "Categories",
            childCategories: [
                {
                    id: Guid.parse("27589082-F166-4937-91B7-CCBB12CB37D1"),
                    name: "Cars",
                    parentId: Guid.parse("5FDE9193-D55D-4571-A3A0-E916A807F299")
                },
                {
                    id: Guid.parse("F74F30C5-ED75-4B42-B1B1-B3A585EBB5B2"),
                    name: "Entertainment",
                    parentId: Guid.parse("5FDE9193-D55D-4571-A3A0-E916A807F299"),
                    childCategories: [
                        {
                            id: Guid.parse("30C22A7F-026E-475C-BA4A-4C1FD2B9329B"),
                            name: "HiFi",
                            parentId: Guid.parse("F74F30C5-ED75-4B42-B1B1-B3A585EBB5B2")
                        }
                    ]
                },
                {
                    id: Guid.parse("142AC1EA-230D-4472-B3DB-03220C619017"),
                    name: "Computers",
                    parentId: Guid.parse("5FDE9193-D55D-4571-A3A0-E916A807F299")
                },
                {
                    id: Guid.parse("229DD65D-72F6-4656-8934-C35825E0E37C"),
                    name: "Other",
                    parentId: Guid.parse("5FDE9193-D55D-4571-A3A0-E916A807F299")
                }
            ]
        }
    ]
}
