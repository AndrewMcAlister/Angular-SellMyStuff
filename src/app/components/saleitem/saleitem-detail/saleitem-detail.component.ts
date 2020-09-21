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

  currentItem: SaleItem;
  imageWidth = 400;
  imageMargin = 2;
  thumbNailWidth = 50;
  thumbNailMargin = 2;
  currentImageUrl$: Observable<string> | null;  

  constructor(private sis: SaleItemService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const itemId = this.route.snapshot.paramMap.get('id');
    if(itemId) {
      this.currentItem=this.sis.getSaleItem(itemId);
      this.currentImageUrl$=of(this.currentItem.imageUrls[0]);
      console.log('param is ' + itemId);
    }
    else
      this.currentImageUrl$=null;

  }

  onBack(): void {
    this.router.navigate(['/forsale']);
  }

  thumbnail_click(event: any) {
    this.currentImageUrl$=of(event.target.value);
  }

}
