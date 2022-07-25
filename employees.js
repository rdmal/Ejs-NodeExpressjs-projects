var express = require('express');
var router = express.Router();

let employees = [
  {'id': 1, 'fname': 'Amy', 'lname': 'Corse','department': 'Sales Dept'},
  {'id': 2, 'fname': 'Bob', 'lname': 'smith','department': 'HR Dept'},
  {'id': 3, 'fname': 'Karen', 'lname': 'Grace','department': 'IT Dept'},
  {'id': 4, 'fname': 'Lilly', 'lname': 'White','department': 'Delivery Services'},
  {'id': 5, 'fname': 'Chris', 'lname': 'Gill', 'department': 'Customer Service'}
]

queryEmployees = (request, response) => {
    console.log('employees='+ JSON.stringify(employees));
    response.render('employees', {'employees': employees});
  }
  
  queryEmployee =(request, response) => {
    const{id} = request.params;
    let employee = employees.find(employee => employee.id == id)
    console.log('employee='+ JSON.stringify(employee));
    response.render('employee', {'employee': employee});
  }
  deleteEmployee = (request, response) => {
    const {id} = request.params;
    employees = employees.filter( employee => employee.id != id)
    console.log(JSON.stringify(employees));
    response.render('employees', { employees : employees });
  }
  updateEmployeeForm = (request, response) => {
    console.log("updateEmployee called");
  
    const {id} = request.params;
    const {fname} = request.params;
    const {lname} = request.params;
    const {department} = request.params;
    let employee = { 'id': id, 'fname': fname, 'lname': lname, 'department': department}
    console.log("id=" + id, ",fname=" +fname + ",lname=" + lname,", department=" + department);
    response.render('updateEmployee', {'employee':employee});
  
  }
  updateEmployee = (request, response) => {
    console.log("updateEmployee called");
    let updateEmployee = request.body;
    const {id} = request.params;
    console.log("id=" + id, ",fname=" +fname + ",lname=" + lname + ",department=" + department);
  
    let employee = employees.find( employee => employee.id == id)
    employee.fname = updateEmployee.fname
    employee.lname = updateEmployee.lname
    employee.department = updateEmployee.department
    console.log(JSON.stringify(employee));
    response.render('employees', { employees : employees });
  }
  insertEmployee = (request, response) => {
    let employee = request.body;
    employees = [...employees, employee]
    console.log(JSON.stringify(employee));
    response.render('employees', { employees : employees });
  }
  insertEmployeeForm = (request, response) => {
    response.render('InsertEmployee');
  }
  insertUpdateEmployee = (request, response) => {
    let {update} = request.body;
    if (!update) 
      insertEmployee( request, response)
    else
      updateEmployee( request, response)
  }
   
   router.get('/', queryEmployees);
   router.post('/', insertUpdateEmployee);
   router.get('/insertEmployee', insertEmployeeForm);
   router.get('/deleteEmployee/:id', deleteEmployee);
   router.get('/:id', queryEmployees);
  
  module.exports = router;
  