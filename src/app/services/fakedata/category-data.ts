import { Category } from '../../interfaces/category';
import { Guid } from 'guid-typescript';

export class CategoryData {
    static categories: Category[] = [
        {
            id: "5FDE9193-D55D-4571-A3A0-E916A807F299",
            name: "Categories",
            categories: [
                {
                    id: "27589082-F166-4937-91B7-CCBB12CB37D1",
                    name: "Cars",
                    parentId: "5FDE9193-D55D-4571-A3A0-E916A807F299",
                    categories: []
                },
                {
                    id: "F74F30C5-ED75-4B42-B1B1-B3A585EBB5B2",
                    name: "Entertainment",
                    parentId: "5FDE9193-D55D-4571-A3A0-E916A807F299",
                    categories: [
                        {
                            id: "30C22A7F-026E-475C-BA4A-4C1FD2B9329B",
                            name: "HiFi",
                            parentId: "F74F30C5-ED75-4B42-B1B1-B3A585EBB5B2",
                            categories: [
                                {
                                    id: "CFBC01DC-DE8D-42BE-A26B-2757387D89D4",
                                    name: "Amplifiers",
                                    parentId: "30C22A7F-026E-475C-BA4A-4C1FD2B9329B",
                                    categories: []
                                }
                            ]
                        }
                    ]
                },
                {
                    id: "142AC1EA-230D-4472-B3DB-03220C619017",
                    name: "Computers",
                    parentId: "5FDE9193-D55D-4571-A3A0-E916A807F299",
                    categories: []
                },
                {
                    id: "229DD65D-72F6-4656-8934-C35825E0E37C",
                    name: "Other",
                    parentId: "5FDE9193-D55D-4571-A3A0-E916A807F299",
                    categories: []
                }
            ]
        }
    ]
}
