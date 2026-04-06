
const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register user
 *     description: Create a new user
 *     responses:
 *       200:
 *         description: User created
 */
router.post("/register", async (req,res)=>{
  try{
    const {name,email,password} = req.body;
    const hash = await bcrypt.hash(password,10);

    const user = await prisma.user.create({
      data:{name,email,password:hash,role:"user"}
    });

    res.json({success:true,data:user});
  }catch(err){
    if(err.code==="P2002"){
      return res.status(400).json({success:false,error:"Email exists"});
    }
    res.status(500).json({success:false,error:err.message});
  }
});
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     description: Authenticate user and return JWT token
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", async (req,res)=>{
  const {email,password} = req.body;
  const user = await prisma.user.findUnique({where:{email}});
  if(!user) return res.status(404).json({error:"User not found"});

  const valid = await bcrypt.compare(password,user.password);
  if(!valid) return res.status(400).json({error:"Wrong password"});

  const token = jwt.sign({id:user.id,role:user.role},process.env.JWT_SECRET);
  res.json({token});
});

module.exports = router;