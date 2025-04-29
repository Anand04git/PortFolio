const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ejs = require("ejs");
const path = require("path");
const method_Override = require("method-override");
const ejsMate = require("ejs-mate");

const Mongo_URL = "mongodb://127.0.0.1:27017/portfolio";

async function main() {
    await mongoose.connect(Mongo_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));
app.use(method_Override("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));

main().then(()=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log(err);
});

app.get("/", (req, res)=>{
   res.render("home.ejs");
});

app.get("/home", (req,res)=>{
    res.render("home.ejs");
});

app.get("/about", (req, res)=>{
    res.render("about.ejs");
});

app.get("/projects", (req, res)=>{
    res.render("project.ejs");
});

app.get("/contact", (req, res)=>{
    res.render("contact.ejs");
});

app.get("/pending", (req, res, next)=>{
    res.render("pending.ejs");
    next();
});

app.listen(8080, ()=>{
    console.log("server is listening on port 8080");
});