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
    return this.httpClient.get(`https://fakestoreapi.com/products?limit=10`)
  }
  public getProductDetails(ProductId :any){
    return this.httpClient.get(`https://fakestoreapi.com/products/${ProductId}`)
  }
  
  public addProduct(data :any){
    return this.httpClient.post(`https://fakestoreapi.com/products` , data)
  }

}
