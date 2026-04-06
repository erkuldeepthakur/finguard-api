const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { auth } = require("../middleware/auth");
/**
 * @swagger
 * /records:
 *   post:
 *     summary: Create record
 *     description: Add new financial record
 *     responses:
 *       201:
 *         description: Record created
 */
router.post("/", auth, async (req,res)=>{
  if(!req.body.amount || req.body.amount<=0){
    return res.status(400).json({success:false,error:"Invalid amount"});
  }

  const record = await prisma.record.create({
    data:{...req.body,userId:req.user.id}
  });

  res.status(201).json({success:true,data:record});
});
/**
 * @swagger
 * /records:
 *   get:
 *     summary: Get all records
 *     description: Fetch user records
 *     responses:
 *       200:
 *         description: Records fetched
 */
router.get("/", auth, async (req,res)=>{
  const {page=1,limit=5,type} = req.query;

  const where={userId:req.user.id,isDeleted:false};
  if(type) where.type=type;

  const records = await prisma.record.findMany({
    where,
    skip:(page-1)*limit,
    take:Number(limit)
  });

  res.json({success:true,data:records});
});
router.delete("/:id", auth, async (req, res) => {
  try {
    const id = Number(req.params.id);

    const record = await prisma.record.update({
      where: { id },
      data: { isDeleted: true }
    });

    res.json({
      success: true,
      message: "Record deleted",
      data: record
    });

  } catch (err) {
    res.status(404).json({
      success: false,
      error: "Record not found"
    });
  }
});
module.exports = router;