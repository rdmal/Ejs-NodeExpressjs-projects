import express from 'express'
import {dbQueryemployees, dbInsertemployee, dbUpdateemployee, dbDeleteemployee, dbQueryemployee} from '../model/dbHelper.js'

const router = express.Router();
let employees = []

const queryemployees = async (request, response) => {
    employees = await dbQueryEmployees();
    console.log('queryEmployees: employees=' + JSON.stringify(employees))
    response.send(employees);
}
const queryEmployee = async (request, response) => {
    const { id } = request.params;
    let employee = await dbQueryEmployee(id);
    
    console.log('queryEmployee: employee=' + JSON.stringify(employee) + ", id=" + id);
    response.send(employee);
}
const insertEmployee= async (request, response) => {
    let employee = request.body;
  
    let rows = await dbInsertEmployee(employee);
    console.log('insertEmployee: employee=' + JSON.stringify(employee))
    response.send({ "rows": rows });
}
const deleteEmployee = async (request, response) => {
    const { id } = request.params;
    let rows = await dbDeleteEmployee(id);
    console.log('deleteEmployee: id=' + id);
    response.send({ "rows": rows });
}

const updateEmployee = async (request, response) => {
    const { id } = request.params;
    const { fname } = request.body;
    const { lname } = request.body;
    const { pword } = request.body;
    let employee = { "id": id, "fname": fname, "lname": lname, "pword": pword}
    let rows = await dbUpdateEmployee(employee)
    if (!employee) {
        response.send({ "rows": 0 });
        return;
    }
    if (fname) employee.fname = fname;
    if (lname) employee.lname = lname;
    if (pword) employee.pword = pword;
    response.send({ "rows": rows });
}
router.get('/', queryEmployees)              // localhost:3000/employees/      GET
router.get('/:id', queryEmployee)            // localhost:3000/employees/123   GET
router.post('/', insertEmployee)             // localhost:3000/employees/      POST
router.put('/:id', updateEmployee)           // localhost:3000/employees/123   PUT
router.delete('/:id', deleteEmployee)        // localhost:3000/employees/123   DELETE
export default router