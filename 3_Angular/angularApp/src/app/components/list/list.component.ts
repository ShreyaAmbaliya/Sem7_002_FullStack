import { Component, OnInit } from '@angular/core';


import{EmployeeService} from '../../shared/employee.service';
import{Employee} from '../../employee';
import{Router} from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  private employees:Employee[];
  constructor(private _employeeService:EmployeeService,private router:Router) { }

  ngOnInit() {
    this.readEmployees();
  }
  readEmployees(){
    this._employeeService.readEmployees().subscribe(
      data=>{
        console.log(data);
        this.employees=data['msg'];
      },
      error=>{
        console.log(error);
      }
    )
  }
  
  sortEmployees(){
    this._employeeService.sortEmployees().subscribe(
      data=>{
        console.log(data);
        this.employees=data['msg'];
      },
      error=>{
        console.log(error);
      }
    )
  }
  doUpdate(employee){
    this._employeeService.setter(employee);
    this.router.navigate(['/createUpdate']);
  }
  doDelete(employee){
    this._employeeService.deleteEmployee(employee._id).subscribe(
      data=>{
        this.employees.splice(this.employees.indexOf(employee),1);
      }
    )
  }
}
