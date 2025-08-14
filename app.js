let express= require("express");
let bodyParser= require("body-parser");
let db= require("./src/config/db/db.js");
let cookieParser = require("cookie-parser"); // JWT ke liye cookies read karne ke liye

//let router= require("./routes/route.js");
let router= require("./src/routes/route.js")
let routerr= require("./src/routes/categoriesroutes.js");
let prodrouter= require("./src/routes/productrout.js");
let supplyrouter= require("./src/routes/supplierrout.js");
let prouter= require("./src/routes/purchaseRoutes.js");

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
app.use(cookieParser());
//app.use(express.json());
app.use("/",router);
app.use("/", routerr);
app.use("/product",prodrouter);
app.use("/",supplyrouter);
app.use("/",prouter);
app.set("view engine", "ejs");

module.exports=app;