import Visit from "../models/Visit.model.js"
import MR from "../models/MR.model.js"
import Doctor from "../models/Doctor.model.js"
import DCR from "../models/DCR.model.js"
import { calculateDistance } from "../utils/gps.util.js"


/* ================= CREATE VISIT ================= */

export const createVisit = async (req,res)=>{
try{

let mrUserId

/* Role Smart Detection */

if(req.user.role === "mr"){
mrUserId = req.user._id
}
else if(req.user.role === "admin"){
mrUserId = req.body.mr
}

if(!mrUserId){
return res.status(400).json({
message:"MR ID required"
})
}

const {
doctor,
territory,
notes,
productsDiscussed,
gpsTrack
} = req.body


/* ===== MR Find (Admin Isolation) ===== */

const mr = await MR.findOne({
  user: mrUserId
}).populate("doctors")

if(!mr){
return res.status(404).json({
message:"MR not found"
})
}


/* ===== Doctor Exists ===== */

const doctorExists = await Doctor.findById(doctor)

if(!doctorExists){
return res.status(404).json({
message:"Doctor not found"
})
}


/* ===== MR Assigned Doctor Validation ===== */

if(req.user.role === "mr"){

const isAssigned = mr.doctors.some(
(doc)=>doc._id.toString() === doctor
)

if(!isAssigned){
return res.status(403).json({
message:"You are not assigned to this doctor"
})
}

}


/* ===== DCR Validation ===== */

const Today = new Date()
Today.setHours(0,0,0,0)

const existingDCR = await DCR.findOne({
  mr: mr._id,
  date: Today,
  createdBy: req.user._id   // ✅ consistency
})

if(existingDCR && existingDCR.status !== "draft"){
return res.status(403).json({
message:"Cannot add visit. DCR already submitted."
})
}


/* ===== Create Visit ===== */

const visit = await Visit.create({
mr:mr._id,
doctor,
territory,
notes,
gpsTrack,
productsDiscussed
})


/* ===== Distance Calculation ===== */

let totalDistance = 0

if(gpsTrack && gpsTrack.length > 1){

for(let i=1;i<gpsTrack.length;i++){

totalDistance += calculateDistance(
gpsTrack[i-1].lat,
gpsTrack[i-1].lng,
gpsTrack[i].lat,
gpsTrack[i].lng
)

}

}


/* ===== AUTO DCR LINKING ===== */

const today = new Date()
today.setHours(0,0,0,0)

let dcr = await DCR.findOne({
mr:mr._id,
date:today
})

if(!dcr){

dcr = await DCR.create({
  mr: mr._id,
  date: today,
  visits: [],
  totalVisits: 0,
  status: "draft",
  createdBy: req.user._id   // ✅ FIX
})

}

dcr.visits.push(visit._id)
dcr.totalVisits = dcr.visits.length

await dcr.save()


return res.status(201).json({
success:true,
message:"Visit created & auto-linked to DCR",
visit,
dcr
})

}catch(error){

console.error(error)

return res.status(500).json({
message:error.message
})

}

}


/* ================= GET MR VISITS ================= */

export const getMRVisits = async (req,res)=>{
try{

const { mrId } = req.params

const visits = await Visit.find({
mr:mrId
})
.populate("doctor")
.populate("territory")
.populate("productsDiscussed.product")

return res.json({
success:true,
count:visits.length,
visits
})

}catch(error){

return res.status(500).json({
message:error.message
})

}
}