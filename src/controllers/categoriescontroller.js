//const catmod = require("../models/categoriesmodel.js");
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

            if(r[0].affectedRows>=1){
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


// exports.getAllCategories = async (req, res) => {
//     try {
//         const keyword = req.query.keyword || ""; // Agar search keyword aya hai to
//         let result;

//         if (keyword.trim() !== "") {
//             result = await catmodel.searchCategories(keyword); // Search ke liye
//             res.render("viewcategory.ejs", {
//                 catList: result,
//                 msg: `Search results for "${keyword}"`
//             });
//         } else {
//             result = await catmodel.getAllCategories(); // Normal listing ke liye
//             res.render("viewcategory.ejs", {
//                 catList: result,
//                 msg: ""
//             });
//         }

//     } catch (err) {
//         console.error(err);
//         res.render("viewcategory.ejs", { catList: [], msg: "Error while fetching categories." });
//     }
// };




// exports.getAllCategories=((req,res)=>{
//      let promise=catmodel.getAllCategories();
//      promise.then((result)=>{
//         res.render("viewcategory.ejs",{catList:result, msg:""});
//      });
//      promise.catch((err)=>{
//         res.send(err);
//     });
// });

exports.getAllCategories = (req, res) => {
    catmodel.getAllCategories()
        .then((result) => {
            res.render("viewcategory.ejs", { 
                catList: result, 
                msg: "" 
            });
        })
        .catch((err) => {
            console.error(err);
            res.render("viewcategory.ejs", { 
                catList: [], 
                msg: "Error while fetching categories." 
            });
        });
};

// ========================
// SEARCH Categories
// ========================
exports.searchCategories = (req, res) => {
    const keyword = req.query.keyword || "";

    catmodel.searchCategories(keyword)
        .then((result) => {
            res.render("viewcategory.ejs", {
                catList: result,
                msg: `Search results for "${keyword}"`
            });
        })
        .catch((err) => {
            console.error(err);
            res.render("viewcategory.ejs", { 
                catList: [], 
                msg: "Error while searching categories." 
            });
        });
};

exports.showUpdateForm = (req, res) => {

    console.log(req.query);

    res.render("updcategory.ejs",{

        cid:req.query.cid,
        name:req.query.name,
        description:req.query.description,
        msg: ""

    });
    // const id = req.params.id;
    // let result = catmodel.getCategoryById(id);

    // result.then((r) => {
    //     if (r[0].length > 0) {
    //         res.render("updcategory.ejs", { cat: r[0][0], msg: "" });
    //     } else {
    //         res.send("No category found");
    //     }
    // }).catch((err) => {
    //     console.log(err);
    //     res.send("Error fetching category");
    // });
};

exports.updateCategory = (req, res) => {
    const id = req.params.id;
    const { name, description } = req.body;

    let result = catmodel.updateCategory(id, name, description);

    result.then((r) => {
        let p=catmodel.getAllCategories();
         p.then((result) => {
                res.render("viewcategory.ejs", { catList: result, msg:"Category Updated Successfully" });
            }).catch((err) => {
                res.send(err);
            });
        })
        .catch((err) => {
            res.send("Not Updated");
        });
}
//         if (r[0].affectedRows > 0) {
//             res.send("Category updated successfully");
//         } else {
//             res.send("Update failed");
//         }
//     }).catch((err) => {
//         console.log(err);
//         res.send("Error updating category");
//     });
// };

exports.delcat=(req,res)=>{
    //res.send("Delete dept");

    let cid= req.params.id;

    let result= catmodel.delcat(cid);

    result.then((r)=>{
        if(r[0].affectedRows>0)
        {
            res.send("Category deleted successfully");
        }
        else{
            res.send("No category Found with given Id");
        }
    }).catch((err)=>{
        res.send(err);
    })
};


// Search categories
// exports.searchCategories = (req, res) => {
//     const keyword = req.query.keyword || ""; // from query string

//     catmodel.searchCategories(keyword)
//         .then((result) => {
//             res.render("viewcategory.ejs", { catList: result, msg: `Search results for "${keyword}"` });
//         })
//         .catch((err) => {
//             console.error(err);
//             res.render("viewcategory.ejs", { catList: [], msg: "Error while searching." });
//         });
// // };

// exports.searchCategories = (req, res) => {
//     const keyword = req.query.keyword ? req.query.keyword.trim() : "";

//     catmodel.searchCategories(keyword)
//         .then((result) => {
//             res.render("viewcategory.ejs", { 
//                 catList: result, 
//                 msg: keyword 
//                     ? `Search results for "${keyword}"` 
//                     : "Showing all categories" 
//             });
//         })
//         .catch((err) => {
//             console.error("Error in searchCategories:", err);
//             res.render("viewcategory.ejs", { 
//                 catList: [], 
//                 msg: "Error while searching." 
//             });
//         });
// };


// // Get category by ID
// exports.getCategoryById = (req, res) => {
//     const id = req.params.id;

//     catmodel.getCategoryById(id)
//         .then((category) => {
//             if (category) {
//                 res.render("viewcategory.ejs", { catList: [category], msg: "" });
//             } else {
//                 res.render("viewcategory.ejs", { catList: [], msg: "No category found." });
//             }
//         })
//         .catch((err) => {
//             console.error(err);
//             res.render("viewcategory.ejs", { catList: [], msg: "Error fetching category." });
//         });
// };

exports.getCategoryById = (req, res) => {
    const id = req.params.id;

    catmodel.getCategoryById(id)
        .then((result) => {
            if (result.length > 0) {
                res.render("editcategory.ejs", { category: result[0] });
            } else {
                res.redirect("/categories");
            }
        })
        .catch((err) => {
            console.error(err);
            res.redirect("/categories");
        });
};