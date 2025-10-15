import express from "express";
import sql from "mysql2";


const app=express()

app.use(express.json())

const db=sql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"testdb"
});

db.connect(err=>{
    if(err) throw err;
    console.log("connected");
})

app.get('/get',(req,res)=>{
    db.query("SELECT * FROM taskdb",(err,result)=>{
        if(err) throw err;
        else res.send(result)
    })
})

app.post('/post',(req,res)=>{
    const task=req.body.task;
    const id=req.body.id;
    db.query("INSERT INTO taskdb VALUES (?,?)",[id,task],(err,result)=>{
        if (err) throw err;
        else res.send("posted");
    })
})

app.delete('/delete/:id',(req,res)=>{
    const id=parseInt(req.params.id);
    db.query("DELETE FROM taskdb WHERE id=?",[id],(err,result)=>{
        if(err) throw err;
        else res.send("deleted")
    })
})

app.put('/update/:id',(req,res)=>{
    const id=parseInt(req.params.id);
    const task=req.body.task;
    db.query("UPDATE taskdb SET task=? WHERE id=?",[task,id],(err,resa)=>{
        if(err) throw err;
        else res.send("updated");
    })
})

app.listen(8000,()=>{})