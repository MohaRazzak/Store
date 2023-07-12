import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  constructor(
    private productServices :ProductsService,
    private route : ActivatedRoute,
    private authServices :AuthService
    ) { }
  productDetails: any;
  productId :any;

  ngOnInit(): void {
    this.productId = this.route.snapshot.params.id;
    this.getProductMethod();
    this.authServices.checkAdminRole();
  }


  getProductMethod(){
    this.productServices.getProductDetails(this.productId).subscribe((res : any) => {
      this.productDetails = res;
      console.log(this.productDetails);
    })
  }

}
