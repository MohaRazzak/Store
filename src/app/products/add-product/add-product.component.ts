import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  updatedProduct:any;
  editMode = false;

  constructor(
    private productServices :ProductsService,
    private toastr: ToastrService,
    private router:Router,
    private authServices :AuthService,
    private translocoService : TranslocoService
    ) {
      if(this.router.getCurrentNavigation()?.extras?.state?.product != null){
        this.editMode = true;
        this.updatedProduct = this.router.getCurrentNavigation()?.extras?.state?.product;
        console.log("this.updatedProduct" , this.updatedProduct);
        this.addProductForm.setValue(
          {
            title :      this.updatedProduct.title,
            price :      this.updatedProduct.price,
            description : this.updatedProduct.description,
            category : this.updatedProduct.category,
            image :     this.updatedProduct.image,
         })
      }

     }

  ngOnInit(): void {
    this.authServices.checkUserRole();

  }

  addProductForm = new UntypedFormGroup({
    title: new UntypedFormControl('', Validators.required),
    price: new UntypedFormControl('', Validators.required),
    description: new UntypedFormControl('', Validators.required),
    category: new UntypedFormControl('', Validators.required), 
    image: new UntypedFormControl('', Validators.required),
  });

  onSubmit(){
    const message = this.translocoService.translate('PRODUCTDONE');
    if(!this.editMode){
      this.productServices.addProduct(this.addProductForm.value).subscribe((res : any) =>{
        this.toastr.success(message, '');
        this.router.navigate(['/products']);
      })
    }else{
      this.productServices.editProduct(this.updatedProduct.id ,this.addProductForm.value).subscribe((res : any) =>{
        this.toastr.success(message, '');
        this.router.navigate(['/products']);
      })
    }
    
    this.addProductForm.reset();
  }



}
