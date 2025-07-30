require("dotenv").config();
let mysql=require("mysql2/promise");

// let conn=mysql.createConnection({
//     host:process.env.db_host,
//     user:process.env.db_username,
//     password:process.env.db_password,
//     database:process.env.db_dbname
// });

let conn=mysql.createPool({
     host:process.env.db_host,
     user:process.env.db_username,
     password:process.env.db_password,
     database:process.env.db_dbname,
     waitForConnections:true,
     connectionLimit:10,
     queueLimit:0
});

// conn.((err)=>{
//     if(err){
//         console.log("Database is not connected");
//     }
//     else{
//         console.log("Database Connected....");
//     }
// });

module.exports=conn;

