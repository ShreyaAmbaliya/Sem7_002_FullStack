import { Injectable } from '@angular/core';

import{HttpClient,HttpHeaders} from '@angular/common/http';
import {Employee} from '../employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employee:Employee;
  private baseUri:string="http://localhost:3200";
  private headers=new HttpHeaders().set('Content-Type','application/json');

  constructor(private http:HttpClient) { }
  createEmployee(employee:Employee){
    return this.http.post(this.baseUri+'/create',employee,{headers:this.headers});
  }
  updateEmployee(employee:Employee){
    return this.http.put(this.baseUri+'/update',employee,{headers:this.headers});
  }
  readEmployees(){
    return this.http.get(this.baseUri+'/read',{headers:this.headers});
  }
  
  sortEmployees(){
    return this.http.get(this.baseUri+'/sort',{headers:this.headers});
  }
  deleteEmployee(id:string){
    return this.http.delete(this.baseUri+'/delete/'+id,{headers:this.headers});
  }
  setter(employee:Employee){
    this.employee=employee;
  }
  getter(){
    return this.employee;
  }
}
