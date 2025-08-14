const conn = require("../config/db/db.js");

async function getAllPurchases() {
    let result = await conn.query("SELECT * FROM purchases");
    return result[0];
}

async function getPurchaseById(id) {
    let result = await conn.query("SELECT * FROM purchases WHERE id = ?", [id]);
    return result[0];
}

async function searchPurchaseByInvoice(invoiceNo) {
    let result = await conn.query(
        "SELECT * FROM purchases WHERE invoiceNo LIKE ?",
        [`%${invoiceNo}%`]
    );
    return result[0];
}

async function addPurchase(invoiceNo, purchaseDate, sid, items, totalAmount, paymentMode, gstInvoice) {
    let result = await conn.query(
        "INSERT INTO purchases (invoiceNo, purchaseDate, sid, items, totalAmount, paymentMode, gstInvoice) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [invoiceNo, purchaseDate, sid, JSON.stringify(items), totalAmount, paymentMode, gstInvoice]
    );
    return result;
}

async function updatePurchase(id, invoiceNo, purchaseDate, sid, items, totalAmount, paymentMode, gstInvoice) {
    let result = await conn.query(
        "UPDATE purchases SET invoiceNo = ?, purchaseDate = ?, sid = ?, items = ?, totalAmount = ?, paymentMode = ?, gstInvoice = ? WHERE id = ?",
        [invoiceNo, purchaseDate, sid, JSON.stringify(items), totalAmount, paymentMode, gstInvoice, id]
    );
    return result;
}

async function deletePurchaseById(id) {
    let result = await conn.query("DELETE FROM purchases WHERE id = ?", [id]);
    return result;
}

module.exports = {
    getAllPurchases,
    getPurchaseById,
    searchPurchaseByInvoice,
    addPurchase,
    updatePurchase,
    deletePurchaseById
};




// const conn = require("../config/db/db.js");

// // Save new purchase
// async function savePurchase(invoiceNo, purchaseDate, sid, items, totalAmount, paymentMode, gstInvoice) {
//     let result = await conn.query(
//         "INSERT INTO purchases VALUES (0,?,?,?,?,?,?,?)",
//         [invoiceNo, purchaseDate, sid, JSON.stringify(items), totalAmount, paymentMode, gstInvoice]
//     );
//     return result;
// }

// // Get all purchases
// async function getAllPurchases() {
//     let result = await conn.query("SELECT * FROM purchases");
//     return result;
// }

// // Get purchase by ID
// async function getPurchaseById(id) {
//     let result = await conn.query("SELECT * FROM purchases WHERE id = ?", [id]);
//     return result;
// }

// // Update purchase
// async function updatePurchase(id, invoiceNo, purchaseDate, sid, items, totalAmount, paymentMode, gstInvoice) {
//     let result = await conn.query(
//         "UPDATE purchases SET invoiceNo=?, purchaseDate=?, sid=?, items=?, totalAmount=?, paymentMode=?, gstInvoice=? WHERE id=?",
//         [invoiceNo, purchaseDate, sid, JSON.stringify(items), totalAmount, paymentMode, gstInvoice, id]
//     );
//     return result;
// }

// // Delete purchase
// async function deletePurchaseById(id) {
//     let result = await conn.query("DELETE FROM purchases WHERE id = ?", [id]);
//     return result;
// }

// // Search by Invoice No
// async function searchPurchaseByInvoice(invoice) {
//     let result = await conn.query("SELECT * FROM purchases WHERE invoiceNo LIKE ?", [`%${invoice}%`]);
//     return result;
// }

// module.exports = {
//     savePurchase,
//     getAllPurchases,
//     getPurchaseById,
//     updatePurchase,
//     deletePurchaseById,
//     searchPurchaseByInvoice
// };
