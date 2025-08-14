let prodmodel= require("../models/productsmodel");

exports.showAddProdForm = (req, res) => {
    res.render("product/addproduct", { msg: "" });
};

exports.createprod=((req, res) =>{

    let {name, cid, sid, price, quant, minqty}=req.body;
    

    let result=prodmodel.saveProd(name,cid, sid, price, quant, minqty);

    result.then((r)=>{

            console.log("RESULT:", r);

            if (r && r[0] && r[0].affectedRows >= 1) {
                res.render("product/addproduct",{msg:"Product Added Successfully....."});
            }
            else{
                res.render("product/addproduct",{msg:"Failed to add....."});
               
            }
        }).catch((err)=>{
            console.log(err);
        res.render("product/addproduct", { msg: "Something went wrong." });
        })
    
});

exports.viewAllProducts = (req, res) => {
    let result = prodmodel.getAllProducts();
    result.then((rows) => {
        res.render("product/viewproduct.ejs", { product: rows, msg: "" });
    }).catch((err) => {
        res.send("Error fetching products: " + err);
    });
};


// exports.showUpdateForm = (req, res) => {
//     const pid = req.params.pid;
//     console.log("PID received from route:", pid);
//     prodmodel.getProductById(pid).then((r) => {
//         console.log("DB response:", r);
//         if (r.length > 0) {
//             let row = r[0];
//             res.render("product/updproduct.ejs", {
//                 pid: row.pid,
//                 name: row.name,
//                 cid: row.cid,
//                 sid: row.sid,
//                 price: row.price,
//                 quant: row.quant,
//                 minqty: row.minqty,
//                 msg: ""
//             });
//         } else {
//             res.send("Product not found");
//         }
//     }).catch((err) => {
//         console.log(err);
//         res.send("Error fetching product");
//     });
// };

// exports.updateProduct = (req, res) => {
//     const pid = req.params.pid;
//     const { name, cid, sid, price, quant, minqty } = req.body;

//     prodmodel.updateProduct(pid, name, cid, sid, price, quant, minqty)
//         .then((result) => {
//             if (result.affectedRows > 0) {
//                 res.render("product/viewall" ,{ product: product[0],msg: ""}); // Redirect after success
//             } else {
//                 res.send("Update failed");
//             }
//         })
//         .catch((err) => {
//             console.log("Update error:", err);
//             res.send("Error updating product");
//         });
// };


exports.updateProduct = (req, res) => {
    const pid = req.params.pid;
    const { name, cid, sid, price, quant, minqty } = req.body;

    prodmodel.updateProduct(pid, name, cid, sid, price, quant, minqty)
        .then((result) => {
            if (result.affectedRows > 0) {
                // Update ke baad redirect karo view all products route pe
                res.redirect("/product/viewall"); 
            } else {
                res.send("Update failed");
            }
        })
        .catch((err) => {
            console.log("Update error:", err);
            res.send("Error updating product");
        });
};


// // GET route to show update form
// exports.showUpdateForm = (req, res) => {
//     const pid = req.params.pid;

//     prodmodel.getProductById(pid)
//         .then((product) => {
//             if (product.length > 0) {
//                 res.render("product/updproduct", { product: product[0], msg: ""});
//             } else {
//                 res.send("Product not found");
//             }
//         })
//         .catch((err) => {
//             console.log("Error fetching product:", err);
//             res.send("Error loading form");
//         });
// };


exports.showUpdateForm = (req, res) => {
    const pid = req.params.pid;

    prodmodel.getProductById(pid)
        .then((product) => {
            console.log("Product from DB:", product); // Debugging ke liye

            if (product && product.length > 0) {
                res.render("product/updproduct", { product: product[0], msg: "" });
            } else {
                res.send("Product not found");
            }
        })
        .catch((err) => {
            console.error("Error fetching product:", err);
            res.send("Error loading form");
        });
};


exports.searchProduct = (req, res) => {
    const name = req.query.name;

    prodmodel.searchProductByName(name)
        .then((r) => {
            if (r[0].length > 0) {
                res.render("product/viewproduct.ejs", { prodList: r[0], msg: "Search results:" });
            } else {
                res.render("product/viewproduct.ejs", { prodList: [], msg: "No matching products found." });
            }
        })
        .catch((err) => {
            console.log(err);
            res.send("Error searching products");
        });
};

exports.deleteProduct = (req, res) => {
    const pid = req.params.id;

    prodmodel.deleteProductById(pid)
        .then((r) => {
            if (r[0].affectedRows > 0) {
                res.send("Product deleted successfully");
            } else {
                res.send("No product found to delete");
            }
        })
        .catch((err) => {
            console.log(err);
            res.send("Error deleting product");
        });
};
