import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { SaleItem } from 'src/app/interfaces/saleitem';
import { SaleItemService } from 'src/app/services/saleitem.service';

@Component({
  selector: 'app-saleitem-detail',
  templateUrl: './saleitem-detail.component.html',
  styleUrls: ['./saleitem-detail.component.css']
})
export class SaleitemDetailComponent implements OnInit {

  currentItem: SaleItem
  imageWidth = 400;
  imageMargin = 2;
  thumbNailWidth = 50;
  thumbNailMargin = 2;
  currentImageUrl : string;

  constructor(private sis: SaleItemService, private router: Router, private route: ActivatedRoute) { 
    console.log('detail constructor');
  }

  ngOnInit(): void {
    const itemId = this.route.snapshot.paramMap.get('id');
    if (itemId) {
      this.currentItem = this.sis.getSaleItem(itemId);
      // {
      //   id: "34e3fce7-c1cd-4b1d-8fe2-20e5d860bd39",
      //   title: "Class A HiFi Amplifier",
      //   description: "Its a Darred DV845 mono amp (pair)",
      //   price: 4995,
      //   categoryId: "30C22A7F-026E-475C-BA4A-4C1FD2B9329B",
      //   category: null,
      //   imageUrls: ["../assets/2E1D5C17-1C94-49E3-803F-E0EC87BEFDA3-Amp.jpg"],
      //   tags: ["class a", "hifi"],
      //   userId: "88B0C338-4176-4B26-8D1F-813271275B64",
      //   created: new Date(2020, 9, 3),
      //   quantity: 1
      // };      
      if (this.currentItem) {
        this.currentImageUrl = this.currentItem.imageUrls[0];
        console.log('currentImageURL is ' + this.currentItem.imageUrls[0]);
      }
    }
    else
      this.currentImageUrl = null;
  }

  onBack(): void {
    this.router.navigate(['/forsale']);
  }

  thumbnail_click(event: any) {
    console.log('next Image URL is ' + event.target.value);
    this.currentImageUrl = '../'+event.target.value;
  }
}
