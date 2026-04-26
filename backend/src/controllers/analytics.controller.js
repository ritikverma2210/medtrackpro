import Visit from "../models/Visit.model.js"
import DCR from "../models/DCR.model.js"
import MR from "../models/MR.model.js"


/* ================= MONTHLY VISIT TREND ================= */

export const monthlyVisitStats = async (req,res)=>{
try{

const stats = await Visit.aggregate([
{
$match:{
createdBy:req.user._id
}
},
{
$group:{
_id:{
year:{ $year:"$createdAt" },
month:{ $month:"$createdAt" }
},
totalVisits:{ $sum:1 }
}
},
{
$sort:{
"_id.year":1,
"_id.month":1
}
}
])

res.json({
success:true,
stats
})

}catch(error){

res.status(500).json({
message:error.message
})

}
}



/* ================= MR PERFORMANCE ================= */

export const mrPerformanceStats = async (req,res)=>{
try{

const stats = await Visit.aggregate([

{
$match:{
createdBy:req.user._id
}
},

{
$group:{
_id:"$mr",
totalVisits:{ $sum:1 }
}
},

{
$lookup:{
from:"mrs",
localField:"_id",
foreignField:"_id",
as:"mr"
}
},

{
$unwind:"$mr"
}

])

res.json({
success:true,
stats
})

}catch(error){

res.status(500).json({
message:error.message
})

}
}



/* ================= DCR STATUS ================= */

export const dcrStatusStats = async (req,res)=>{
try{

const stats = await DCR.aggregate([

{
$match:{
createdBy:req.user._id
}
},

{
$group:{
_id:"$status",
count:{ $sum:1 }
}
}

])

res.json({
success:true,
stats
})

}catch(error){

res.status(500).json({
message:error.message
})

}
}



/* ================= TERRITORY PERFORMANCE ================= */

export const territoryPerformance = async (req,res)=>{
try{

const stats = await MR.aggregate([

{
$match:{
createdBy:req.user._id
}
},

{
$group:{
_id:"$territory",
totalMRs:{ $sum:1 }
}
},

{
$lookup:{
from:"territories",
localField:"_id",
foreignField:"_id",
as:"territory"
}
},

{
$unwind:"$territory"
}

])

res.json({
success:true,
stats
})

}catch(error){

res.status(500).json({
message:error.message
})

}
}