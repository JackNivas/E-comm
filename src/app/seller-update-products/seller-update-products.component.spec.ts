import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerUpdateProductsComponent } from './seller-update-products.component';

describe('SellerUpdateProductsComponent', () => {
  let component: SellerUpdateProductsComponent;
  let fixture: ComponentFixture<SellerUpdateProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellerUpdateProductsComponent]
    });
    fixture = TestBed.createComponent(SellerUpdateProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
