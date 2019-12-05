import { Component, OnInit } from '@angular/core';

import{EmployeeService} from '../../shared/employee.service';
import{Employee} from '../../employee';
import{Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private employeeService:EmployeeService,private router:Router) { }

  ngOnInit() {
  }

  newEmployee(event:any){
    event.preventDefault();
    this.employeeService.setter(new Employee());
    this.router.navigate(['/createUpdate']);
  }
}
