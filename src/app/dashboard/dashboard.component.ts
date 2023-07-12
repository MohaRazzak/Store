import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth/services/auth.service';
import { ProductsService } from '../products/services/products.service';


@Component({
  selector: 'dashboard-page',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class dashboardComponent implements OnInit {
  products : any;
  displayedColumns :any;
  dataSource : any;
  loading = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;



  constructor(
    private authServices : AuthService,
    private productServices : ProductsService,
    private toastr: ToastrService,
    private router:Router,
    private translocoService: TranslocoService
    ) { }
  

  getProductMethod(){
    this.productServices.getProducts().subscribe((res : any) => {
      this.products = res; 
      this.loading = false;     
      this.dataSource = new MatTableDataSource(this.products);
      setTimeout(() => this.dataSource.paginator = this.paginator);

    })
  }

  deleteProduct(e:any){
    const message = this.translocoService.translate('DELETEDSSUCCESS');
    this.productServices.deleteProduct(e.id).subscribe((res : any) =>{
      this.toastr.success(message, '');
    })
  }

  addProduct(){
    this.router.navigate(['/products/add'])
  }
  
  editProduct(e:any){
    this.router.navigate(['/products/add' ], { state: { product: e }} )
  }

  ngOnInit(): void {
    this.loading = true;
    this.getProductMethod();
    this.authServices.checkUserRole();
    this.displayedColumns = ['id','image', 'title', 'price', 'category' , 'actions'];
  }
}
