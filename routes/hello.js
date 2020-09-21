const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('mydb.sqlite3');

router.get('/', (req, res, next)=>{

    db.serialize(() => {
        db.all('select * from mydata',(err, rows) => {
            if(!err){
                var data = {
                    title : 'Hello',
                    content : rows
                }
                res.render('hello', data)
            }
        });
    });
});

/*
router.post('/post', (req, res, next)=>{
    var msg = req.body['message'];
    req.session.message = msg;

    var data = {
        title : 'Hello!',
        content : 'ゆーは、「' + msg + '」と送信したでよ'
    }

    res.render('hello', data);
});
*/

module.exports = router;