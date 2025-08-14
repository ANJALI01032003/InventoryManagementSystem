const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

// Token verify middleware
function verifyToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send("Access Denied: No Token Provided");
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).send("Invalid Token");
    }
}

// Admin check middleware
function isAdmin(req, res, next) {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        return res.status(403).send("Access Denied: Admins Only");
    }
}

module.exports = { verifyToken, isAdmin };




// const jwt = require("jsonwebtoken");
// const SECRET_KEY = process.env.SECRET_KEY;

// //Verify JWT token
// function verifyToken(req, res, next) {
//     const token = req.cookies?.token || req.headers["authorization"]?.split(" ")[1];

//     if (!token) {
//         return res.status(401).json({ message: "Access Denied: No Token Provided" });
//     }

//     try {
//         const decoded = jwt.verify(token, SECRET_KEY);
//         req.user = decoded; 
//         next();
//     } catch (err) {
//         return res.status(403).json({ message: "Invalid or Expired Token" });
//     }
// }

// // Check Admin Role
// function isAdmin(req, res, next) {
//     if (req.user.role === "admin") {
//         next();
//     } else {
//         return res.status(403).json({ message: "Access Denied: Admins Only" });
//     }
// }

// module.exports = { verifyToken, isAdmin };
