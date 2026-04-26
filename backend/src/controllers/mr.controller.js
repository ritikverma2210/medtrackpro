import MR from "../models/MR.model.js";
import Territory from "../models/Territory.model.js";
import User from "../models/user.model.js";
import Doctor from "../models/Doctor.model.js";
import Visit from "../models/Visit.model.js";
import bcrypt from "bcryptjs";

/* ================= CREATE MR ================= */

export const createMR = async (req, res) => {
try{

const { name, email, password } = req.body

if(!name || !email || !password){
return res.status(400).json({
success:false,
message:"All fields are required"
})
}

const existingUser = await User.findOne({ email })

if(existingUser){
return res.status(400).json({
success:false,
message:"User already exists"
})
}

const hashedPassword = await bcrypt.hash(password, 12);

const user = await User.create({
name,
email,
password: hashedPassword,
role:"mr"
})

/* Employee Code */

const mrCount = await MR.countDocuments({
createdBy:req.user._id
})

const employeeCode =
`MR${String(mrCount + 1).padStart(3,"0")}`

const mr = await MR.create({
user:user._id,
employeeCode,
createdBy:req.user._id
})

res.status(201).json({
success:true,
message:"MR created successfully",
mr
})

}catch(error){

console.error("CREATE MR ERROR:",error)

res.status(500).json({
success:false,
message:error.message
})

}
}


/* ================= ASSIGN TERRITORY ================= */

export const assignTerritoryToMR = async (req,res)=>{
try{

const { mrId , territoryId } = req.body

if(!mrId || !territoryId){
return res.status(400).json({
success:false,
message:"MR ID and Territory ID required"
})
}

const mr = await MR.findOne({
_id:mrId,
createdBy:req.user._id
})

if(!mr){
return res.status(404).json({
success:false,
message:"MR not found"
})
}

const territory = await Territory.findById(territoryId)

if(!territory){
return res.status(404).json({
success:false,
message:"Territory not found"
})
}

mr.territory = territoryId
await mr.save()

res.json({
success:true,
message:"Territory assigned",
mr
})

}catch(error){

console.error(error)

res.status(500).json({
success:false,
message:error.message
})

}
}


/* ================= ASSIGN DOCTOR ================= */

export const assignDoctorToMR = async (req,res)=>{
try{

const { mrId , doctorId } = req.body

const mr = await MR.findOne({
_id:mrId,
createdBy:req.user._id
})

if(!mr){
return res.status(404).json({
success:false,
message:"MR not found"
})
}

const doctor = await Doctor.findById(doctorId)

if (!doctor) {
  return res.status(404).json({
    success:false,
    message:"Doctor not found"
  })
}

if(!doctor){
return res.status(404).json({
success:false,
message:"Doctor not found"
})
}

if(mr.doctors.includes(doctorId)){
return res.status(400).json({
success:false,
message:"Doctor already assigned"
})
}

mr.doctors.push(doctorId)
await mr.save()

await Doctor.findByIdAndUpdate(
doctorId,
{ mr:mr._id }
)

res.json({
success:true,
message:"Doctor assigned successfully",
mr
})

}catch(error){

console.error(error)

res.status(500).json({
success:false,
message:error.message
})

}
}


/* ================= GET ALL MR ================= */

export const getAllMR = async (req,res)=>{
try{

const mrs = await MR.find({
createdBy:req.user._id
})
.populate("territory")
.populate("user")
.populate("doctors")

res.json({
success:true,
mrs
})

}catch(error){

console.error(error)

res.status(500).json({
success:false,
message:error.message
})

}
}


/* ================= MR PROFILE ================= */

export const getMRProfile = async (req,res)=>{
try{

const mr = await MR.findOne({
user:req.user._id
})
.populate("user","name email")
.populate("territory","name")
.populate("doctors","name specialization")

if(!mr){
return res.status(404).json({
success:false,
message:"MR not found"
})
}

res.json({
success:true,
mr
})

}catch(error){

console.error(error)

res.status(500).json({
success:false,
message:error.message
})

}
}


/* ================= MY DOCTORS ================= */

export const getMyDoctors = async (req,res)=>{
try{

const mr = await MR.findOne({
user:req.user._id
}).populate("doctors")

if(!mr){
return res.status(404).json({
success:false,
message:"MR not found"
})
}

res.json({
success:true,
doctors:mr.doctors
})

}catch(error){

res.status(500).json({
success:false,
message:error.message
})

}
}