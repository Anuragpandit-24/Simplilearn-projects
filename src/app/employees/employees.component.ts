import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees: Array<Employee> = [];
  showAddForm: boolean = false;
  newEmployee: Employee = { id: 0, first_name: '', last_name: '', email: '' };

  constructor(public es: EmployeeService, public router: Router) {} // DI

  ngOnInit(): void {
    this.loadEmployee();
  }

  loadEmployee(): void {
    this.es.findAllEmployee().subscribe({
      next: (data: any) => this.employees = data,
      error: (error: any) => console.log(error),
      complete: () => console.log("All Employee loaded...")
    });
  }

  viewDetails(id: any): void {
    sessionStorage.setItem("eid", id);
    this.router.navigate(["employeeview"]);
  }

  // New method to show the form for adding a new employee
  showAddEmployeeForm(): void {
    this.showAddForm = true;
  }

  // New method to handle adding a new employee
  addEmployee(): void {
    this.es.storeEmployee(this.newEmployee).subscribe({
      next: (data: Employee) => {
        console.log('Employee added successfully:', data);
        this.loadEmployee(); // Refresh the employee list after adding a new one
        this.showAddForm = false; // Hide the form after adding
        this.newEmployee = { id: 0, first_name: '', last_name: '', email: '' }; // Clear the form fields
      },
      error: (error) => {
        console.error('Error adding employee:', error);
        // Handle error as needed
      }
    });
  }
}
