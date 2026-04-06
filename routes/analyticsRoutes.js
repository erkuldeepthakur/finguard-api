const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { auth } = require("../middleware/auth");
/**
 * @swagger
 * /analytics/summary:
 *   get:
 *     summary: Get analytics summary
 *     description: Returns income, expense and balance
 *     responses:
 *       200:
 *         description: Summary fetched
 */
router.get("/summary", auth, async (req,res)=>{
  const records = await prisma.record.findMany({
    where:{userId:req.user.id,isDeleted:false}
  });

  let income=0,expense=0;
  records.forEach(r=>{
    if(r.type==="income") income+=r.amount;
    else expense+=r.amount;
  });

  res.json({
    success:true,
    data:{
      totalIncome:income,
      totalExpense:expense,
      balance:income-expense
    }
  });
});

module.exports = router;