import MR from "../models/MR.model.js"
import Doctor from "../models/Doctor.model.js"
import Visit from "../models/Visit.model.js"
import DCR from "../models/DCR.model.js"


/* ================= MR DASHBOARD ================= */

export const mrDashboard = async (req,res)=>{
try{

const mr = await MR.findOne({
user:req.user._id
})
.populate("territory")
.populate("doctors")
.lean()

if(!mr){
return res.status(404).json({
success:false,
message:"MR not found"
})
}

const today = new Date()
today.setHours(0,0,0,0)

const todayVisits = await Visit.countDocuments({
mr:mr._id,
createdAt:{ $gte: today }
})

const todayDCR = await DCR.findOne({
mr:mr._id,
date:{ $gte: today }
}).lean()

const totalVisits = await Visit.countDocuments({
mr:mr._id
})

res.json({
success:true,
dashboard:{
mrId:mr._id,
employeeCode:mr.employeeCode,
territory:mr.territory,
assignedDoctors:mr.doctors ? mr.doctors.length : 0,
todayVisits,
totalVisits,
todayDCRStatus:todayDCR ? todayDCR.status : "not_created"
}
})

}catch(error){

res.status(500).json({
success:false,
message:error.message
})

}
}


/* ================= ADMIN DASHBOARD ================= */

export const adminDashboard = async (req,res)=>{
try{

const today = new Date()
today.setHours(0,0,0,0)

/* Admin Isolation */

const totalMRs = await MR.countDocuments({
createdBy:req.user._id
})

const totalDoctors = await Doctor.countDocuments({
createdBy:req.user._id
})

const todayVisits = await Visit.countDocuments({
createdBy:req.user._id,
createdAt:{ $gte: today }
})

const pendingDCRs = await DCR.countDocuments({
createdBy:req.user._id,
status:"submitted"
})

const approvedDCRs = await DCR.countDocuments({
createdBy:req.user._id,
status:"approved"
})

const rejectedDCRs = await DCR.countDocuments({
createdBy:req.user._id,
status:"rejected"
})

/* ================= RECENT ACTIVITY ================= */

const recentDoctors = await Doctor.find({
createdBy:req.user._id
})
.sort({ createdAt:-1 })
.limit(3)

const recentDCR = await DCR.find({
createdBy:req.user._id
})
.populate({
path:"mr",
populate:{ path:"user", select:"name" }
})
.sort({ createdAt:-1 })
.limit(3)

const recentActivity = [

...recentDoctors.map(doc=>({
message:`New Doctor added — ${doc.name}`,
date:doc.createdAt
})),

...recentDCR.map(dcr=>({
message:`MR submitted DCR`,
date:dcr.createdAt
}))

]
.sort((a,b)=> new Date(b.date) - new Date(a.date))
.slice(0,5)


res.json({
success:true,
dashboard:{
totalMRs,
totalDoctors,
todayVisits,
dcrStats:{
pending:pendingDCRs,
approved:approvedDCRs,
rejected:rejectedDCRs
},
recentActivity
}
})

}catch(error){

res.status(500).json({
success:false,
message:error.message
})

}
}