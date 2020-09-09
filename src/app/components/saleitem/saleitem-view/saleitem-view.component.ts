import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-saleitem-view',
  templateUrl: './saleitem-view.component.html',
  styleUrls: ['./saleitem-view.component.css']
})
export class SaleitemViewComponent implements OnInit {

  searchText: string;

  constructor() { }

  ngOnInit(): void {
  }

}
