 var express = require('express');
 var router = express.Router();

 let users = [
   {'id': 1, 'fname': 'john', 'lname': 'smith'},
   {'id': 2, 'fname': 'karl', 'lname': 'smith'},
   {'id': 3, 'fname': 'sue', 'lname': 'smith'},
   {'id': 4, 'fname': 'linda', 'lname': 'smith'}
   ]
 /* GET users listing. */
   queryUsers = (request, response) => {
   console.log('users='+ JSON.stringify(users));
   response.render('users', {'users': users});
 }

   queryUser =(request, response) => {
   const{id} = request.params;
   let user = users.find(user => user.id == id)
   console.log('user='+ JSON.stringify(user));
   response.render('user', {user: user});
   }

   insertUser = (request, response) => {
    let user = request.body;
    users =[...users,user]
    console.log(JSON.stringify(user));
    response.render('users', {users: users});
   }

   insertUserForm = (request, response) => {
    response.render('InsertUser');
   }

   deleteUser =(request, response) => {
    const {id} = request.params;
    users = users.filter(user => user.id !=id)
    console.log(JSON.stringify(users));
    response.render('users', { users : users });

   }

   updateUser = (request, response) => {
    const {id} = request.params;
    let updateUser = request.body;
    let user =  users.find( user => user.id == id)
    user.fname = updateUser.fname
    user.lname = updateUser.lname
    console.log(JSON.stringify(user));
    response.render('users', { users : users });
  }
  
  updateUserForm = (request, response) => {
    console.log("updateUser called");
  }
  insertUpdateUser = (request, response)=>{
    response.render('insertupdateUser');
  }
  insertUpdateUser = (request, response) => {
    let {update} = request.body;
    if (!update) 
      insertUser( request, response)
    else
      updateUser( request, response)
  }

  /* GET users listing. */
    router.get('/', queryUsers);
    router.post('/', insertUpdateUser);
    router.get('/insertUser', insertUserForm);
    router.get('/updateUser/:id/:fname/:lname', updateUserForm);
    router.get('/deleteUser/:id', deleteUser);
    router.get('/:id', queryUser);
    router.post('/', insertUser);
    

 /* GET users listing. */
    router.get('/', function(req, res, next) {
    res.render('users', { users: users });

    });

    module.exports = router;
