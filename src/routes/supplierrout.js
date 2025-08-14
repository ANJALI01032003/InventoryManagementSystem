const express = require("express");
let supplyrouter = express.Router();
const supplierCtrl = require("../controllers/suppliercontroller");

supplyrouter.get("/supplier/addform",supplierCtrl.showAddSupplierForm);
supplyrouter.post("/supplier/add", supplierCtrl.createSupplier);
supplyrouter.get("/supplier/view", supplierCtrl.viewAllSuppliers);
supplyrouter.get("/supplier/:id", supplierCtrl.getSupplierById);
supplyrouter.put("/supplier/update/:id", supplierCtrl.updateSupplier);
supplyrouter.delete("/supplier/delete/:id", supplierCtrl.deleteSupplier);
supplyrouter.get("/supplier/search", supplierCtrl.searchSupplierByName);

module.exports = supplyrouter;