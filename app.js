let express= require("express");
let bodyParser= require("body-parser");
let db= require("./src/config/db/db.js");
let cookieParser = require("cookie-parser"); // JWT ke liye cookies read karne ke liye
const cors = require("cors");

//let router= require("./routes/route.js");
let router= require("./src/routes/route.js")
let routerr= require("./src/routes/categoriesroutes.js");
let prodrouter= require("./src/routes/productrout.js");
let supplyrouter= require("./src/routes/supplierrout.js");
let prouter= require("./src/routes/purchaseRoutes.js");
let salesrouter = require("./src/routes/salesrouter");

let session= require("express-session");
let path=require("path");
require("dotenv").config();


let app=express();

app.use(cors({ origin: "http://localhost:5173" }));

app.use(session({
    secret : "Anjali",
    resave:false,
    saveUninitialized: true

}))

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({extended:true}));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});


app.use(cookieParser());
//app.use(express.json());
app.use("/",router);
app.use("/", routerr);
// app.use("/",prodrouter);
app.use("/",supplyrouter);
app.use("/",prouter);
app.use("/products", prodrouter);
app.use("/api/sales", salesrouter);



app.set("view engine", "ejs");


module.exports=app;