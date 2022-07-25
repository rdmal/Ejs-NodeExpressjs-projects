import express from 'express'
import {dbQueryUsers, dbInsertUser, dbUpdateUser, dbDeleteUser, dbQueryUser} from '../model/dbHelper.js'

const router = express.Router();
let users = []
// const addDefaultUsers = () => {
//     users = [
//         { "id": 1, "fname": "Bruce", "lname": "Banner" },
//         { "id": 2, "fname": "Diana", "lname": "Price" },
//         { "id": 3, "fname": "Clark", "lname": "Kent" },
//         { "id": 4, "fname": "Tony", "lname": "Tony" }
//     ]
// }
// console.log("users.length="+ users.length)
// if (users.length == 0) 
//     addDefaultUsers();
const queryUsers = async (request, response) => {
    users = await dbQueryUsers();
    console.log('queryUsers: users=' + JSON.stringify(users))
    response.send(users);
}
const queryUser = async (request, response) => {
    const { id } = request.params;
    let user = await dbQueryUser(id);
    //let user = users.find(user => user.id == id)
    console.log('queryUser: user=' + JSON.stringify(user) + ", id=" + id);
    response.send(user);
}
const insertUser = async (request, response) => {
    let user = request.body;
    //users = [...users, user]
    let rows = await dbInsertUser(user);
    console.log('insertUser: user=' + JSON.stringify(user))
    response.send({ "rows": rows });
}
const deleteUser = async (request, response) => {
    const { id } = request.params;
    //users = users.filter(user => user.id != id)
    let rows = await dbDeleteUser(id);
    console.log('deleteUser: id=' + id);
    response.send({ "rows": rows });
}

const updateUser = async (request, response) => {
    const { id } = request.params;
    const { fname } = request.body;
    const { lname } = request.body;
    //let user = users.find(user => user.id == id)
    let user = { "id": id, "fname": fname, "lname": lname}
    let rows = await dbUpdateUser(user)
    if (!user) {
        response.send({ "rows": 0 });
        return;
    }
    if (fname) user.fname = fname;
    if (lname) user.lname = lname;
    response.send({ "rows": rows });
}
router.get('/', queryUsers)              // localhost:3000/users/      GET
router.get('/:id', queryUser)            // localhost:3000/users/123   GET
router.post('/', insertUser)             // localhost:3000/users/      POST
router.put('/:id', updateUser)           // localhost:3000/users/123   PUT
router.delete('/:id', deleteUser)        // localhost:3000/users/123   DELETE
export default router