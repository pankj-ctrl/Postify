const express = require("express");
const app =express();
const port=8080;
const path=require("path");
const methodOverride=require('method-override');
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))


const { v4: uuidv4 } = require('uuid');





app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

// For post data i am creting an array
let post=[
    {
        id:uuidv4(),
        username:"Pankaj",
        content:"I love coding"
    },
    {
        id:uuidv4(),
        username:"shradha",
        content:"I love web devlopment"
    },
    {
        id:uuidv4(),
        username:"Pankaj_ss",
        content:"This is my life"
    }
]

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{post});
})

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs")
})

app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    let id=uuidv4();
    post.push({id,username,content});
    res.redirect("/posts");
})

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let posts= post.find((p)=>id===p.id)
    
    res.render("show.ejs",{posts});
})

app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let foundPost = post.find((p)=> id === p.id);

    if(foundPost){
        foundPost.content = newContent;
        console.log(foundPost);
    }
    
    res.redirect("/posts"); 
})

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let posts= post.find((p)=>id===p.id);
    res.render("edit.ejs",{posts})
})

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    post= post.filter((p)=>id!==p.id);
    res.redirect("/posts"); 
   
})
app.listen(port,()=>{
    console.log(`${port} port is starting`)
})