const express = require("express");
const routerr = express.Router();
const categoriesctrl = require("../controllers/categoriescontroller");

routerr.get("/addcategory",categoriesctrl.showAddCategoryForm); 

routerr.post("/categories/addcat", categoriesctrl.createCategory); //add

routerr.get("/viewcategory",categoriesctrl.getAllCategories);

// routerr.put("/updcatbyid",); //update

// routerr.delete("/delbyid", ) //delbyid

// routerr.get("/catbyid", ); // display by id

// routerr.get("/searchbyname" ,);//search by name



// POST	/api/categories/add		Add new category	Inserted category ID
// GET	/api/categories/view		Get all categories	List of all categories
// GET	/api/categories/:id		Get category by ID	Single category details
// PUT	/api/categories/update/:id	Update category by ID	Updated category data
// DELETE	/api/categories/delete/:id	Delete category by ID	Success message
// GET	/api/categories/search?name=	Search category by name	Matching category(s)

module.exports=routerr;
