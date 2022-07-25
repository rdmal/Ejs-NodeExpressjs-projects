
import employeesRoute from './routes/employees.js'

import express from 'express'
import bodyParser from 'body-parser'

const app = express();
const port = 3000;
const home = (request, response) => {
    response.send('home')
}
 
 const employees = (request, response) => {
    response.send('employees')
 }
 app.use( bodyParser.urlencoded({extended:true}));
 app.use( bodyParser.json());
 
app.get('/',home)     //localhost:3000/ -> home
app.use('/employees', employeesRoute)   //localhost:3000/ -> employees


app.listen( port, () => console.log('listening on localhost:3000'))
