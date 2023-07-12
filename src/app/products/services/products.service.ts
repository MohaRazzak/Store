import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient : HttpClient) { }

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "origin"
  });


  public getProducts(){
    return this.httpClient.get(`https://fakestoreapi.com/products?limit=20`)
  }

  public getAllCategories(){
    return this.httpClient.get(`https://fakestoreapi.com/products/categories`)
  }

  public getInCategory(category:any){
    return this.httpClient.get(`https://fakestoreapi.com/products/category/${category}`)
  }


  public getProductDetails(ProductId :any){
    return this.httpClient.get(`https://fakestoreapi.com/products/${ProductId}`)
  }
  
  public addProduct(data :any){
    return this.httpClient.post(`https://fakestoreapi.com/products` , data)
  }

  public editProduct(id:any ,data :any){
    return this.httpClient.put(`https://fakestoreapi.com/products/${id}` , data)
  }

  public deleteProduct(id:any){
    return this.httpClient.delete(`https://fakestoreapi.com/products/${id}`)
  }

}
