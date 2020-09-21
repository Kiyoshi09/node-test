var express = require('express');
var router = express.Router();
const db = require('../models/index');
const {Op} = require('sequelize');

/* GET users listing.
router.get('/', function(req, res, next) {
  db.User.findAll().then(users => {
    var data = {
      title : 'Users/Index',
      content : users
    }
    res.render('users/index', data);
  })
});
*/

router.get('/', (req, res, next)=>{
  //const id = req.query.id;
  const nm = req.query.name;
  const ml = req.query.mail;

  db.User.findAll({
   // where:{
   //   id : {[Op.lte]:id}
   // }
   //where:{
   //  name : {[Op.like] : '%'+ nm +'%'}
   //}
   //where:{
   //  [Op.or] : [
   //     {name : {[Op.like] : '%' + nm + '%'}},
   //     {mail : {[Op.like] : '%' + ml + '%'}}
   //  ]
  // }
  }).then(users => {
    var data = {
      title : 'Users/Index',
      content : users
    }
    res.render('users/index', data);
  })
})

router.get('/add', (req, res, next)=>{
  var data = {
    title : 'Users/Add',
    form: new db.User(),
    err : null
  }
  res.render('users/add', data);
})

router.post('/add', (req, res, next)=>{
  const form = {
    name : req.body.name,
    pass : req.body.pass,
    mail : req.body.mail,
    age : req.body.age
  }

  db.sequelize.sync().then(() => db.User.create(form)
  .then(user=>{
    res.redirect('/users');
  })
  .catch(err=>{
    var data = {
      title : 'Users/Add',
      form  : form,
      err : err
    }
    res.render('users/add', data);
  }))
})


module.exports = router;
