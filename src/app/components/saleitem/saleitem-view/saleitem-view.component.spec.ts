import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SaleitemViewComponent } from './saleitem-view.component';

describe('SaleitemViewComponent', () => {
  let component: SaleitemViewComponent;
  let fixture: ComponentFixture<SaleitemViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleitemViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleitemViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
