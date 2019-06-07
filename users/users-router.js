const router = require('express').Router();

const Users = require('./users-model.js');
const restricted = require('../auth/restricted-middleware.js');

//can pass in particular roles or collection of roles
//can limit each endpoint to particular role
//check for the right roles
router.get('/', restricted, checkRole('student'), (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
      // res.json({users, decodedToken: req.decodedToken}); this will send back decoded token object
    })
    .catch(err => res.send(err));
});

//MW has access to return
//can place something on req object-- evertyhing comes after MW has acceses to something
//we placed on request

function checkRole(role) {
  return function (req, res, next){
    //where is roles going to be stored?
    //access tokens are supposed to be trusted, dont need to search elsewhere
//includes is method can call on array
//&& operators allows you to check presence of each 
//roles normally would be on table
    if(req.decodedToken && 
      req.decodedToken.roles && 
      req.decodedToken.roles.includes(role)
     ){
     next();
  } else {
      res.status(403).json({message: "can't touch this!"});
  }
};
}

//const scopes = 'student:read;student:write;student:delete;salary:read'
module.exports = router;
