let express= require("express");
let bodyParser= require("body-parser");
let db= require("./src/config/db/db.js");

//let router= require("./routes/route.js");
let router= require("./src/routes/route.js")
let routerr= require("./src/routes/categoriesroutes.js");

let session= require("express-session");
let path=require("path");
require("dotenv").config();


let app=express();

app.use(session({
    secret : "Anjali",
    resave:false,
    saveUninitialized: true

}))

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use("/",router);
app.use("/", routerr);
app.set("view engine", "ejs");

module.exports=app;