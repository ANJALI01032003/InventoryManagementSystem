let conn=require("../config/db/db.js")

async function saveReg(...regData){
    let result= conn.query("insert into users values('0',?,?,?,?,?,?,?)",[...regData]);
    //console.log(result);
    return result;
}

async function validate(uname, upass) {
    let result = await conn.query("select uid, name, role from users where username = ? AND pass = ?",[uname, upass]);
    return result;
}

async function getLoginUserProfile(loginUserId) {
    let userData=await conn.query("select * from users where uid=?",[loginUserId]);
    return userData;
}

module.exports={saveReg,validate,getLoginUserProfile};