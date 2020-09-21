const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('mydb.sqlite3');

router.get('/', (req, res, next)=>{
    db.serialize(()=>{
        var rows = "";
        db.each("select * from mydata", (err, row)=>{
            if(!err){
                rows += "<tr><th>" + row.id + "</th><td>" + row.Name + "</td></tr>"
            }
        }, (err, count)=>{
            if(!err){
                var data = {
                    title : 'Hello !',
                    content : rows
                };
                res.render('hello/index', data);
            }
        })
    })
})

// add
router.get('/add', (req, res, next)=>{
    var data = {
        title : "Hello/Add",
        content : '新しいレコードを追加'
    }
    res.render('hello/add', data);
})

router.post('/add', (req,res,next)=>{
    const nm = req.body.name;
    const ml = req.body.mail;
    const ag = req.body.age;

    db.serialize(()=>{
        db.run('insert into mydata (Name, mail, age) values (?,?,?)', nm, ml, ag);
    });

    res.redirect('/hello');
});

// show
router.get('/show', (req, res, next)=>{
    const id = req.query.id;
    db.serialize(()=>{
        const q = "select * from mydata where id=?";
        db.get(q, [id], (err, row)=>{
            if(!err){
                var data = {
                    title : 'Hello/show',
                    content : 'id = ' + id + 'のレコード',
                    mydata : row
                }

                res.render('hello/show', data);
            }
        })
    })
})

// edit

/*
router.get('/edit', (req, res, next)=>{
    const id = req.query.id;
    db.serialize(()=>{
        const q = "select * from mydata where id = ?";
        db.get(q, [id], (err, row)=>{
            if(!err){
                var data = {
                    title : 'hello/edit',
                    content : 'id = ' + id + ' のレコードを編集 : ',
                    mydata : row
                }
                res.render('hello/edit', data);
            }
        })
    })
})

router.post('/edit', (req, res, next)=>{
    const id = req.body.id;
    const nm = req.body.name;
    const ml = req.body.mail;
    const ag = req.body.age;
    const q  = "update mydata set Name=?, mail=?, age=? where id = ?";
    db.serialize(()=>{
        db.run(q, nm, ml, ag, id);
    })
    res.redirect('hello/');
})
*/

router.get('/edit', (req, res, next) => {
    const id = req.query.id;
    db.serialize(() => {
        const q = "select * from mydata where id = ?";
        db.get(q, [id], (err, row) => {
            if (!err) {
                var data = {
                title: 'hello/edit',
                content: 'id = ' + id + ' のレコードを編集：',
                mydata: row
            }
            res.render('hello/edit', data);
            }   
        }); 
    }); 
  });
  
  router.post('/edit', (req, res, next) => {
    const id = req.body.id;
    const nm = req.body.name;
    const ml = req.body.mail;
    const ag = req.body.age;
    const q = "update mydata set name = ?, mail = ?, age = ? where id = ?";
    db.serialize(() => {
      db.run(q, nm, ml, ag, id);
    });
    res.redirect('/hello');
  });


  router.get('/delete', (req, res, next)=>{
      const id = req.query.id;
      db.serialize(()=>{
        const q = "select * from mydata where id = ?";
        db.get(q, [id], (err, row) => {
            if (!err) {
                var data = {
                title: 'hello/delete',
                content: 'id = ' + id + ' のレコードを削除：',
                mydata: row
            }
            res.render('hello/delete', data);
            }   
        }); 
      })
  })


  router.post('/delete', (req, res, next) => {
    const id = req.body.id;
    const q = "delete from mydata where id = ?";
    db.serialize(() => {
      db.run(q, id);
    });
    res.redirect('/hello');
  });


module.exports = router;