const express = require('express');
const router = express.Router();

router.get('/', (req, res, next)=>{

    var msg = "何か書いてちょんまげ。プリーズ";
    if(req.session.message != undefined){
        msg = "Last Message: " + req.session.message;
    }

    var data = {
        title : 'Hello!',
        content : msg
    };

    res.render('hello', data)
});

router.post('/post', (req, res, next)=>{
    var msg = req.body['message'];
    req.session.message = msg;

    var data = {
        title : 'Hello!',
        content : 'ゆーは、「' + msg + '」と送信したでよ'
    }

    res.render('hello', data);
});

module.exports = router;