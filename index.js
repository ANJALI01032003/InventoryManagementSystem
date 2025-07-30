
let app=require("./app.js")

app.listen(process.env.server_port,()=>{
    console.log("Server Started");
});