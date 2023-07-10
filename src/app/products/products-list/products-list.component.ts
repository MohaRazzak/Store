import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  constructor( private productsServices :ProductsService) { }
  products:any;

  ngOnInit(): void {
    this.getProductMethod();
  }

  getProductMethod(){
    this.productsServices.getProducts().subscribe((res : any) => {
      this.products = res;
      console.log(this.products);
    })
  }

}
