const purchasemodel = require("../models/purchasemodel");

exports.showAddPurchaseForm = (req, res) => {
    res.render("purchase/addpurchase", { msg: "" });
};

exports.getPurchaseById = (req, res) => {
    const id = req.params.id;

    purchasemodel.getPurchaseById(id)
        .then((data) => {
            if (data.length > 0) {
                res.send(data[0]); // For API / JSON response
            } else {
                res.status(404).send("Purchase not found");
            }
        })
        .catch((err) => {
            console.log("Error fetching purchase by ID:", err);
            res.status(500).send("Server error");
        });
};

exports.createPurchase = (req, res) => {
    const { invoiceNo, purchaseDate, sid, items, totalAmount, paymentMode, gstInvoice } = req.body;

    purchasemodel.addPurchase(invoiceNo, purchaseDate, sid, items, totalAmount, paymentMode, gstInvoice)
        .then(([result]) => {
            if (result && result.affectedRows >= 1) {
                res.render("purchase/addpurchase", { msg: "Purchase added successfully!" });
            } else {
                res.render("purchase/addpurchase", { msg: "Failed to add purchase." });
            }
        })
        .catch((err) => {
            console.log("Create error:", err);
            res.render("purchase/addpurchase", { msg: "Something went wrong!" });
        });
};

exports.viewAllPurchases = (req, res) => {
    purchasemodel.getAllPurchases()
        .then((result) => {
            res.render("purchase/viewpurchase", { purchases: result, msg: "" });
        })
        .catch((err) => {
            res.send("Error fetching purchases: " + err);
        });
};

exports.showUpdatePurchaseForm = (req, res) => {
    const id = req.params.id;

    purchasemodel.getPurchaseById(id)
        .then((data) => {
            if (data.length > 0) {
                const purchase = data[0];
                res.render("purchase/updatepurchase", {
                    id: purchase.id,
                    invoiceNo: purchase.invoiceNo,
                    purchaseDate: purchase.purchaseDate,
                    sid: purchase.sid,
                    items: purchase.items,
                    totalAmount: purchase.totalAmount,
                    paymentMode: purchase.paymentMode,
                    gstInvoice: purchase.gstInvoice,
                    msg: ""
                });
            } else {
                res.send("Purchase not found");
            }
        })
        .catch((err) => {
            console.log("Error:", err);
            res.send("Error fetching purchase");
        });
};


exports.updatePurchase = (req, res) => {
    const id = req.params.id;
    let { invoiceNo, purchaseDate, sid, items, totalAmount, paymentMode, gstInvoice } = req.body;

    try {
        // items ko JSON me parse karo, agar wo valid string hai
        items = JSON.parse(items);
    } catch (err) {
        console.log("Invalid JSON in items:", err);
        return res.send("Items must be valid JSON");
    }

    purchasemodel.updatePurchase(id, invoiceNo, purchaseDate, sid, items, totalAmount, paymentMode, gstInvoice)
        .then(([result]) => {
            if (result.affectedRows > 0) {
                res.redirect("/purchase/view");
            } else {
                res.send("Update failed");
            }
        })
        .catch((err) => {
            console.log("Update error:", err);
            res.send("Error updating purchase");
        });
};

// exports.updatePurchase = (req, res) => {
//     const id = req.params.id;
//     const { invoiceNo, purchaseDate, sid, items, totalAmount, paymentMode, gstInvoice } = req.body;

//     purchasemodel.updatePurchase(id, invoiceNo, purchaseDate, sid, items, totalAmount, paymentMode, gstInvoice)
//         .then(([result]) => {
//             if (result.affectedRows > 0) {
//                 res.redirect("/purchase/view");
//             } else {
//                 res.send("Update failed");
//             }
//         })
//         .catch((err) => {
//             console.log("Update error:", err);
//             res.send("Error updating purchase");
//         });
// };

exports.deletePurchase = (req, res) => {
    const id = req.params.id;

    purchasemodel.deletePurchaseById(id)
        .then(([result]) => {
            if (result.affectedRows > 0) {
                purchasemodel.getAllPurchases()
                    .then((rows) => {
                        res.render("purchase/viewpurchase", {
                            purchases: rows,
                            msg: "Purchase deleted successfully"
                        });
                    })
                    .catch((err) => {
                        console.log("Error fetching updated purchase list:", err);
                        res.send("Deleted purchase but failed to load view");
                    });
            } else {
                res.send("No purchase found to delete");
            }
        })
        .catch((err) => {
            console.log(err);
            res.send("Error deleting purchase");
        });
};

exports.searchPurchaseByInvoice = (req, res) => {
    const invoiceNo = req.query.invoiceNo;

    purchasemodel.searchPurchaseByInvoice(invoiceNo)
        .then((data) => {
            if (data.length > 0) {
                res.render("purchase/viewpurchase", { purchaseList: data, msg: "Search Results:" });
            } else {
                res.render("purchase/viewpurchase", { purchaseList: [], msg: "No matching purchases found." });
            }
        })
        .catch((err) => {
            console.log(err);
            res.send("Error searching purchases");
        });
};








// const purchaseModel = require("../models/purchasemodel.js");

// // Add Purchase
// exports.savePurchase = (req, res) => {
//     let { invoiceNo, purchaseDate, sid, items, totalAmount, paymentMode, gstInvoice } = req.body;
//     purchaseModel.savePurchase(invoiceNo, purchaseDate, sid, items, totalAmount, paymentMode, gstInvoice)
//         .then(r => {
//             if (r[0].affectedRows > 0) {
//                 res.redirect("/purchase/view");
//             } else {
//                 res.render("purchase/addpurchase.ejs", { msg: "Insert Failed" });
//             }
//         })
//         .catch(err => {
//             console.log(err);
//             res.send("Error while inserting purchase");
//         });
// };

// // View All Purchases
// exports.viewPurchases = (req, res) => {
//     purchaseModel.getAllPurchases()
//         .then(rows => {
//             res.render("purchase/viewpurchase", { purchases: rows , msg: ""});
//         })
//         .catch(err => {
//             console.log(err);
//             res.send("Error loading purchases");
//         });
// };

// // Edit Purchase
// exports.editPurchase = (req, res) => {
//     let id = req.params.id;
//     purchaseModel.getPurchaseById(id)
//         .then(r => {
//             res.render("purchase/updatepurchase.ejs", { purchase: r[0][0] });
//         })
//         .catch(err => {
//             console.log(err);
//             res.send("Error fetching purchase");
//         });
// };

// // Update Purchase
// exports.updatePurchase = (req, res) => {
//     let id = req.params.id;
//     let { invoiceNo, purchaseDate, sid, items, totalAmount, paymentMode, gstInvoice } = req.body;

//     purchaseModel.updatePurchase(id, invoiceNo, purchaseDate, sid, items, totalAmount, paymentMode, gstInvoice)
//         .then(r => {
//             res.redirect("/purchase/viewpurchase");
//         })
//         .catch(err => {
//             console.log(err);
//             res.send("Error updating purchase");
//         });
// };

// // Delete Purchase
// exports.deletePurchase = (req, res) => {
//     let id = req.params.id;
//     purchaseModel.deletePurchaseById(id)
//         .then(r => {
//             res.render("purchase/viewpurchase", { 
//                 purchases: r[0],
//                 msg: "" 
//             });
//         })
//         .catch(err => {
//             console.log(err);
//            res.render("purchase/viewpurchase", { purchases: [], msg: "Error fetching purchases" });
//         });
// };

// // Search Purchase
// exports.searchPurchase = (req, res) => {
//     let invoice = req.query.invoice;
//     purchaseModel.searchPurchaseByInvoice(invoice)
//         .then(r => {
//             res.render("purchase/viewpurchase.ejs", { purchases: r[0] });
//         })
//         .catch(err => {
//             console.log(err);
//             res.send("Error searching purchases");
//         });
// };
