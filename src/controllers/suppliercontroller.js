
const suppliermodel = require("../models/suppliermodel");

exports.showAddSupplierForm = (req, res) => {
    res.render("supplier/addsupplier", { msg: "" });
};

exports.getSupplierById = (req, res) => {
    const id = req.params.id;

    suppliermodel.getSupplierById(id)
        .then((data) => {
            if (data.length > 0) {
                res.send(data[0]); // Send JSON response for API
            } else {
                res.status(404).send("Supplier not found");
            }
        })
        .catch((err) => {
            console.log("Error fetching supplier by ID:", err);
            res.status(500).send("Server error");
        });
};


exports.createSupplier = (req, res) => {
    const { name, email, contact, companyname, address, gstno } = req.body;

    suppliermodel.saveSupplier(name, email, contact, companyname, address, gstno)
        .then(([result]) => {
            console.log("Result after insert:", result);
            if (result && result.affectedRows >= 1) {
                res.render("supplier/addsupplier", { msg: "Supplier added successfully!" });
            } else {
                res.render("supplier/addsupplier", { msg: "Failed to add supplier." });
            }
        })
        .catch((err) => {
            console.log("Create error:", err);
            res.render("supplier/addsupplier", { msg: "Something went wrong!" });
        });
};

exports.viewAllSuppliers = (req, res) => {
    suppliermodel.getAllSuppliers()
        .then((rows) => {
            res.render("supplier/viewsupplier", { supplierList: rows, msg: "" });
        })
        .catch((err) => {
            res.send("Error fetching suppliers: " + err);
        });
};

exports.showUpdateSupplierForm = (req, res) => {
    const id = req.params.id;

    suppliermodel.getSupplierById(id)
        .then((data) => {
            if (data.length > 0) {
                const supplier = data[0];
                res.render("supplier/updatesupplier", {
                    id: supplier.id,
                    name: supplier.name,
                    contact: supplier.contact,
                    email: supplier.email,
                    address: supplier.address,
                    msg: ""
                });
            } else {
                res.send("Supplier not found");
            }
        })
        .catch((err) => {
            console.log("Error:", err);
            res.send("Error fetching supplier");
        });
};

exports.updateSupplier = (req, res) => {
    const id = req.params.id;
    const { name, email, contact, companyname, address, gstno } = req.body;

    suppliermodel.updateSupplier(name, email, contact, companyname, address, gstno)
        .then(([result]) => {
            if (result.affectedRows > 0) {
                res.redirect("/supplier/view");
            } else {
                res.send("Update failed");
            }
        })
        .catch((err) => {
            console.log("Update error:", err);
            res.send("Error updating supplier");
        });
};

exports.deleteSupplier = (req, res) => {
  const id = req.params.id;

  suppliermodel.deleteSupplierById(id)
    .then((result) => {
      if (result.affectedRows > 0) {
        
        suppliermodel.getAllSuppliers()
          .then(([rows]) => {
            res.render("supplier/viewsupplier", {
              supplierList: rows,
              msg: "Supplier deleted successfully"
            });
          })
          .catch((err) => {
            console.log("Error fetching updated supplier list:", err);
            res.send("Deleted supplier but failed to load view");
          });

      } else {
        res.send("No supplier found to delete");
      }
    })
    .catch((err) => {
      console.log(err);
      res.send("Error deleting supplier");
    });
};


exports.searchSupplierByName = (req, res) => {
    const name = req.query.name;

    suppliermodel.searchSupplierByName(name)
        .then((data) => {
            if (data.length > 0) {
                res.render("supplier/viewsupplier", { supplierList: data, msg: "Search Results:" });
            } else {
                res.render("supplier/viewsupplier", { supplierList: [], msg: "No matching suppliers found." });
            }
        })
        .catch((err) => {
            console.log(err);
            res.send("Error searching suppliers");
        });
};
