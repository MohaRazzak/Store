import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  constructor(
    private productServices :ProductsService,
    private route : ActivatedRoute
    ) { }
  productDetails: any;
  productId :any;

  ngOnInit(): void {
    this.productId = this.route.snapshot.params.id;
    this.getProductMethod();
  }


  getProductMethod(){
    this.productServices.getProductDetails(this.productId).subscribe((res : any) => {
      this.productDetails = res;
      console.log(this.productDetails);
    })
  }

}
