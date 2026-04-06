const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ success:false, error:"No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ success:false, error:"Invalid token" });
  }
};

exports.role = (...roles) => (req,res,next)=>{
  if(!roles.includes(req.user.role)){
    return res.status(403).json({ success:false, error:"Access denied"});
  }
  next();
};