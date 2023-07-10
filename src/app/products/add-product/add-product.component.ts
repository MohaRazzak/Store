import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  constructor(
    private productServices :ProductsService,
    private toastr: ToastrService,
    private router:Router
    ) { }

  ngOnInit(): void {
  }

  addProductForm = new FormGroup({
    title: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required)   
  });

  onSubmit(){
    console.log(this.addProductForm.value);
    this.productServices.addProduct(this.addProductForm.value).subscribe((res : any) =>{
      console.log(res);
      this.toastr.success('Product Added Successfully', '');
      this.router.navigate(['/products']);
    })
    this.addProductForm.reset();
  }



}
