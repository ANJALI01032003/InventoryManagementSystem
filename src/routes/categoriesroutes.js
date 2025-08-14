const express = require("express");
const routerr = express.Router();
const categoriesctrl = require("../controllers/categoriescontroller");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

//Only admin can add, update, delete
routerr.get("/addcategory", verifyToken, isAdmin, categoriesctrl.showAddCategoryForm); 
routerr.post("/categories/addcat", verifyToken, isAdmin, categoriesctrl.createCategory);
routerr.get("/viewcategory", verifyToken, isAdmin, categoriesctrl.getAllCategories);
routerr.get("/categories/updcatbyid", verifyToken, isAdmin, categoriesctrl.showUpdateForm);
routerr.post("/categories/updcatbyid/:id", verifyToken, isAdmin, categoriesctrl.updateCategory);
routerr.delete("/categories/delbyid/:id", verifyToken, isAdmin, categoriesctrl.delcat);
// Search
routerr.get("/categories/search", verifyToken, isAdmin, categoriesctrl.searchCategories);

// Get by ID
routerr.get("/categories/:id", verifyToken, isAdmin, categoriesctrl.getCategoryById);


module.exports = routerr;







// const express = require("express");
// const routerr = express.Router();
// const categoriesctrl = require("../controllers/categoriescontroller");

// routerr.get("/addcategory",categoriesctrl.showAddCategoryForm); 

// routerr.post("/categories/addcat", categoriesctrl.createCategory); //add

// routerr.get("/viewcategory",categoriesctrl.getAllCategories);

// routerr.get("/categories/updcatbyid", categoriesctrl.showUpdateForm); // form render
// routerr.post("/categories/updcatbyid/:id", categoriesctrl.updateCategory); // actual PUT update


// routerr.delete("/categories/delbyid/:id", categoriesctrl.delcat); //delbyid

// // routerr.get("/catbyid", ); // display by id

// // routerr.get("/searchbyname" ,);//search by name



// // POST	/api/categories/add		Add new category	Inserted category ID
// // GET	/api/categories/view		Get all categories	List of all categories
// // GET	/api/categories/:id		Get category by ID	Single category details
// // PUT	/api/categories/update/:id	Update category by ID	Updated category data
// // DELETE	/api/categories/delete/:id	Delete category by ID	Success message
// // GET	/api/categories/search?name=	Search category by name	Matching category(s)

// module.exports=routerr;
