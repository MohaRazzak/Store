import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  constructor(
    private productsServices :ProductsService ,
    private authServices : AuthService,
    private router :Router
    ) { }
  products:any;
  allCategories:any;
  loading = false;

  ngOnInit(): void {
    this.getProductMethod();
    this.authServices.checkAdminRole();
    this.getAllCategories();
  }

  categories= [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  getProductMethod(){
    this.productsServices.getProducts().subscribe((res : any) => {
      this.products = res;
      console.log(this.products);
    })
  }
  onSelect(e :any){
    this.products = null;
    this.loading = true;
    this.getInCategory(e);
  }

  getAllCategories(){
    this.productsServices.getAllCategories().subscribe((res : any) => {
      this.allCategories = res;
      console.log(this.allCategories);
    })
  }

  getInCategory(catName :any){
    this.productsServices.getInCategory(catName).subscribe((res : any) => {
      this.products = res;
      this.loading =false
    })
  }

}
