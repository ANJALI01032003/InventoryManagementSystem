const immodel = require("../models/immodel.js");
let invmodel= require("../models/immodel.js");
const catmodel = require("../models/categoriesmodel.js");


exports.homepage=(req,res)=>{
    res.render("home.ejs");
    //res.render("D:\NodeProject\InventoryManagementSystem\src\views\home.ejs")
    
}

exports.loginpage=(req,res)=>{
    res.render("login.ejs", {msg:""});
}

exports.registerpage=(req,res)=>{
    res.render("register.ejs", {msg:""});
}

exports.saveReg=(req,res)=>{
    let{name,email,contact,username,password,role}=req.body;
    //console.log(name+"\t"+email+"\t"+contact+"\t"+username+"\t"+password);
    if (!name || !email || !contact || !username || !password || !req.file) {
    return res.render("register.ejs", {
      msg: "Please fill all fields and upload an image."
    });
  }
  let filename = req.file.filename;
    let result=immodel.saveReg(name,email,contact,username,password,req.file.filename,role);
    console.log(req.file.filename);
    result.then((r)=>{
        // console.log(r);
        if(r[0].affectedRows>=1){
            res.render("register.ejs",{msg:"Registration Successful....."});
        }
        else{
            res.render("register.ejs",{msg:"Registration Failed....."});
            //res.send("Registration Failed....");
        }
    }).catch((err)=>{
        console.log(err);
    res.render("register.ejs", { msg: "Something went wrong." });
    })

    // res.send("sucess");

}


exports.getLoginUserProfile=(req,res)=>{
    let loginUserId=req.session.loginUserId;
    //res.send("Login user id is "+loginUserId);
    let result=immodel.getLoginUserProfile(loginUserId);
    result.then((r)=>{
        if(r[0].length>0){
            let userData=r[0][0];
            let loginUserName = userData.name; //imp
            res.render("showprofile.ejs",{u:userData, loginUserName: loginUserName}); //imp
            //res.render("showprofile", { loginUserName }); 
        }
    }).catch((err) => {
        console.log(err);
        res.send("Error fetching profile");
    });
}


exports.validate=(req,res)=>{
    let {username,password}=req.body;
    let result=immodel.validate(username,password);
    result.then((r)=>{
        //console.log(r);
        if(r[0].length>0){
        let userData=r[0];
        req.session.loginUserId=userData[0].uid;
        req.session.loginUsername=userData[0].name;
        req.session.role = userData[0].role;
        console.log(userData.role);
        //res.render("viewprofile.ejs",{loginUserName:userData[0].name})

        if(userData[0].role === 'admin')
        {
            res.render("admindashboard.ejs",  { loginUserName: userData[0].name });
        }
        else{
            res.render("viewprofile.ejs",{loginUserName:userData[0].name})
        }

        }

        else{
             res.render("login.ejs",{msg:"Login Failed..."})
        }
    }).catch((err)=>{
        //console.log(err);
        res.render("login.ejs",{msg:"Login Failed..."})
    })

    //console.log(name+"\t"+pass );
    //res.send(name+ " " +pass);
    // req.session.uname=username;
    // req.session.upass=password;
    // res.send(`Username ${req.session.uname}<br><br> Password ${req.session.upass}`);
    //res.send("Your Session ID is : " +req.sessionID);

}