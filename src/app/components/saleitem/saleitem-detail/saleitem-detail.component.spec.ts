import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleitemDetailComponent } from './saleitem-detail.component';

describe('SaleitemDetailComponent', () => {
  let component: SaleitemDetailComponent;
  let fixture: ComponentFixture<SaleitemDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleitemDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleitemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
