// const immodel = require("../models/immodel.js");
// let invmodel= require("../models/immodel.js");

const catmod = require("../models/categoriesmodel.js");
let catmodel = require("../models/categoriesmodel.js");


exports.showAddCategoryForm = (req, res) => {
    res.render("addcategory.ejs", { msg: "" });
};

exports.createCategory=((req, res) =>{

    //res.render("addcategory.ejs", {msg: ""});
    // console.log("Request Body:", req.body);
    //     console.log("Headers:", req.headers);
    // console.log("BODY TYPE:", typeof req.body);
    // console.log("BODY:", req.body);
     
    let name= req.body?.name;
    let description=req.body?.description;
    

    // if(!name)
    // {
    //     return res.render("addcategory.ejs", {msg: "Name is required"});
    // }

    let result=catmodel.createCategory(name,description);

    result.then((r)=>{

            if(r[0][0].affectedRows>=1){
                res.render("addcategory.ejs",{msg:"Category Added Successfully....."});
            }
            else{
                res.render("addcategory.ejs",{msg:"Failed to add....."});
               
            }
        }).catch((err)=>{
            console.log(err);
        res.render("addcategory.ejs", { msg: "Something went wrong." });
        })
    
});

exports.getAllCategories=((req,res)=>{
     let promise=catmodel.getAllCategories();
     promise.then((result)=>{
        res.render("viewcategory.ejs",{})
     });
     promise.catch((err)=>{
        res.send(err);
    });
});

// exports.getCategoryById=(req,res)=>{

// }

// exports.updateCategory=(req,res)={

// };

// exports.deleteCategory=(req,res)=>{
    
// };

// createCategory(req, res)	Add new category
// getAllCategories(req, res)	Fetch all categories
// getCategoryById(req, res)	Fetch a single category by ID
// updateCategory(req, res)	Update category details
// deleteCategory(req, res)	Delete category by ID
// searchCategoryByName(req, res)	Search category using name
