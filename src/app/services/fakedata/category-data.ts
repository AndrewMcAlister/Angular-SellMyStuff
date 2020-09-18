import { Category } from '../../interfaces/category';

export class CategoryData {
    static categories: Category[] =
        [
            new Category("5FDE9193-D55D-4571-A3A0-E916A807F299", "Categories", null, [],
                [
                    new Category("27589082-F166-4937-91B7-CCBB12CB37D1", "Cars", "5FDE9193-D55D-4571-A3A0-E916A807F299",[], []),
                    new Category("F74F30C5-ED75-4B42-B1B1-B3A585EBB5B2", "Entertainment", "5FDE9193-D55D-4571-A3A0-E916A807F299", [], [
                        new Category("30C22A7F-026E-475C-BA4A-4C1FD2B9329B", "HiFi", "F74F30C5-ED75-4B42-B1B1-B3A585EBB5B2", [], [
                            new Category("CFBC01DC-DE8D-42BE-A26B-2757387D89D4", "Amplifiers", "30C22A7F-026E-475C-BA4A-4C1FD2B9329B", [], []),
                            new Category("CFBC01DC-DE8D-42BE-A26B-275738HL89D4", "Speakers", "30C22A7F-026E-475C-BA4A-4C1FD2B9329B", [], [])
                        ]),
                    ]),
                    new Category("142AC1EA-230D-4472-B3DB-03220C619017", "Computers", "5FDE9193-D55D-4571-A3A0-E916A807F299", [], []),
                    new Category("229DD65D-72F6-4656-8934-C35825E0E37C", "Other", "5FDE9193-D55D-4571-A3A0-E916A807F299", [], [])
                ])
        ]
}
