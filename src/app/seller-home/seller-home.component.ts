import { Component } from '@angular/core';
import { product } from '../data-type';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../services/product.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.scss'],
})
export class SellerHomeComponent {
  productList: undefined | product[];
  productData: undefined | product;
  productMessage: undefined | string;
  faTrashIcon = faTrash;
  faEditIcon=faEdit;
  constructor(private product: ProductService, private router: ActivatedRoute) {}

  ngOnInit(): void {
    this.list();
      let productId = this.router.snapshot.paramMap.get('id');
      console.warn(productId);
      productId &&
        this.product.getProduct(productId).subscribe((data) => {
          console.warn(data);
          this.productData = data;
        });
    
  }

  deleteProduct(id: number) {
    this.product.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.productMessage = 'Product is deleted';

        this.list();
      }
    });

    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
  }



  list() {
    this.product.productList().subscribe((result) => {
      if (result) {
        this.productList = result;
      }
    });
  }


}
