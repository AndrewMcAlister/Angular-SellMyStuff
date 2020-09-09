import { SaleItem } from '../../components/saleitem/saleitem';
import { Guid } from 'guid-typescript';

export class SaleItemData {
    static saleitems: SaleItem[]= [
        {
            id: Guid.parse("34e3fce7-c1cd-4b1d-8fe2-20e5d860bd39"),
            title:"Class A HiFi Amplifier",
            description:"Its a Darred DV845 mono amp (pair)",
            price:4995,
            categoryId: Guid.parse("30C22A7F-026E-475C-BA4A-4C1FD2B9329B"),
            category: null,
            imageUrls: ["/assets/2E1D5C17-1C94-49E3-803F-E0EC87BEFDA3-Amp.jpg"],
            tags: ["class a", "hifi"],
            userId: Guid.parse("88B0C338-4176-4B26-8D1F-813271275B64"),
            created: new Date(2020, 9, 3),
            quantity: 1
        },
        {
            id: Guid.parse("275a819f-6855-42fc-b9bb-a8c4fae89fa9"),
            title: "A Great Scanner!",
            description:"A golden oldie!, 600dpi",
            price: 23.55,
            categoryId: Guid.parse("142AC1EA-230D-4472-B3DB-03220C619017"),
            category: null,
            imageUrls: ["/assets/BE39FB92-AB30-42E3-855B-E0166611A169-scanner.jpg","/assets/01B03617-A844-45E8-B935-116368EDB874-scanner.jpg"],
            tags: ["scanner","toshiba"],
            userId: Guid.parse("88B0C338-4176-4B26-8D1F-813271275B64"),
            created: new Date(2020, 9, 3),
            topImageIndex: 1,
            quantity: 3
        },
        {
            id: Guid.parse("b74d290c-4f8d-4344-832b-c260cee5274f"),
            title: "A colour laser printer",
            description:"1200 dpi brother",
            price: 432,
            categoryId: Guid.parse("142AC1EA-230D-4472-B3DB-03220C619017"),
            category: null,
            imageUrls: ["/assets/C6039930-2723-423C-BFF0-900B5038799A-printer.jpg"],
            tags: ["brother","printer"],
            userId: Guid.parse("88B0C338-4176-4B26-8D1F-813271275B64"),
            created: new Date(2020, 9, 3),
            topImageIndex: 1,
            quantity: 2
        },
        {
            id: Guid.parse("dd6dd582-c83f-4da4-995e-d559e86974c0"),
            title: "A classic Humber Hawk",
            description:"Fully restored!  45 gallons per mile!",
            price: 20432,
            categoryId: Guid.parse("27589082-F166-4937-91B7-CCBB12CB37D1"),
            category: null,
            imageUrls: ["/assets/D707AFB6-03B7-40A8-B982-C1C878F924E1-Humber Hawk.jpg"],
            tags: ["car","humber"],
            userId: Guid.parse("88B0C338-4176-4B26-8D1F-813271275B64"),
            created: new Date(2020, 9, 3),
            topImageIndex: 1,
            quantity: 1
        }        
    ]
}