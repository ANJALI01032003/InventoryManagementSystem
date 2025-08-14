let conn=require("../../src/config/db/db.js");

async function saveProd(name, cid, sid, price, quant, minqty){
    let result= conn.query("insert into products values('0',?,?,?,?,?,?)",[name, cid, sid, price, quant, minqty]);
    //console.log(result);
    return result;
}

async function getAllProducts() {
    let [rows]=await conn.query("SELECT * FROM products");
    return rows;
}

async function getProductById(pid) {
    let [rows] = await conn.query("SELECT * FROM products WHERE pid = ?", [pid]);
    return rows;
}

async function updateProduct(pid, name, cid, sid, price, quant, minqty) {
    let [result] = await conn.query(
        "UPDATE products SET name=?, cid=?, sid=?, price=?, quant=?, minqty=? WHERE pid=?",
        [name, cid, sid, price, quant, minqty, pid]
    );
    return result;
}

async function searchProductByName(name) {
    let result = await conn.query("SELECT * FROM products WHERE name LIKE ?", [`%${name}%`]);
    return result;
}

async function deleteProductById(pid) {
    let result = await conn.query("DELETE FROM products WHERE pid = ?", [pid]);
    return result;
}



module.exports = { saveProd, getAllProducts, getProductById, updateProduct, searchProductByName, deleteProductById };

