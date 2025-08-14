let express=require("express");
let prodctrl=require("../controllers/productcontroller");

let prodrouter= express.Router();

prodrouter.get("/createProd",prodctrl.showAddProdForm);

prodrouter.post("/addprod",prodctrl.createprod);

prodrouter.get("/viewall", prodctrl.viewAllProducts);

prodrouter.get("/update/:pid", prodctrl.showUpdateForm);

prodrouter.post("/update/:pid", prodctrl.updateProduct);

prodrouter.get("/search", prodctrl.searchProduct);

prodrouter.delete("/delete/:id", prodctrl.deleteProduct);

module.exports=prodrouter;