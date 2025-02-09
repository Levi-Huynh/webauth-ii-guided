const jwt = require('jsonwebtoken');
const secrets = require('../config/secret.js');

module.exports = (req, res, next) => {
//commonly will find token in req.headers.authorization:
  const token = req.headers.authorization;

  //check token
//has res and next b/c its middleware
  jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
    if(err) {
      //token not valid or expired 
      res.status(401).json({ you: "shall not pass!"})
    } else {
        //the token is valid and we can read the decodedToken
        req.decodedToken = decodedToken
        next();
        //how can get access to users have token has been decoded?
    }
  })
  // if(req.session && req.session.username) { 
  //   next()
  // } else {
  //   res.status(401).json({message: "please login to access this resource"})
  };
  // const { username, password } = req.headers;

  // if (username && password) {
  //   Users.findBy({ username })
  //     .first()
  //     .then(user => {
  //       if (user && bcrypt.compareSync(password, user.password)) {
  //         next();
  //       } else {
  //         res.status(401).json({ message: 'Invalid Credentials' });
  //       }
  //     })
  //     .catch(error => {
  //       res.status(500).json({ message: 'Ran into an unexpected error' });
  //     });
  // } else {
  //   res.status(400).json({ message: 'No credentials provided' });
  // }
// };


//users *----* roles *----* permissions
//users can have set of permissions and roles at same time