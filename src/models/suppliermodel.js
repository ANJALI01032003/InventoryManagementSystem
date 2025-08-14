const conn = require("../config//db/db.js");

exports.saveSupplier = async (name, email, contact, companyname, address, gstno) => {
    return await conn.query("INSERT INTO suplliers (name, email, contact, companyname, address, gstno) VALUES (?, ?, ?, ?, ?, ?)",
        [name, email, contact, companyname, address, gstno]);
};

exports.getAllSuppliers = async () => {
    const [rows] = await conn.query("SELECT * FROM suplliers");
    return rows;
};

exports.getSupplierById = async (id) => {
    const [row] = await conn.query("SELECT * FROM suplliers WHERE sid = ?", [id]);
    return row;
};

exports.updateSupplier = async (sid, name, email, contact, companyname, address, gstno) => {
    const [result] = await conn.query(
        "UPDATE suplliers SET name = ?, email = ?, contact = ?, companyname = ?, address = ?, gstno = ? WHERE sid = ?",
        [name, email, contact, companyname, address, gstno, sid]
    );
    return result;
};

exports.deleteSupplierById = async (sid) => {
    const [result] = await conn.query("DELETE FROM suplliers WHERE sid = ?", [sid]);
    return result;
};

exports.searchSupplierByName = async (name) => {
    const [rows] = await conn.query("SELECT * FROM suplliers WHERE name LIKE ?", [`%${name}%`]);
    return rows;
};
