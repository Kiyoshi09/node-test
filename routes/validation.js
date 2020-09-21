var express = require('express');
var router = express.Router();
const {check, validationResult} = require('express-validator');

router.get('/', (req, res, next)=>{
    var data = {
        title : 'Hello Add',
        content : '新しいレコードを入力 : ',
        form : {name : '', mail : '', age: 0}
    }
    res.render('validation', data);
});

router.post('/', [
    check('name', 'NMAE は必須').notEmpty(),
    check('mail', 'メールも必須').isEmail(),
    check('age', 'Age は年齢').isInt()
], (req, res, next)=>{
    const error = validationResult(req);

    if(!error.isEmpty()){
        var result = '<ul class="text-danger">';
        var result_arr = error.array();
        for(var n in result_arr){
            result += '<li>'+ result_arr[n].msg +'</li>';
        }
        result += '</ul>';
        var data = {
            title : 'Validation !',
            content : result,
            form : req.body
        }

        res.render('validation', data);
    } else {
        var nm = req.body.name;
        var ml = req.body.mail;
        var ag = req.body.age;


        var data = {
            title : 'Validation Success',
            content : 'Ok',
            form : {name : nm, mail : ml, age : ag}
        }

        res.render('validation', data);
    }
})


module.exports = router;