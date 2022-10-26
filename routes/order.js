const Order = require("../models/Order");

const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
  } = require("./verifyToken");
  
  const router = require("express").Router();


// Create the Order
router.post("/",verifyToken,async(req,res)=>{
    const newOrder = new Order(req.body);
    try {
        const saveOrder = await newOrder.save();
        res.status(200).json(saveOrder);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update the Order

router.put("/:id",verifyTokenAndAdmin,async(req,res)=>{
    try {
        const updateOrder = await Order.findByIdAndUpdate(req.params.id,{$set: req.body},{new: true});
        res.status(200).json(updateOrder);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete The Order
router.delete("/:id",verifyTokenAndAdmin,async(req,res)=>{
   try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has benn deleted");
   } catch (err) {
     res.status(500).json(err);
   }
});

// get User Order
router.get("/find/:userId",verifyTokenAndAuthorization,async(req,res)=>{
    try {
        const orders = await Order.find({userId:req.params.userId});
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Get All
router.get("/",verifyTokenAndAdmin,async(req,res)=>{
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get Monthly Income
router.get("/income",verifyTokenAndAdmin,async(req,res)=>{
    const data  = new Data();
    const lastMonth = new Data(data.setMonth(data.getMonth()-1));
    const previousMonth = new Data(new Data().setMonth(lastMonth.getMonth()-1));
    try {
        const income = await Order.aggregate([
            {$match: {createdAt: {$gte: previousMonth}}},
            {
                $project: {
                    month: {$month: $createdAt},
                    sales: "$amount"
                },
            },
            {
              $group: {
                _id: "$month",
                total: {$sum: "$sales"},
              },  
            },
        ]);
        res.status(200).json(income);
    } catch (err) {
       res.status(500).json(err); 
    }
});

module.exports = router;


















































































































