import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerAddProdutsComponent } from './seller-add-produts.component';

describe('SellerAddProdutsComponent', () => {
  let component: SellerAddProdutsComponent;
  let fixture: ComponentFixture<SellerAddProdutsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellerAddProdutsComponent]
    });
    fixture = TestBed.createComponent(SellerAddProdutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
