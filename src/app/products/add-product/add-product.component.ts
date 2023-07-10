import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
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

  addProductForm = new UntypedFormGroup({
    title: new UntypedFormControl('', Validators.required),
    price: new UntypedFormControl('', Validators.required),
    description: new UntypedFormControl('', Validators.required),
    image: new UntypedFormControl('', Validators.required),
    category: new UntypedFormControl('', Validators.required)   
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
