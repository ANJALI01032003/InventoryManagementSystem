const express = require("express");
const prouter = express.Router();
const purchaseController = require("../controllers/purchaseController");

// Add Purchase Form
prouter.get("/purchase/add", purchaseController.showAddPurchaseForm);

// Create Purchase
prouter.post("/purchase/add", purchaseController.createPurchase);

// View All Purchases
prouter.get("/purchase/view", purchaseController.viewAllPurchases);

// Search Purchase by Invoice
prouter.get("/purchase/search", purchaseController.searchPurchaseByInvoice);

// Get Purchase by ID (API)
prouter.get("/purchase/:id", purchaseController.getPurchaseById);

// Show Update Purchase Form
prouter.get("/purchase/update/:id", purchaseController.showUpdatePurchaseForm);

// Update Purchase
prouter.post("/purchase/update/:id", purchaseController.updatePurchase);

// Delete Purchase
prouter.post("/purchase/delete/:id", purchaseController.deletePurchase);

module.exports = prouter;
