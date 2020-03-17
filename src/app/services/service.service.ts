import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CustomerModel } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private url:string = "http://localhost:3000/";
  // private url:string = "https://mongodb-crud-api.herokuapp.com/";

  constructor(public http:HttpClient) { }


  getCustomers(){
    return this.http.get(this.url + 'customer/obtener').toPromise();
  }

  getCustomersFilterId(filter: any){
    return this.http.get(`${this.url}customer/obtener/${filter}`).toPromise();
  }
  getCustomersFilterName(filter: any){
    return this.http.get(`${this.url}customer/obtenerXnombre/${filter}`).toPromise();
  }

  getCustomersFilterCountry(filter: any){
    return this.http.get(`${this.url}customer/obtenerXpais/${filter}`).toPromise();
  }

  deleteCustomer(id: Number){
    return this.http.delete(`${this.url}customer/eliminar/${id}`).toPromise();
  }

  postCustomer(bodyCustomer: any){
    return this.http.post(`${this.url}customer/registrar`,bodyCustomer).toPromise();
  }

  putCustomer(bodyCustomer: any, id: any){
    return this.http.put(`${this.url}customer/actualizar/${id}`,bodyCustomer).toPromise();
  }

}
