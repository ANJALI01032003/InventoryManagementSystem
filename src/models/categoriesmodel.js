let conn=require("../config/db/db.js");

// async function saveReg(...regData){
//     let result= conn.query("insert into users values('0',?,?,?,?,?,?,?)",[...regData]);
//     //console.log(result);
//     return result;
// }

// async function validate(uname, upass) {
//     let result = await conn.query("select uid, name, role from users where username = ? AND pass = ?",[uname, upass]);
//     return result;
// }

// async function getLoginUserProfile(loginUserId) {
//     let userData=await conn.query("select * from users where uid=?",[loginUserId]);
//     return userData;
// }

// module.exports={saveReg,validate,getLoginUserProfile};

async function createCategory(name,description){
    let result= await conn.query("insert into categories values('0',?,?)",[name,description]);
    return result;  
}

async function getAllCategories() {
    const [rows] = await conn.query("select * from categories");
    return rows;
}
module.exports={createCategory,getAllCategories};
// /
// exports.getAllProd=()=>{
//     return new Promise((resolve, reject)=>{
//         db.query("select *from product",(err,result)=>{
//             if(err){
//                 reject(err);
//             }
//             else{
//                 resolve(result);
//             }
//         });
//     });
// }

// exports.createCategory=(name)=>{
//     return new Promise((resolve,reject)=>{
//         db.query(
//             "insert into categories (name) values('0',?)",
//             [name],
//             (err,result)=>{
//                 if(err){
//                     reject("Category not Adeed....." + err);
//                 }
//                 else{
//                     resolve("Category Adeed Succesfully....");
//                 }
//      })
//     });
// }